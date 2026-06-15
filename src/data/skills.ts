export type SkillGroup = {
  name: string;
  description: string;
  items: string[];
  relatedProjectSlugs: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    name: "Product Planning",
    description: "사용자 문제 정의부터 기능 우선순위와 발표 메시지까지 연결",
    items: ["문제 정의", "사용자 인터뷰", "요구사항 정리", "우선순위 결정", "서비스 메시지"],
    relatedProjectSlugs: ["coffee-scout", "donggugi", "mcs"],
  },
  {
    name: "UX / Design",
    description: "정보 구조와 화면 흐름을 구체적인 와이어프레임으로 전환",
    items: ["IA 설계", "사용자 흐름", "와이어프레임", "브랜딩", "UT 운영"],
    relatedProjectSlugs: ["coffee-scout", "mcs", "dev-frequency"],
  },
  {
    name: "Frontend",
    description: "Next.js 기반 웹 인터페이스 구현과 데이터 중심 화면 구성",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "App Router"],
    relatedProjectSlugs: ["dev-frequency", "coffee-scout"],
  },
  {
    name: "Backend / Data",
    description: "서비스 기획 단계에서 기술 구조와 데이터 활용 가능성까지 고려",
    items: ["SQL", "REST API", "MongoDB", "MySQL", "Flask", "Spring Boot"],
    relatedProjectSlugs: ["donggugi", "coffee-scout"],
  },
  {
    name: "AI / Research",
    description: "AI 기능의 사용자 가치와 데이터 제약을 함께 검토",
    items: ["Ko-BART", "PyTorch", "뉴스 요약", "데이터 분석", "리서치 정리"],
    relatedProjectSlugs: ["donggugi"],
  },
  {
    name: "Collaboration",
    description: "동아리와 프로젝트 팀에서 운영, 커뮤니케이션, 산출물 정리를 담당",
    items: ["PM", "문서화", "발표", "예산 편성", "팀 운영"],
    relatedProjectSlugs: ["coffee-scout", "donggugi", "mcs"],
  },
];
