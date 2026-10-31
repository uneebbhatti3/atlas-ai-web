/** Formats seconds as `m:ss` for the video timeline. */
export function formatTime(seconds: number): string {
  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const rest = String(total % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}
