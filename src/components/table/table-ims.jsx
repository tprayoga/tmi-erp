"use client";

// React Imports
import { useEffect, useMemo, useState } from "react";

// MUI Imports
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";

// Third-party Imports
import classnames from "classnames";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getFacetedRowModel, getFacetedUniqueValues, getFacetedMinMaxValues, getPaginationRowModel, getSortedRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";

// Icon Imports
import { Button, Checkbox, InputAdornment, MenuItem, Skeleton } from "@mui/material";

// import { ChevronRight } from "'@/__fakeData__/ChevronRight"; // Adjust the import path as necessary
import ChevronRight from "./ChevronRight";
// Style Imports
import styles from "./table.module.css"; // Adjust the import path as necessary
// Data Imports
import DebouncedInput from "./debounce-input";
import Iconify from "./iconify";

// Column Definitions
const columnHelper = createColumnHelper();

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// // A debounced input react component
// const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
//   // States
//   const [value, setValue] = useState(initialValue)

//   useEffect(() => {
//     setValue(initialValue)
//   }, [initialValue])
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       onChange(value)
//     }, debounce)

//     return () => clearTimeout(timeout)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [value])

//   return <TextField {...props} size='small' value={value} onChange={e => setValue(e.target.value)} />
// }

const renderAction = (
  <Button variant="contained" startIcon={<i className="ri-add-fill" />}>
    Add
  </Button>
);

const TableIms = ({
  data,
  columns = [],
  loading,
  totalData,
  onPageChange,
  onRowsPageChange,
  onSearch,
  page,
  perPage,
  action = renderAction,
  useTable,
  styleHeader,
  showPagination = true,
  hiddenSelect = false,
  renderEffect = {},
  headerProps,
}) => {
  // States
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // const [data, setData] = useState(() => defaultData)
  const [rowSelection, setRowSelection] = useState({});

  // Hooks
  const columnsHook = useMemo(
    () => {
      const selectColumn = hiddenSelect
        ? columns.map((col) => {
            return columnHelper.accessor(col?.id, {
              cell: (info) => (col?.cell ? col.cell(info) : info.getValue()),
              header: col?.header,
              size: col?.size,
            });
          })
        : [
            {
              id: "select",
              header: ({ table }) => (
                <div className="flex items-center">
                  <Checkbox
                    {...{
                      checked: table.getIsAllRowsSelected(),
                      indeterminate: table.getIsSomeRowsSelected(),
                      onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                    size="small"
                  />
                </div>
              ),
              cell: ({ row }) => (
                <div className="flex items-center">
                  <Checkbox
                    {...{
                      checked: row.getIsSelected(),
                      disabled: !row.getCanSelect(),
                      indeterminate: row.getIsSomeSelected(),
                      onChange: row.getToggleSelectedHandler(),
                    }}
                    size="small"
                  />
                </div>
              ),
            },
            ...columns.map((col) => {
              return columnHelper.accessor(col?.id, {
                cell: (info) => (col?.cell ? col.cell(info) : info.getValue()),
                header: col?.header,
                size: col?.size,
              });
            }),
          ];

      return selectColumn;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const table = useReactTable({
    data,
    columns: columnsHook,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      rowSelection,
    },
    enableRowSelection: true,

    //
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    ...useTable,
  });

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnFilters[0]?.id]);

  const listPageOptions = [
    {
      value: 7,
      label: "7",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 25,
      label: "25",
    },
    {
      value: totalData || data?.length,
      label: "All",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center p-6 flex-col sm:flex-row gap-4" style={{ ...styleHeader }}>
        {headerProps ? (
          headerProps
        ) : (
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => onSearch && onSearch(value)}
            placeholder="Search..."
            className="w-full sm:w-auto"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="mingcute:search-line" />
                </InputAdornment>
              ),
            }}
          />
        )}
        <div className="flex gap-2 items-center w-full justify-end">
          {/* <TextField
            id='outlined-page-options'
            select
            label=''
            value={perPage || table.getState().pagination.pageSize}
            className='w-full sm:w-20'
            size='small'
            onChange={e => onRowsPageChange(Number(e.target.value))}
          >
            {listPageOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField> */}
          {action}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const width = header.id === "select" || header.id === "custome_no" ? "60px" : header.id === "custome_actions" ? "150px" : "auto";

                  return (
                    <th
                      key={header.id}
                      style={{
                        width: width,
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              "flex items-center ": header.column.getIsSorted(),
                              "cursor-pointer select-none": header.column.getCanSort(),
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <ChevronRight fontSize="1.25rem" className="-rotate-90" />,
                              desc: <ChevronRight fontSize="1.25rem" className="rotate-90" />,
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          {loading ? (
            <tbody>
              {[...new Array(table.getState().pagination.pageSize)].map((_, index) => {
                return (
                  <tr key={index}>
                    {[...new Array(table.getVisibleFlatColumns()?.length)].map((cell, i) => {
                      return (
                        <td key={i}>
                          <Skeleton />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          ) : table.getFilteredRowModel().rows?.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns()?.length} className="text-center">
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell, i) => {
                      return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      {showPagination && (
        <TablePagination
          rowsPerPageOptions={listPageOptions}
          component="div"
          className="border-bs"
          count={totalData || table.getFilteredRowModel().rows?.length}
          rowsPerPage={perPage || table.getState().pagination.pageSize}
          page={page || table.getState().pagination.pageIndex}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
          }}
          onPageChange={(_, page) => {
            table.setPageIndex(page);
            onPageChange(page);
          }}
          onRowsPerPageChange={(e) => {
            onRowsPageChange(Number(e.target.value));
            table.setPageSize(Number(e.target.value));
          }}
        />
      )}
    </>
  );
};

export default TableIms;
