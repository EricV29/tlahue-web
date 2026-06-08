const bar = "bg-gray-200 rounded";

function SkeletonCard({ imageHeight = "h-40" }: { imageHeight?: string }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#dee2de]/50">
      <div className={`${imageHeight} ${bar}`} />
      <div className="p-4 space-y-3">
        <div className={`h-3 w-32 ${bar}`} />
        <div className={`h-5 w-48 ${bar}`} />
        <div className={`h-10 w-full ${bar}`} />
        <div className={`h-3 w-24 ${bar}`} />
      </div>
    </div>
  );
}

function SkeletonAvatar({ className = "w-14 h-14" }: { className?: string }) {
  return <div className={`rounded-full ${bar} ${className}`} />;
}

function SkeletonText({ className = "h-3 w-32" }: { className?: string }) {
  return <div className={`${bar} ${className}`} />;
}

function SkeletonBlock({ className = "h-10 w-full" }: { className?: string }) {
  return <div className={`${bar} ${className}`} />;
}

export { SkeletonCard, SkeletonAvatar, SkeletonText, SkeletonBlock };
