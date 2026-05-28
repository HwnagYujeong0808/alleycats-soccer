# ⚽ Alleycats Soccer Club — Website

반응형 공식 웹사이트 (HTML + CSS + Node.js)

## 📁 프로젝트 구조

```
alleycats/
├── server.js              ← Node.js Express 서버 (메인 진입점)
├── package.json           ← 의존성 목록
├── views/
│   └── index.html         ← 메인 홈페이지 (반응형)
├── public/
│   ├── css/
│   │   └── style.css      ← 전체 스타일 (CSS 변수, 반응형)
│   └── js/
│       └── main.js        ← 인터랙션 JS (스크롤, 애니메이션 등)
└── README.md
```

## 🚀 실행 방법

### 1. 의존성 설치
```bash
cd alleycats
npm install
```

### 2. 서버 시작
```bash
# 일반 실행
npm start

# 개발 모드 (파일 변경 시 자동 재시작)
npm run dev
```

### 3. 브라우저에서 확인
```
http://localhost:3000
```

## 🎨 주요 기능

| 기능 | 설명 |
|------|------|
| **반응형 디자인** | 모바일(480px), 태블릿(768px), 데스크탑 완벽 지원 |
| **고정 네비게이션** | 스크롤 시 배경 변경 + 모바일 햄버거 메뉴 |
| **히어로 섹션** | 풀스크린 배경 + 애니메이션 텍스트 |
| **숫자 카운터** | 화면에 나타날 때 숫자 애니메이션 |
| **스크롤 페이드** | 섹션들이 부드럽게 등장 |
| **뉴스 카드** | 호버 시 3D 틸트 효과 |
| **REST API** | `/api/news`, `/api/coaches` 엔드포인트 |

## 🌐 페이지 라우트

| URL | 설명 |
|-----|------|
| `/` | 홈페이지 |
| `/teams` | 팀 목록 |
| `/news` | 뉴스 페이지 |
| `/coaches` | 코치진 페이지 |
| `/api/news` | 뉴스 JSON API |
| `/api/coaches` | 코치 JSON API |

## 🎨 디자인 시스템

```css
--red:    #C8102E   /* 메인 브랜드 컬러 */
--navy:   #0A1628   /* 다크 배경 */
--white:  #FFFFFF
--gold:   #C9A84C   /* 강조 색상 */

/* 폰트 */
Oswald          → 헤딩
Barlow Condensed → 라벨/버튼
Barlow          → 본문
```

## ☁️ 배포 방법

### Heroku
```bash
heroku create alleycats-soccer
git push heroku main
```

### Railway / Render
- `server.js`를 시작 파일로 지정
- 포트는 `process.env.PORT`로 자동 설정

### Vercel (정적 버전)
- `views/index.html`을 루트에 복사
- Vercel CLI로 배포: `vercel deploy`
