import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ResponsiveBar } from "@nivo/bar";

interface Props {
  userCount?: number | undefined;
  adminCount?: number | undefined;
  modCount?: number | undefined;
  chatCount?: number | undefined;
  commentCount?: number | undefined;
  reactionCount?: number | undefined;
  forChats: "yes" | "no";
}

const UserSegragationChart = ({
  userCount,
  adminCount,
  modCount,
  chatCount,
  commentCount,
  reactionCount,
  forChats,
}: Props) => {
  const isDarkMode = document.documentElement.classList.contains("dark");

  if (forChats === "no") {
    if (
      typeof userCount === "undefined" ||
      typeof adminCount === "undefined" ||
      typeof modCount === "undefined"
    ) {
      return null;
    }
    const data = [
      {
        role: "Admin",
        count: adminCount,
      },
      {
        role: "Moderator",
        count: modCount,
      },
      {
        role: "User",
        count: userCount,
      },
    ];
    return (
      <Card
        className="text-[var(--color_text_white_i) dark:text=[var(--color_text_dark_i)] 
    h-[500px] flex-col gap-2 dark:bg-[var(--color_appledark)] shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-[var(--color_applewhite)] w-[300px] md:w-[400px] lg:[500px]"
      >
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveBar
            data={data}
            keys={["count"]}
            indexBy="role"
            margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
            padding={0.3}
            colors="#1a8cd8"
            axisBottom={{
              legend: "Role",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              legend: "Users",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            theme={{
              tooltip: {
                container: {
                  background: isDarkMode ? "#1c1c1e" : "#f5f5ff7",
                  color: isDarkMode ? "#f5f5f7" : "#f5f5f7",
                },
              },
              axis: {
                ticks: {
                  text: {
                    fill: isDarkMode ? "#f5f5f7" : "#f5f5f7",
                  },
                },
                legend: {
                  text: {
                    fill: isDarkMode ? "#f5f5f7" : "#f5f5f7",
                    fontWeight: "bold",
                  },
                },
              },
            }}
          />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    );
  }

  if (
    typeof chatCount === "undefined" ||
    typeof commentCount === "undefined" ||
    typeof reactionCount === "undefined"
  ) {
    return null;
  }
  const data = [
    {
      type: "Posts",
      count: chatCount,
    },
    {
      type: "Comments",
      count: commentCount,
    },
    {
      type: "Reactions",
      count: reactionCount,
    },
  ];
  return (
    <Card
      className="text-[var(--color_text_white_i) dark:text=[var(--color_text_dark_i)] 
    h-[500px] flex-col gap-2 dark:bg-[var(--color_appledark)] shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-[var(--color_applewhite)]  w-[300px] md:w-[400px] lg:[500px]"
    >
      <CardHeader>
        <CardTitle>Interactions</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveBar
          data={data}
          keys={["count"]}
          indexBy="type"
          margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
          padding={0.3}
          colors="#1a8cd8"
          axisBottom={{
            legend: "Interactions",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            legend: "Interactions",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          theme={{
            tooltip: {
              container: {
                background: isDarkMode ? "#1c1c1e" : "#f5f5ff7",
                color: isDarkMode ? "#f5f5f7" : "#f5f5f7",
              },
            },
            axis: {
              ticks: {
                text: {
                  fill: isDarkMode ? "#f5f5f7" : "#f5f5f7",
                },
              },
              legend: {
                text: {
                  fill: isDarkMode ? "#f5f5f7" : "#f5f5f7",
                  fontWeight: "bold",
                },
              },
            },
          }}
        />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default UserSegragationChart;
