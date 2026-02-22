# onebite log ( clone project )

- [onebite log](https://onebite-log-mu.vercel.app/)

## tech

- [vite](https://vite.dev/)
- [typescript](https://www.typescriptlang.org/)
- [react](https://react.dev/)
- [react router](https://reactrouter.com/)
- [tailwindcss](https://tailwindcss.com/)
- [shadcn](https://ui.shadcn.com/)
- [zustand](https://zustand-demo.pmnd.rs/)
- [tanstack query](https://tanstack.com/query/latest)
- [supabase](https://supabase.com/)
- [vercel](https://vercel.com/)

## 기능

- 인증
  - 회원가입
  - 로그인, 소셜 로그인( github 계정 )
  - 로그아웃
  - 비밀번호 재설정

- profile
  - 작성, 이미지 첨부
  - 수정

- post
  - 작성, 이미지 첨부
  - 리스팅
  - 수정, 이미지 수정
  - 삭제, 이미지 삭제
  - 좋아요 기능
  - 댓글
    - 작성
    - 리스팅
    - 수정
    - 삭제
    - 대댓글, 무한 대댓글 작성

- theme
  - 적용
  - localstorage 이용 ( zustand persist middleware )
  - system theme 이용 ( window.matchMedia )

- 캐싱전략과 관리
  - tansk query 를 이용해 캐시 정규화, 관리 등
