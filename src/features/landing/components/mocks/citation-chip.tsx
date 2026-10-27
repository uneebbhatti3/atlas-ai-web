interface CitationChipProps {
  index: number;
}

/** Numbered source marker that ties a claim to the passage it came from. */
export function CitationChip({ index }: CitationChipProps) {
  return (
    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-md bg-brand font-mono text-xs font-semibold text-brand-foreground">
      {index}
    </span>
  );
}
