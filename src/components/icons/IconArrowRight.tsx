export default function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}