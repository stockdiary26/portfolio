# Portfolio

UI/UX 디자이너 개인 포트폴리오. Astro 기반 정적 사이트.

## 개발

```bash
npm install
npm run dev
```

`http://localhost:4321` 접속.

## 스크립트

- `npm run dev` — 개발 서버 실행
- `npm run build` — 프로덕션 빌드 (`dist/`)
- `npm run preview` — 빌드 결과 로컬 미리보기
- `npm run check` — Astro 타입 · 콘텐츠 스키마 검증
- `npm test` — 단위 테스트 실행

## 작업물 추가하기

1. 이미지 원본을 `src/assets/works/<slug>/` 아래에 넣는다. (`thumb.png` + 본문 이미지들)
2. `src/content/works/<year>-<slug>.md` 파일을 만든다. 템플릿:

```md
---
title: "프로젝트 이름"
slug: "project-slug"
year: 2026
order: 1
thumbnail: "../../assets/works/project-slug/thumb.png"
images:
  - src: "../../assets/works/project-slug/01.png"
    caption: "메인 화면"
summary: "한 줄 요약"
---

본문 (선택).
```

3. `git push` → Vercel이 자동 배포.

## 스키마 필수 필드

Zod 스키마(`src/content/config.ts`)가 강제하는 필드:

- `title`, `year` (정수, 2000~2100), `thumbnail`, `summary` — 필수
- `images` — 최소 1장 필수
- `order` — 선택 (기본 0). 같은 연도 내 정렬 (작을수록 먼저)

누락·오류 시 `npm run check` 또는 빌드에서 실패한다.

**`slug`에 대한 주의:** `slug`는 Astro가 예약한 최상위 필드라 Zod 스키마 밖에서 관리된다. frontmatter에 `slug: "my-slug"`로 지정하면 URL이 `/works/my-slug`가 된다. 생략하면 파일명에서 자동 추출되어 `/works/2026-my-project`처럼 연도 접두사가 URL에 남는다. **항상 `slug`를 명시하는 것을 권장**한다 (깔끔한 URL + 파일명 변경 내성).

## 배포

- Vercel에 GitHub 저장소를 연결하면 `main` 푸시 시 자동 빌드·배포.
- 빌드 명령: `npm run build`, 출력: `dist/`
- Node 버전: 20+

## 파일 구조

```
src/
├── assets/works/<slug>/    작업물 이미지 원본
├── components/             UI 컴포넌트 (.astro)
├── content/
│   ├── config.ts           Zod 스키마
│   ├── about/about.md
│   └── works/*.md
├── layouts/Layout.astro    공통 레이아웃
├── lib/work-query.ts       정렬·그룹핑 유틸
├── pages/                  라우트
└── styles/                 토큰·글로벌 CSS
```
