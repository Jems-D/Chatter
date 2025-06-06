import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {};

const ChatSkeleton = (props: Props) => {
  return (
    <div className="bg-[var(--color_applewhite)] text-[var(--color_text_white_i) dark:text=[var(--color_text_dark_i)] dark:bg-[var(--color_appledark)] w-[250px] md:w-[300px] h-auto flex-col gap-2 border-1 shadow-xs rounded-2xl">
      <div className="flex-col gap-2 mb-2 mt-3 px-3">
        <div className="flex gap-1">
          <Skeleton className="rounded-[100px] w-[24px] h-[24px] bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="ml-2 w-[100px] bg-gray-300 dark:bg-gray-700" />
        </div>
        <div className="px-1">
          <Skeleton className="mt-3 w-[220px] md:w[28   0px] h-[20px] bg-gray-300 mb-3 dark:bg-gray-700" />
        </div>
      </div>
      <div className="px-4">
        <Skeleton className="w-[220px] md:w[280px] h-[60px] bg-gray-300 mb-3 dark:bg-gray-700" />
        <div className=" h-[20px] w-[220px] md:w[280px] bg-gray-300 mb-3 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
