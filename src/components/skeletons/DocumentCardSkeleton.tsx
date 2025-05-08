import React from "react";

const DocumentCardSkeleton = () => {
  return (
    <div className="flex flex-col animate-pulse items-center w-[285px] rounded-[12px] overflow-clip shadow">
      <div className="w-full h-[260px] bg-gray-200" />
      <div className="flex w-full items-center gap-3 p-2 bg-[#FEF7FF]">
        <div className="w-[48px] h-[48px] rounded-[12px] bg-gray-300" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-300 rounded w-1/2" />
        </div>
        <div className="w-[24px] h-[24px] bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default DocumentCardSkeleton;
