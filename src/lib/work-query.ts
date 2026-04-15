export type Work = { slug: string; year: number; order: number };

export type YearGroup<T extends Work = Work> = {
  year: number;
  works: T[];
};

export function groupWorksByYear<T extends Work>(works: T[]): YearGroup<T>[] {
  const byYear = new Map<number, T[]>();
  for (const work of works) {
    const list = byYear.get(work.year) ?? [];
    list.push(work);
    byYear.set(work.year, list);
  }

  return [...byYear.entries()]
    .map(([year, list]) => ({
      year,
      works: list.sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => b.year - a.year);
}
