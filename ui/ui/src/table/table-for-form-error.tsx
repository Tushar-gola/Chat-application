import "@tanstack/react-table";
import { flexRender, Row, RowData, Table } from "@tanstack/react-table";
import { cx } from "class-variance-authority";
import { FormProvider } from "react-hook-form";
import { Text } from "../components/typography/text";
import { Icons } from "../svgs/icons";

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    columnFilter?: boolean;
  }
}

type TableForFormErrorProps<T extends RowData> = {
  table: Table<T>;
  methods: any;
  includeIds: string[];
};

export function TableForFormError<T extends RowData>({ methods, table, includeIds }: TableForFormErrorProps<T>) {
  const { rows } = table.getRowModel();

  return (
    <div className="flex">
      <div className="align-middle inline-block min-w-full overflow-y-auto overflow-x-auto h-full overflow-hidden min-h-[calc(100vh_-_220px)] max-h-[calc(100vh_-_220px)]">
        {rows.length === 0 ? (
          <div className="w-full h-96 flex justify-center items-center">
            <Text>This table is empty.</Text>
          </div>
        ) : (
          <table className="min-w-full w-full">
            <thead className="sticky -top-1 z-30 bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
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
              {rows.map((virtualRow) => {
                const rowStatic = rows.find((i) => i.index === virtualRow.index) as Row<any>;
                const hasError = includeIds.includes(String(rowStatic.index));

                if (hasError) {
                  return (
                    <tr
                      onClick={() => {}}
                      key={rowStatic.id}
                      className={`hover:bg-gray-50 cursor-pointer ${hasError ? "bg-red-100 hover:bg-red-200 h-[90px] " : ""} ${
                        !hasError ? "bg-green-50 hover:bg-green-50 h-[70px]" : ""
                      }`}
                    >
                      <FormProvider {...methods}>
                        {rowStatic.getVisibleCells().map((cell) => (
                          <td key={cell.id} className={`"p-1 px-1 text-sm whitespace-nowrap `}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </FormProvider>
                    </tr>
                  );
                }

                return null;
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
