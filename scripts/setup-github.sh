#!/usr/bin/env bash
# One-time GitHub setup for atlas-ai-web.
# Requires: GitHub CLI (`gh auth login`) with admin rights on the repo,
# and a `staging` branch already pushed.
#
# Usage: ./scripts/setup-github.sh <owner>/<repo>
#   e.g. ./scripts/setup-github.sh your-username/atlas-ai-web
set -euo pipefail

REPO="${1:?Usage: $0 <owner>/<repo>}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "→ Checking that 'staging' exists on $REPO"
gh api "repos/$REPO/branches/staging" --silent \
  || { echo "✗ Push a 'staging' branch first: git switch -c staging && git push -u origin staging"; exit 1; }

echo "→ Repository settings: default branch, merge methods, branch cleanup"
gh api -X PATCH "repos/$REPO" \
  -f default_branch=staging \
  -F allow_squash_merge=true \
  -F allow_merge_commit=true \
  -F allow_rebase_merge=false \
  -F delete_branch_on_merge=true \
  -F allow_auto_merge=true \
  -f squash_merge_commit_title=PR_TITLE \
  -f squash_merge_commit_message=PR_BODY \
  --silent

apply_ruleset() {
  local file="$1"
  local name
  name="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["name"])' "$file")"
  local existing
  existing="$(gh api "repos/$REPO/rulesets" --jq ".[] | select(.name == \"$name\") | .id" || true)"
  if [ -n "$existing" ]; then
    echo "→ Updating ruleset '$name' (id $existing)"
    gh api -X PUT "repos/$REPO/rulesets/$existing" --input "$file" --silent
  else
    echo "→ Creating ruleset '$name'"
    gh api -X POST "repos/$REPO/rulesets" --input "$file" --silent
  fi
}

apply_ruleset "$ROOT/.github/rulesets/staging.json"
apply_ruleset "$ROOT/.github/rulesets/main.json"

echo "✓ Done. Verify under Settings → Rules → Rulesets."
echo "  Test: 'git push origin main' should now be rejected."