import { RowData, Table } from "@tanstack/table-core";
import { DebouncedInput } from "../components/forms/debounced-input";
import { Text } from "../components/typography/text";
import { CustomTable } from "./table";

type TableWithGlobalFilterProps<T extends RowData> = {
  table: Table<T>;
  setFilter?: React.Dispatch<React.SetStateAction<string>>;
  filter?: string;
  title: string;
};

export function TableWithGlobalFilter<T extends RowData>({ table, setFilter, filter, title }: TableWithGlobalFilterProps<T>) {
  return (
    <section className="border border-gray-100 rounded-lg bg-gray-50 ">
      <div className="bg-teal-900 px-4 p-2 rounded-t-lg text-white flex justify-between items-center">
        <Text variant="label">{title}</Text>
        {setFilter && (
          <div className="flex items-center w-[500px] justify-end">
            <DebouncedInput
              value={filter ?? ""}
              onChange={(value) => setFilter(String(value))}
              className="bg-teal-900 border-white/30 placeholder-white/30 text-white"
              placeholder="Search..."
            />
          </div>
        )}
      </div>

      <div className="overflow-auto h-full max-h-[calc(100vh_-_250px)]">
        <CustomTable table={table} />
      </div>
    </section>
  );
}
