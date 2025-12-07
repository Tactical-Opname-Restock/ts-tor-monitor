export function DashboardSkeleton() {
  return (
    <div className="flex-1 flex gap-4 h-full">
      {/* LEFT SIDE - Product Cards */}
      <div className="w-1/2 grid grid-cols-2 gap-3 h-full overflow-hidden p-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white-primary border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] p-4 flex flex-col justify-between h-[18vh] animate-pulse"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col gap-2 w-full">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="h-8 w-8 bg-gray-200 rounded" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - Stats + Chart */}
      <div className="w-1/2 flex flex-col gap-6 h-full">
        {/* Stats Widget */}
        <div className="grid grid-cols-2 gap-4 shrink-0 h-fit">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#FFFAF0] border-2 rounded-lg h-[18vh] border-black shadow-[6px_6px_0_0_#000] p-4 animate-pulse"
            >
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white-primary border-2 border-black rounded-lg h-[40vh] animate-pulse" />
      </div>
    </div>
  )
}
