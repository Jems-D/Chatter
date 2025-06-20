import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Skeleton } from "../ui/skeleton";

type Props = {};

const CommentSkeleton = (props: Props) => {
  return (
    <Card className="shadow-none border-0 rounded-0 gap-1 py-3 bg-white dark:bg-[var(--color_appledark)] text-[var(--color_text_white_i) dark:text=[var(--color_text_dark_i)] ">
      <CardHeader className="">
        <div className="flex gap-1">
          <Skeleton className="rounded-[100px] w-[24px] h-[24px] bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="ml-2 w-[100px] bg-gray-300 dark:bg-gray-700" />
        </div>
      </CardHeader>
      <CardContent className="text-left text-pretty break-all">
        <Skeleton className="w-[220px] md:w[280px] h-[60px] bg-gray-300 mb-3 dark:bg-gray-700" />
      </CardContent>
    </Card>
  );
};

export default CommentSkeleton;
