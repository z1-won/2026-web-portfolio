import Link from "next/link";
import { projects } from "@/data/projects";

const highlights = [
  {
    label: "PM-minded Builder",
    text: "사용자 문제를 먼저 구조화하고, 화면과 데이터 흐름까지 이어서 구현하는 쪽에 강점이 있습니다.",
  },
  {
    label: "Product Research",
    text: "인터뷰, 정책 담당자 면담, UT처럼 실제 사람과 만나는 검증 과정을 프로젝트 안에 넣습니다.",
  },
  {
    label: "Community Operator",
    text: "동아리 운영, 예산 편성, 행사 기획 경험을 바탕으로 팀이 움직이는 조건을 함께 설계합니다.",
  },
];

const timeline = [
  {
    period: "2026",
    title: "Dev Frequency",
    text: "프로젝트와 역량을 macOS 데스크톱 경험으로 탐색하는 개인 포트폴리오를 만들고 있습니다.",
  },
  {
    period: "2025",
    title: "Farm System / CAPS / 상록수커피클럽",
    text: "운영진, 회장, 대외협력, 브랜딩 역할을 맡으며 커뮤니티 운영과 제품적 사고를 함께 쌓았습니다.",
  },
  {
    period: "2024 – 2025",
    title: "Coffee Scout",
    text: "YAPP 25기에서 취향 기반 카페 큐레이션 서비스를 PM으로 기획하고 UT와 데모데이를 운영했습니다.",
  },
  {
    period: "2024",
    title: "동구기 / MCS",
    text: "대학스포츠 커뮤니티 앱과 공공 주거·돌봄 서비스를 기획하며 문제 정의와 서비스 구조화를 경험했습니다.",
  },
];

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ desktopWindow?: string }>;
}) {
  const { desktopWindow } = await searchParams;
  const querySuffix = desktopWindow === "1" ? "?desktopWindow=1" : "";
  const featured = projects.filter((project) =>
    ["coffee-scout", "donggugi", "mcs"].includes(project.slug)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <section className="mb-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className="mb-2 font-mono text-[10px] tracking-widest text-subtle">ABOUT</p>
          <h1 className="text-3xl font-bold leading-tight text-text md:text-5xl">
            문제를 서비스로 번역하는 PM-minded developer, 방지원입니다.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
            동국대학교 AI소프트웨어융합학부 컴퓨터공학전공에 재학 중이며,
            문예창작을 함께 공부하고 있습니다. 사용자 인터뷰와 서비스 기획,
            화면 설계, 프론트엔드 구현을 연결해 아이디어가 실제로 작동하는
            형태가 되도록 만드는 일에 관심이 많습니다.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-5">
          <p className="font-mono text-[10px] tracking-widest text-subtle">CURRENT FOCUS</p>
          <div className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-muted">
            <p>Next.js 기반 포트폴리오와 프로젝트 아카이브 개선</p>
            <p>제품 기획 경험을 프론트엔드 구현물로 명확히 보여주는 방식 실험</p>
            <p>SQLD, ADsP를 바탕으로 데이터 활용 역량 확장</p>
          </div>
        </div>
      </section>

      <section className="mb-14 grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.label} className="rounded-lg border border-border bg-surface p-5">
            <h2 className="font-mono text-sm font-semibold text-text">{item.label}</h2>
            <p className="mt-3 text-xs leading-relaxed text-muted">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="mb-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 font-mono text-[10px] tracking-widest text-subtle">SELECTED WORK</p>
            <h2 className="text-xl font-semibold text-text">기획에서 구현까지 이어진 작업들</h2>
          </div>
          <Link href={`/projects${querySuffix}`} className="text-xs text-muted transition-colors hover:text-accent-lime">
            View archive →
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}${querySuffix}`}
              className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent-lime/50"
            >
              <p className="font-mono text-[10px] text-subtle">{project.period}</p>
              <h3 className="mt-2 text-sm font-semibold text-text">{project.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{project.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-6 font-mono text-[10px] tracking-widest text-subtle">TIMELINE</p>
        <div className="flex flex-col divide-y divide-border border-y border-border">
          {timeline.map((item) => (
            <div key={`${item.period}-${item.title}`} className="grid gap-3 py-5 md:grid-cols-[110px_1fr]">
              <p className="font-mono text-xs text-subtle">{item.period}</p>
              <div>
                <h3 className="text-sm font-semibold text-text">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
