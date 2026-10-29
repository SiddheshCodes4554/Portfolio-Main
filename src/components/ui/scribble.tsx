export function Scribble({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 20" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 12C58 2 136 3 233 9M14 17C82 8 162 9 225 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
