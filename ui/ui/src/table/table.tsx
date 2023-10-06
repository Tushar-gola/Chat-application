import React, { forwardRef, useImperativeHandle, Ref } from "react";
import { flexRender, RowData, Table } from "@tanstack/react-table";
import { cx } from "class-variance-authority";
import { Icons } from "../svgs/icons";
import "@tanstack/react-table";
import { Text } from "../components/typography/text";
import { Loader } from "../svgs/loader";

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    columnFilter?: boolean;
  }
}

type CustomTableProps<T extends RowData> = {
  table: Table<T>;
  _onRowClick?: (id: string) => void;
  sticky?: boolean;
  isFetching?: boolean;
};

export const CustomTable = forwardRef(
  ({ table, sticky = true, _onRowClick, isFetching = false }: CustomTableProps<any>, ref: Ref<any>) => {
    const rows = table.getRowModel().rows;
    const handleRowClick = (id: string) => {
      if (_onRowClick) {
        _onRowClick(id);
      }
    };

    return (
      <div className="flex flex-col">
        <div className="align-middle inline-block min-w-full">
          {rows.length === 0 ? (
            <div className="w-full h-96 flex justify-center items-center">
              <Text>This table is empty.</Text>
            </div>
          ) : (
            <table className="min-w-full w-full">
              <thead className={`bg-gray-100 ${sticky ? "sticky -top-1 z-30" : ""} `}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        scope="col"
                        key={header.id}
                        colSpan={header.colSpan}
                        className={cx(
                          "px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider border-y border-gray-200 whitespace-nowrap",
                          header.subHeaders.length > 1 ? "text-center border-2" : "text-left"
                        )}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: `${header.column.getCanSort() ? "cursor-pointer select-none" : ""} flex`,
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <Icons.ArrowUp />,
                              desc: <Icons.ArrowDown />,
                            }[header.column.getIsSorted() as string] ?? <div className="w-4 h-4" />}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-100 " onDoubleClick={() => handleRowClick(row.id)}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-1 px-2 text-sm whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
                {ref && (
                  <tr className="w-full grid grid-flow-col place-items-center">
                    {isFetching ? (
                      <td className="flex justify-evenly w-full">
                        <Loader.IconWithLoader loading={isFetching} width="30" height="30" />
                        <Loader.IconWithLoader loading={isFetching} width="30" height="30" />
                        <Loader.IconWithLoader loading={isFetching} width="30" height="30" />
                      </td>
                    ) : (
                      <td ref={ref} className="bg-red-600  h-8  w-full   -z-20" />
                    )}
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
);
