import React, { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";

export interface Stats {
  totalUserCount: number;
  userCount: number;
  adminCount: number;
  modCount: number;
  chatCount: number;
  commentCount: number;
  reactionCount: number;
}
const hubUrl = import.meta.env.VITE_APP_ADMIN_STATS_URL_HUB;

const useStatusHub = (): Stats | null => {
  const [stats, setStats] = useState<Stats | null>(null);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    connectionRef.current = conn;

    conn
      .start()
      .then(() => {
        console.log("SignalR connected");
      })
      .catch((e) => console.log("not connected"));

    conn.on("RecievedStats", (data: Stats) => {
      setStats(data);
    });
    return () => {
      conn.stop().catch(console.error);
    };
  }, []);
  return stats;
};

export default useStatusHub;
