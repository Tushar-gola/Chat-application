import React from "react";
import { RowData, RowModel } from "@tanstack/react-table";
import { ButtonHTMLAttributes } from "react";
import { Icons } from "../svgs/icons";
import { InputMultiselect } from "../components/forms/input-multiselect";
import { cva, cx } from "class-variance-authority";
import { Text } from "../components/typography/text";

type TablePaginationProps<T extends RowData> = {
  getSelectedRowModel: () => RowModel<T>;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: () => void;
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  previousPage: () => void;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  totalRows: number;
};

export function PageButton({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="disabled:opacity-60 disabled:cursor-not-allowed relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-600 hover:bg-gray-100"
      {...rest}
    >
      {children}
    </button>
  );
}

export function TablePagination<T extends RowData>({
  getSelectedRowModel,
  hasNextPage,
  hasPreviousPage,
  nextPage,
  pageCount,
  pageIndex,
  pageSize,
  previousPage,
  setPageIndex,
  setPageSize,
  totalRows,
}: TablePaginationProps<T>) {
  const maxPageNumbersToShow = 5; // Number of page numbers to show in the middle

  // Calculate the range of page numbers to display
  const pageNumbers: number[] = [];

  // Determine the starting and ending page numbers in the middle
  let startPage = Math.max(0, pageIndex - Math.floor(maxPageNumbersToShow / 2));
  let endPage = Math.min(pageCount - 1, startPage + maxPageNumbersToShow - 1);

  // Adjust the range if it's not long enough
  if (endPage - startPage < maxPageNumbersToShow - 1) {
    startPage = Math.max(0, endPage - maxPageNumbersToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="grid py-1 px-4 grid-cols-3 ">
        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-center">
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{pageIndex + 1}</span> of <span className="font-medium">{pageCount}</span>
            </span>
            <InputMultiselect
              className="p-0"
              menuPlacement="auto"
              isSearchable={false}
              value={{ label: pageSize, value: pageSize }}
              isClearable={false}
              onChange={(e) => {
                console.log("🚀 ~ e:", e);
                setPageSize(Number(e?.value));
              }}
              options={[50, 100, 250, 500, 1000].map((pageSize) => ({
                label: pageSize,
                value: pageSize,
              }))}
            />
          </div>
        </div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px w-[300px] place-self-center"
          aria-label="Pagination"
        >
          <PageButton onClick={() => setPageIndex(0)} disabled={!hasPreviousPage}>
            <span className="sr-only">First</span>
            <Icons.FiChevronsLeft className="h-5 w-5" aria-hidden="true" />
          </PageButton>
          <PageButton onClick={() => previousPage()} disabled={!hasPreviousPage}>
            <span className="sr-only">Previous</span>
            <Icons.FiChevronLeft className="h-5 w-5" aria-hidden="true" />
          </PageButton>
          <div className="flex gap-2 items-center text-sm px-2">
            {startPage > 0 && <PageButton className=" md:inline select-none">...</PageButton>}
            {pageNumbers.map((pageNumber) => (
              <PageButton
                key={pageNumber}
                onClick={() => setPageIndex(pageNumber)}
                className={cx(
                  "w-6 h-6 rounded-full",
                  pageIndex === pageNumber ? "bg-teal-600 text-white" : "hover:bg-teal-700 hover:text-white"
                )}
              >
                {pageNumber + 1}
              </PageButton>
            ))}
            {endPage < pageCount - 1 && <PageButton className=" md:inline select-none">...</PageButton>}
          </div>

          <PageButton onClick={() => nextPage()}>
            <span className="sr-only">Next</span>
            <Icons.FiChevronRight className="h-5 w-5" aria-hidden="true" />
          </PageButton>
          <PageButton onClick={() => setPageIndex(pageCount - 1)} disabled={!hasNextPage}>
            <span className="sr-only">Last</span>
            <Icons.FiChevronsRight className="h-5 w-5" aria-hidden="true" />
          </PageButton>
        </nav>
      </div>
    </>
  );
}
