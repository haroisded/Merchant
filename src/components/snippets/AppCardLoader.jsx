const AppCardLoader = () => {
  return (
    <div className="bg-white rounded-[40px] overflow-hidden border-2 border-brand-secondary/10">
      
      {/* Image skeleton */}
      <div className="h-48 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer" />

      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div className="h-5 w-3/4 rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer" />

        {/* Subtitle skeleton */}
        <div className="h-4 w-1/2 rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer" />

        {/* Button skeletons */}
        <div className="flex gap-3 mt-6">
          <div className="flex-1 h-9 rounded-xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer" />
          <div className="flex-1 h-9 rounded-xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer" />
        </div>
      </div>

    </div>
  );
};

export default AppCardLoader;