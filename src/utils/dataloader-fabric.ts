import DataLoader from "dataloader";

export function createGroupedLoader<Row, Item>(
  loadRows: (ids: readonly number[]) => Promise<readonly Row[]>,
  getId: (row: Row) => number,
  getItem: (row: Row) => Item,
): DataLoader<number, Item[]> {
  return new DataLoader(async (ids) => {
    const grouped = new Map<number, Item[]>();

    for (const row of await loadRows(ids)) {
      const id = getId(row);
      const item = getItem(row);
      const items = grouped.get(id);

      if (items) {
        items.push(item);
      } else {
        grouped.set(id, [item]);
      }
    }

    return ids.map((id) => grouped.get(id) ?? []);
  });
}
