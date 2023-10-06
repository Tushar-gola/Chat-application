import "@tanstack/react-table";
import { flexRender, Row, RowData, Table } from "@tanstack/react-table";
import { cx } from "class-variance-authority";
import { useRef, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useVirtual } from "react-virtual";
import { Text } from "../components/typography/text";
import { Icons } from "../svgs/icons";

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    columnFilter?: boolean;
  }
}

type CustomTableProps<T extends RowData> = {
  tableStatic: Table<T>;
  tableDynamic: Table<T>;
  methods: any;
};

export function CustomVirtualTable<T extends RowData>({ tableStatic, methods, tableDynamic }: CustomTableProps<T>) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { rows } = tableStatic.getRowModel();
  const { rows: formRows } = tableDynamic.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 20,
    keyExtractor: (index) => rows[index].id,
  });

  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

  return (
    <div className="flex">
      <div
        className="align-middle inline-block min-w-full overflow-y-auto overflow-x-auto h-full overflow-hidden min-h-[calc(100vh_-_220px)] max-h-[calc(100vh_-_220px)]"
        ref={tableContainerRef}
      >
        {rows.length === 0 ? (
          <div className="w-full h-96 flex justify-center items-center">
            <Text>This table is empty.</Text>
          </div>
        ) : (
          <table className="min-w-full w-full">
            <thead className="sticky -top-1 z-30 bg-white">
              {tableStatic.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-100">
                  {headerGroup.headers.map((header) => (
                    <th
                      scope="col"
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cx(
                        "p-1 px-1 text-xs font-medium text-gray-500 uppercase tracking-wider border-y border-gray-200 whitespace-nowrap",
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
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} />
                </tr>
              )}
              {virtualRows.map((virtualRow) => {
                const rowStatic = rows[virtualRow.index] as Row<any>;
                const rowDynamic = formRows[virtualRow.index] as Row<any>;

                if (rowStatic.index === selectedIndex) {
                  return (
                    <tr key={rowDynamic.id} className={`hover:bg-gray-50 cursor-pointer`}>
                      <FormProvider {...methods}>
                        {rowDynamic.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="p-1 px-1 text-sm whitespace-nowrap">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </FormProvider>
                    </tr>
                  );
                }

                return (
                  <tr
                    key={rowStatic.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      if (selectedIndex) return setSelectedIndex(null);
                      setSelectedIndex(rowStatic.index);
                    }}
                  >
                    {rowStatic.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-1 px-1 text-sm whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}

              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
