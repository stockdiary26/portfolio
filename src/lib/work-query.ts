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

export function sortWorks<T extends Work>(works: T[]): T[] {
  return [...works].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return a.order - b.order;
  });
}

export function getAdjacentWorks<T extends Work>(
  works: T[],
  currentSlug: string,
): { prev: T | null; next: T | null } {
  const sorted = sortWorks(works);
  const idx = sorted.findIndex((w) => w.slug === currentSlug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? sorted[idx - 1]! : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1]! : null,
  };
}
