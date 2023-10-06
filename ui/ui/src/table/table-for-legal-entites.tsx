import { flexRender, RowData, Table } from "@tanstack/react-table";
import { cx } from "class-variance-authority";
import { Icons } from "../svgs/icons";

import "@tanstack/react-table";
import { IconEmpty } from "../../../../apps/web/src/svg/icons";
import { Text } from "../components/typography/text";

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    columnFilter?: boolean;
  }
}

type CustomTableProps<T extends RowData & { type: (typeof LEGAL_ENTITY_TYPES)[number] }> = {
  table: Table<T>;
};

export const LEGAL_ENTITY_TYPES = [
  "JV",
  "Project Company",
  "Parent Holding Company",
  "Substation Right Holder",
  "Land Company",
  "Equity Investment",
] as const;

export function TableForLegalEntites<T extends RowData & { type: (typeof LEGAL_ENTITY_TYPES)[number] }>({
  table,
}: CustomTableProps<T>) {
  const rows = table.getRowModel().rows;

  const getRowBgColor = (type: (typeof LEGAL_ENTITY_TYPES)[number]) => {
    if (type === "JV") return "bg-[#93d0e2] hover:bg-[#93d0e290]";
    if (type === "Project Company") return "bg-[#eff4f6] hover:bg-[#eff4f690]";
    if (type === "Parent Holding Company") return "bg-[#e3ddee] hover:bg-[#e3ddee90]";
    if (type === "Land Company") return "bg-[#fff3a7] hover:bg-[#fff3a790]";
    if (type === "Equity Investment") return "bg-[#eeb3b2] hover:bg-[#eeb3b290]";
    if (type === "Substation Right Holder") return "bg-[#aed293] hover:bg-[#aed29390]";
    return "bg-white hover:bg-gray-50";
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
            <thead className="bg-gray-100 sticky -top-1">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      scope="col"
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cx(
                        "p-4 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider border-y border-gray-200 whitespace-nowrap",
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
                <tr key={row.id} className={cx("", getRowBgColor(row.original.type))}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 px-4 text-sm whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
