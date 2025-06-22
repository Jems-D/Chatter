import axios from "axios";
import { handleError } from "../Helpers/HandleError";
import type { Stats } from "../Ref/useStatusHub";

const statsUrl = import.meta.env.VITE_APP_ADMIN_STATS_URL;

export const GetStatsAsync = async () => {
  try {
    const result = await axios.get<Stats>(`${statsUrl}`, {
      withCredentials: true,
    });
    return result;
  } catch (err: any) {
    handleError(err);
  }
};
