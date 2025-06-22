import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { User } from "../../Model/User";
import { ChangeRoleAsync, GetAllUsersAsync } from "../../Service/UserService";
import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  flexRender,
  type ColumnFiltersState,
  type ColumnFilter,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Filters from "../Filters/Filters";
import { ArrowUpDown, Ghost } from "lucide-react";
import { Button } from "../ui/button";
import EditableCell from "../EditableCell/EditableCell";
import { toast } from "react-toastify";
import { FormatDate } from "../../Helpers/DateFormatter";

interface Props {}

const UserTable = (props: Props) => {
  const [tableData, setTableData] = useState<User[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  useEffect(() => {
    fetchTableData();
  }, [refresh]);

  const fetchTableData = async () => {
    const data = await GetAllUsersAsync();
    if (data?.status === 200) {
      setTableData(data.data);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    ChangeRoleAsync(userId, newRole)
      .then((res) => {
        if (res?.status === 204) {
          setRefresh((prev) => prev + 1);
          toast.success("Role changed successfully");
        }
      })
      .catch((err) => console.log(err.messge));
  };

  const columns: ColumnDef<User, any>[] = [
    {
      accessorKey: "username",
      header: "Username",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "userRole",
      header: "Role",
      cell: (props) => {
        const row = props.row.original;
        const currentRole = props.getValue();
        return (
          <EditableCell
            initialValue={currentRole}
            onRoleChange={async (newRole) =>
              await handleRoleChange(row.userId, newRole)
            }
          />
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date Created",
      cell: (props) => <p>{FormatDate(props.getValue())}</p>,
    },
    {
      accessorKey: "updatedAt",
      header: "Date Updated",
      cell: (props) => <p>{FormatDate(props.getValue())}</p>,
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns: columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col">
      <div className="flex justify-end-safe mb-5">
        <Filters
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </div>
      <Table>
        <TableCaption>Users</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((heaaderGroup) => (
            <TableRow key={heaaderGroup.id}>
              {heaaderGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <div className="flex justify-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanSort() && (
                      <ArrowUpDown
                        size={16}
                        strokeWidth={1}
                        onClick={header.column.getToggleSortingHandler()}
                        className="ml-3"
                      />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
      <div className="flex-col">
        <div className="flex justify-end mb-2">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex justify-end">
          <Button
            variant={"outline"}
            onClick={() => table.previousPage()}
            className={`rounded-r-none ${
              !table.getCanPreviousPage() ? "hidden" : ""
            }`}
          >
            {"<"}
          </Button>
          <Button
            variant={"outline"}
            onClick={() => table.nextPage()}
            className={`rounded-l-none ${
              !table.getCanNextPage() ? "hidden" : ""
            }`}
          >
            {">"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
