import { Column, Table } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { DebouncedInput } from "../components/forms/debounced-input";

export function TableFilterBase<T>({
  column,
  table,
}: {
  column: Column<T, unknown>;
  table: Table<T>;
}) {
  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column]
  );

  return (
    <>
      <datalist id={`${column.id}list`}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        state={columnFilterValue ? "positive" : "default"}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`${column.columnDef.header}`}
        list={`${column.id}list`}
      />
      <div className="h-1" />
    </>
  );
}

export const TableFilter = memo(TableFilterBase) as typeof TableFilterBase;
