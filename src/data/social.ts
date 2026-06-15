export type SocialLink = {
  platform: string;
  purpose: string;
  url: string;
  icon: string;
};

export const socialLinks: SocialLink[] = [
  {
    platform: "Velog",
    purpose: "기술 글쓰기 & 프로젝트 회고",
    url: "https://velog.io/@z1won",
    icon: "/velog_icon.jpg",
  },
  {
    platform: "GitHub",
    purpose: "소스 아카이브",
    url: "https://github.com/z1-won",
    icon: "/github_icon.png",
  },
  {
    platform: "LinkedIn",
    purpose: "커리어 프로필",
    url: "https://www.linkedin.com/in/지원-방-a874a1326",
    icon: "/linkedIn_icon.png",
  },
  {
    platform: "Instagram",
    purpose: "퍼스널 브랜드 & 일상 아카이브",
    url: "https://instagram.com/zl.won",
    icon: "/instagram_icon.png",
  },
  {
    platform: "Email",
    purpose: "직접 연락",
    url: "mailto:wonw512@gmail.com",
    icon: "/gmail_icon.png",
  },
];
