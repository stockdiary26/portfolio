import { describe, it, expect } from 'vitest';
import { groupWorksByYear } from './work-query';

type Work = { slug: string; year: number; order: number };

describe('groupWorksByYear', () => {
  it('연도별로 그룹을 만들고 최신 연도를 먼저 배치한다', () => {
    const works: Work[] = [
      { slug: 'a', year: 2024, order: 1 },
      { slug: 'b', year: 2026, order: 1 },
      { slug: 'c', year: 2025, order: 1 },
    ];

    const result = groupWorksByYear(works);

    expect(result.map((g) => g.year)).toEqual([2026, 2025, 2024]);
  });

  it('같은 연도 내에서는 order 오름차순으로 정렬한다', () => {
    const works: Work[] = [
      { slug: 'a', year: 2026, order: 3 },
      { slug: 'b', year: 2026, order: 1 },
      { slug: 'c', year: 2026, order: 2 },
    ];

    const result = groupWorksByYear(works);

    expect(result).toHaveLength(1);
    expect(result[0]!.works.map((w) => w.slug)).toEqual(['b', 'c', 'a']);
  });

  it('빈 배열은 빈 결과를 반환한다', () => {
    expect(groupWorksByYear([])).toEqual([]);
  });
});
