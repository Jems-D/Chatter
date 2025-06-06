import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {};

const ChatSkeleton = (props: Props) => {
  return (
    <div className="bg-[var(--color_applewhite)] text-[var(--color_text_white_i) dark:text=[var(--color_text_dark_i)] dark:bg-[var(--color_appledark)] w-[250px] md:w-[300px] h-auto flex-col gap-2">
      <div className="flex-col gap-2">
        <div className="flex gap-1">
          <Skeleton className="rounded-[100px] w-[24px] h-[24px] bg-gray-300" />
          <Skeleton className="ml-2 w-[100px] bg-gray-300" />
        </div>
        <div>
          <Skeleton className="mt-3 w-[220px] md:w[270px] h-[60px] bg-gray-300 mb-3" />
        </div>
      </div>
      <div className="w-[220px] md:w[270px] h-[80px] bg-gray-300 mb-3"></div>
      <Skeleton className="w-[220px] md:w[270px] h-[200px] bg-gray-300 mb-3" />
      <div className=" h-[20px] w-[220px] md:w[270px] bg-gray-300"></div>
    </div>
  );
};

export default ChatSkeleton;
