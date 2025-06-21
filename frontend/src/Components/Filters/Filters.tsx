import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import type { ColumnFilter } from "@tanstack/react-table";

interface Props {
  columnFilters: ColumnFilter[];
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>>;
}

const Filters = ({ columnFilters, setColumnFilters }: Props) => {
  const userName =
    (columnFilters.find((f) => f.id === "username")?.value as string) || "";

  const onFilterChange = (id: string, value: unknown) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  return (
    <div className="flex items-center border-[#464647] border-1 rounded-md w-[12rem]">
      <div className="cursor-none bg-[#262628] p-2 rounded-l-md">
        <Search size={24} strokeWidth={1} />
      </div>
      <Input
        type="text"
        placeholder="username"
        className="border-none rounded-none"
        value={userName}
        onChange={(e) => onFilterChange("username", e.target.value)}
      />
    </div>
  );
};

export default Filters;
