import { describe, it, expect } from 'vitest';
import { groupWorksByYear } from './work-query';
import { getAdjacentWorks, sortWorks } from './work-query';

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

describe('sortWorks', () => {
  it('연도 내림차순, order 오름차순으로 정렬한다', () => {
    const works: Work[] = [
      { slug: 'c', year: 2024, order: 1 },
      { slug: 'b', year: 2026, order: 2 },
      { slug: 'a', year: 2026, order: 1 },
    ];

    const result = sortWorks(works);

    expect(result.map((w) => w.slug)).toEqual(['a', 'b', 'c']);
  });
});

describe('getAdjacentWorks', () => {
  const works: Work[] = [
    { slug: 'a', year: 2026, order: 1 },
    { slug: 'b', year: 2026, order: 2 },
    { slug: 'c', year: 2025, order: 1 },
  ];

  it('중간 작업물은 prev와 next를 모두 반환한다', () => {
    const result = getAdjacentWorks(works, 'b');
    expect(result.prev?.slug).toBe('a');
    expect(result.next?.slug).toBe('c');
  });

  it('첫 작업물은 prev가 null이다', () => {
    const result = getAdjacentWorks(works, 'a');
    expect(result.prev).toBeNull();
    expect(result.next?.slug).toBe('b');
  });

  it('마지막 작업물은 next가 null이다', () => {
    const result = getAdjacentWorks(works, 'c');
    expect(result.prev?.slug).toBe('b');
    expect(result.next).toBeNull();
  });

  it('존재하지 않는 slug는 prev·next 모두 null이다', () => {
    const result = getAdjacentWorks(works, 'zzz');
    expect(result.prev).toBeNull();
    expect(result.next).toBeNull();
  });
});
