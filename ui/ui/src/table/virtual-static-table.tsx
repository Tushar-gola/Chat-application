import "@tanstack/react-table";
import { flexRender, Row, RowData, Table } from "@tanstack/react-table";
import { cx } from "class-variance-authority";
import { DragEvent, useRef, useState } from "react";
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
  _onRowClick?: (id: string) => void;
};

export function CustomVirtualStaticTable<T extends RowData>({ tableStatic, _onRowClick }: CustomTableProps<T>) {
  const handleRowClick = (id: string) => {
    if (_onRowClick) {
      _onRowClick(id);
    }
  };

  let columnBeingDragged: number;

  const onDragStart = (e: DragEvent<HTMLElement>): void => {
    columnBeingDragged = Number(e.currentTarget.dataset.columnIndex);
  };

  const onDrop = (e: DragEvent<HTMLElement>): void => {
    e.preventDefault();
    const newPosition = Number(e.currentTarget.dataset.columnIndex);
    const currentCols = tableStatic.getVisibleLeafColumns().map((c) => c.id);
    const colToBeMoved = currentCols.splice(columnBeingDragged, 1);

    currentCols.splice(newPosition, 0, colToBeMoved[0]);
    tableStatic.setColumnOrder(currentCols);
  };

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { rows } = tableStatic.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 30,
    keyExtractor: (index) => rows[index].id,
  });

  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

  return (
    <div className="flex flex-col">
      <div
        className="align-middle inline-block min-w-full overflow-y-auto overflow-x-auto h-full overflow-hidden min-h-[calc(100vh_-_208px)] max-h-[calc(100vh_-_220px)]"
        style={{ overflowAnchor: "none", scrollBehavior: "smooth" }}
        ref={tableContainerRef}
      >
        {rows.length === 0 ? (
          <div className="w-full h-96 flex justify-center items-center">
            <Text>This table is empty.</Text>
          </div>
        ) : (
          <table className="min-w-full w-full">
            <thead className="sticky top-0 z-30 bg-white">
              {tableStatic.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="cursor-pointer bg-gray-100 ">
                  {headerGroup.headers.map((header) => (
                    <th
                      scope="col"
                      key={header.id}
                      style={{ width: header.getSize() }}
                      draggable={header.depth == 2 && !tableStatic.getState().columnSizingInfo.isResizingColumn}
                      data-column-index={header.index}
                      onDragStart={onDragStart}
                      onDragOver={(e): void => {
                        e.preventDefault();
                      }}
                      onDrop={onDrop}
                      colSpan={header.colSpan}
                      className={cx(
                        "px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider border-y border-gray-200 whitespace-nowrap ",
                        header.subHeaders.length > 1 ? "text-center border-2" : "text-left",
                        header.depth == 2 ? "hover:bg-gray-300" : ""
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

                return (
                  <tr key={rowStatic.id} className=" group  cursor-pointer" onDoubleClick={() => handleRowClick(rowStatic.id)}>
                    {rowStatic.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={cx(
                          "px-2 py-1 text-sm whitespace-nowrap  min-w-[120px] max-w-[600px] w-fit  group-hover:bg-gray-100",
                          cell.column.id.startsWith("forecast") ? "bg-green-50" : "",
                          cell.column.id.startsWith("actual") ? "bg-yellow-50" : ""
                        )}
                      >
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
      <div className="flex px-4 pt-2 gap-1 self-end">
        <Text variant="label_sm">Total Records:</Text>
        <Text variant="body_xs">{rows.length}</Text>
      </div>
    </div>
  );
}
