# dev-frequency

PM 경험, 서비스 기획 과정, 프론트엔드 구현 역량을 함께 보여주는 아카이브형 포트폴리오 사이트.
macOS 데스크톱 UI(Dock, 메뉴바, 드래그 가능한 창)를 인터랙션 컨셉으로 사용한다.

## Pages

| 경로 | 내용 |
|------|------|
| `/` | macOS 데스크톱 홈 |
| `/projects` | 프로젝트 아카이브 (필터 + 그리드/리스트 뷰) |
| `/projects/[slug]` | 프로젝트 케이스 스터디 |
| `/skills` | 스킬 매트릭스 & 자격증 |
| `/writing` | Velog 글 목록 (RSS 연동) |
| `/contact` | 소셜 링크 & 이메일 |

## Stack

- **Framework** Next.js 16 (App Router)
- **Language** TypeScript
- **Styling** Tailwind CSS v4
- **Data** `src/data/` 정적 파일 (projects, skills, certificates, social)
- **External** Velog RSS (`https://v2.velog.io/rss/@z1won`)

## Project Structure

```
src/
├── app/(site)/          # 페이지 라우트
├── components/
│   ├── macos/           # UI 프리미티브 (Window, Dock, MenuBar, DesktopShell)
│   └── shell/           # 사이트 레이아웃 래퍼 (SiteWindow)
├── data/                # 정적 데이터 (projects, skills, certificates, social)
└── lib/
    ├── api/             # 외부 API (Velog RSS)
    └── utils/           # 순수 유틸 함수
```

## Getting Started

```bash
npm install
npm run dev
```

또는 메모리 자동 재시작이 필요한 경우:

```bash
./dev.sh
```

## CI/CD (GitHub Actions)

main 브랜치에 push 시 자동으로 타입 체크 → 린트 → EC2 배포가 실행된다.
PR은 CI(타입 체크 + 린트)만 실행하고 배포는 하지 않는다.

```
push to main ──→ CI (tsc + lint) ──→ Deploy (SSH → git pull → docker compose up)
pull_request  ──→ CI only
```

### GitHub Secrets 설정

GitHub 레포 → Settings → Secrets and variables → Actions 에서 아래 세 값을 추가한다.

| Secret | 값 |
|--------|---|
| `EC2_HOST` | EC2 퍼블릭 IP 또는 도메인 |
| `EC2_USER` | EC2 접속 유저 (예: `ubuntu`) |
| `EC2_SSH_KEY` | EC2 PEM 키 파일 전체 내용 |

### EC2 초기 설정 (최초 1회)

```bash
# EC2에 접속 후
git clone <repo-url> ~/dev-frequency
cd ~/dev-frequency
docker compose up -d --build
```

이후부터는 main push 시 GitHub Actions가 자동으로 배포한다.

## Deploy (EC2)

Docker와 docker-compose가 설치된 EC2 인스턴스에서 실행한다.
EC2 보안 그룹에서 포트 80(HTTP), 443(HTTPS) 인바운드를 허용해야 한다.

```bash
# 저장소 클론
git clone <repo-url> && cd dev-frequency

# 빌드 & 실행 (app + nginx)
docker-compose up -d --build

# 로그 확인
docker-compose logs -f

# 재시작 / 중지
docker-compose restart
docker-compose down
```

앱은 `http://<EC2-PUBLIC-IP>`로 접근 가능하다 (nginx가 80 → app:3000 프록시).

### HTTPS 설정 (도메인 연결 후)

```bash
# EC2에 certbot 설치
sudo apt install certbot

# 인증서 발급 (nginx 중지 후 standalone 방식)
docker-compose stop nginx
sudo certbot certonly --standalone -d example.com
docker-compose start nginx
```

발급 후 `nginx/default.conf`의 HTTPS 블록 주석을 해제하고,
`docker-compose.yml`의 letsencrypt 볼륨 주석도 해제한 뒤 재시작한다.

```bash
docker-compose up -d --build
```

## Data

프로젝트 데이터는 `src/data/projects.ts`에서 관리한다. 항목 추가 시 `slug`는 URL-safe한 kebab-case를 사용할 것 (`/` 및 공백 금지).

스킬-프로젝트 연결은 `src/data/skills.ts`의 `relatedProjectSlugs`가 `projects.ts`의 `slug`를 참조한다.
