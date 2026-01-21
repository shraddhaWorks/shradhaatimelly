export default function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-40 bg-gray-200 rounded-3xl" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-xl" />
        ))}
      </div>
      <div className="h-48 bg-gray-200 rounded-2xl" />
    </div>
  );
}
