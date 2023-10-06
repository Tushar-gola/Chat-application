import { RankingInfo, compareItems, rankItem } from "@tanstack/match-sorter-utils";
import { FilterFn, SortingFn, sortingFns } from "@tanstack/react-table";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const fuzzyFilter: FilterFn<any> = (row, columnId, values) => {
  const itemValues = row.getValue(columnId);
  const itemWords = ((itemValues as string) || "").toString().toLowerCase().split(/\s+/);

  if (Array.isArray(values) && values.length > 0) {
    return values.some((filterWord) => itemValues === filterWord);
  } else if (!Array.isArray(values) && values !== "") {
    const filterWords = ((values as string) || "").toString().toLowerCase().split(/\s+/);

    for (const filterWord of filterWords) {
      let found = false;
      for (const itemWord of itemWords) {
        if (itemWord.includes(filterWord)) {
          found = true;
          break;
        }
      }
      if (!found) {
        return false; // Early termination
      }
    }
    return true;
  } else {
    return true;
  }
};

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(rowA.columnFiltersMeta[columnId]?.itemRank!, rowB.columnFiltersMeta[columnId]?.itemRank!);
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
