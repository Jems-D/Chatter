import { useEffect, useState } from "react";
import useStatusHub, { type Stats } from "../../Ref/useStatusHub";
import { GetStatsAsync } from "../../Service/StatsService";
import UserSegragationChart from "../Stats/UserSegragationChart";
import TotalCount from "../Stats/TotalCount";

const Charts = () => {
  const liveStats = useStatusHub();
  const [initialStats, setInitialStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const stats = await GetStatsAsync();
    if (stats?.status === 200) {
      setInitialStats(stats.data);
    }
  };

  const statsToShow = liveStats ?? initialStats;
  if (typeof statsToShow?.chatCount === "undefined") {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 items-center">
      <div className="grid place-items-center-safe grid-cols-1 lg:grid-cols-2 gap-6">
        <TotalCount
          count={statsToShow?.totalUserCount ?? 0}
          forInteractions="no"
        />
        <TotalCount
          count={
            statsToShow?.chatCount +
            statsToShow?.commentCount +
            statsToShow?.reactionCount
          }
          forInteractions="yes"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserSegragationChart
          forChats="no"
          userCount={statsToShow?.userCount}
          adminCount={statsToShow?.adminCount}
          modCount={statsToShow?.modCount}
        />
        <UserSegragationChart
          forChats="yes"
          chatCount={statsToShow?.chatCount}
          commentCount={statsToShow?.commentCount}
          reactionCount={statsToShow?.reactionCount}
        />
      </div>
    </div>
  );
};

export default Charts;
