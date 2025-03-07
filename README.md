# BookMark

![250307-3](https://github.com/user-attachments/assets/357c048c-590a-47c2-a5bd-6e7696528b20)

<div align="center">
  
  [서비스 바로가기](https://book-mark-flame.vercel.app)
  
</div>

## 프로젝트 소개

**BookMark**는 바코드를 활용해 간편하게 책을 등록하고, 읽은 책을 기록할 수 있는 온라인 서재 서비스입니다.

이사를 하면서 뒤죽박죽된 책들을 정리하던 중, 책들을 **카테고리** 별로 정리하면 보기 좋을 것 같다는 생각이 들었습니다.

하지만 어떤 책이 어떤 카테고리에 속하는지 확인하기 위해서는 일일이 제목을 검색해 정보를 찾아봐야했고, 그 과정이 굉장히 번거로웠습니다.

가지고 있는 책 목록을 정리하고 정보를 간단하게 확인할 수 있는 수단이 있으면 편리할 것 같다는 생각에서 이 프로젝트를 시작하게 되었습니다.

## 주요 기능

### 책 등록
- 책 제목, 저자, ISBN을 통해 책을 검색하고 서재에 등록할 수 있습니다.

![250307-4](https://github.com/user-attachments/assets/4dcd6d4b-5d2d-4eee-925e-67da5ab45a25)

- 바코드 스캔을 통해 책을 검색하고 서재에 등록할 수 있습니다.

![250307-11](https://github.com/user-attachments/assets/c102f375-cc34-40cf-a913-b8fed7c63525)

### 등록된 책 검색
- 서재에 등록되어 있는 책을 검색할 수 있습니다.

![250307-10](https://github.com/user-attachments/assets/8e2f12e8-5f93-497b-a2fa-db0b58562ea5)

### 책 상태별 분류
- 원하는 상태(`읽는 중`, `완독한 책`, `읽을 예정`, `중단`)의 책을 모아 볼 수 있습니다.

![250307-8](https://github.com/user-attachments/assets/892ce9dd-59ca-48a7-ab10-f36b42b9281c)

### 독서 기록 작성
- 책의 상태, 별점, 시작일, 완독일, 진행 상황을 기록할 수 있습니다.

![250307-5](https://github.com/user-attachments/assets/d199696c-8ffe-4e8d-bbb3-2fa8a2e78f98)

### 독서 노트 작성 및 수정
- 독서 노트를 작성할 수 있습니다.

![250307-6](https://github.com/user-attachments/assets/c253c514-61dc-4b1b-a797-ab0228ad0ef9)

- 작성한 독서 노트를 수정하거나 삭제할 수 있습니다.

![250307-7](https://github.com/user-attachments/assets/4c3c2a17-9868-4efa-8798-25ed1cf91754)

### 책 삭제
- 서재에 등록된 책을 삭제할 수 있습니다.

![250307-9](https://github.com/user-attachments/assets/ddb92503-4ee5-475f-bc9e-604bff381989)


## 기술 스택

<table>
  <thead>
    <td>분류</td>
    <td>기술 스택</td>
  </thead>
  <tbody>
    <tr>
      <td>프론트엔드</td>
      <td>
        <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=TailwindCss&logoColor=white"> <img src="https://img.shields.io/badge/react zxing-000000?style=for-the-badge&logo=react-zxing&logoColor=white">
      </td>
    </tr>
    <tr>
      <td>백엔드</td>
      <td>
        <img src="https://img.shields.io/badge/Firebase-DD2C00?style=for-the-badge&logo=Firebase&logoColor=white"> <img src="https://img.shields.io/badge/Aladin API-E63792?style=for-the-badge&logo=AladinAPI&logoColor=white">
      </td>
    </tr>
    <tr>
      <td>배포</td>
      <td>
        <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">
      </td>
    </tr>
  </tbody>
</table>

## 프로젝트 구조

```
📁 api                    # 서버리스 함수 (Vercel Functions)
├── 📁 lookup
│   └── 📄 [isbn].ts      # ISBN으로 책 정보 조회
└── 📁 search
    └── 📄 [keyword].ts   # 키워드로 책 검색
📁 src
├── 📁 api                # 클라이언트에서 사용하는 API 호출 함수
├── 📁 components         # 공통 UI 컴포넌트
│   ├── 📁 Dashboard      # 대시보드 화면 구성
│   ├── 📁 Home           # 홈 화면 구성
│   ├── 📁 Modal          # 모달 관련 컴포넌트
│   │   ├── 📁 AddBookModal    # 책 등록 모달
│   │   └── 📁 BookDetailModal # 책 상세 모달
│   └── 📁 Sidebar        # 사이드바 메뉴
├── 📁 constants          # 상수 파일
├── 📁 hooks              # 커스텀 훅
├── 📁 types              # 타입 정의
├── 📁 utils              # 유틸리티 함수
├── 📄 app.js             # 로컬 테스트용 백엔드 서버 (express)
├── 📄 App.tsx
├── 📄 firebase.ts        # Firebase 설정
├── 📄 main.tsx
└── 📄 index.css
```

## 실행 방법

### 로컬 개발 환경 구성

```bash
# 저장소 복제
git clone https://github.com/suhyun-00/BookMark.git

# 패키지 설치
npm install

# 프로젝트 개발 모드 실행 (Frontend + Backend)
npm run dev
```

### 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성하고 다음 값을 설정합니다:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_API_ID=your_firebase_api_id
VITE_SERVER_URL=http://localhost:3000
ALADIN_LOOKUP_URL=http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=your_ttbkey&itemIdType=ISBN13&ItemId=
ALADIN_SEARCH_URL=http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=your_ttbkey&&Query=
PORT=3000
```

✓ [firebase 웹 프로젝트를 생성](https://firebase.google.com/)하고 config 값을 `VITE_FIREBASE_*`에 넣어주세요.

✓ [알라딘 API Key를 발급](https://blog.aladin.co.kr/openapi/category/29154404?start=we)받아 `ALADIN_*`의 `your_ttbkey`에 넣어주세요.
