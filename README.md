# my-blog

### 파일 구조
```
📦src
 ┣ 📂components
 ┃ ┣ 📜BlogForm.js
 ┃ ┣ 📜BlogList.js
 ┃ ┣ 📜Card.js
 ┃ ┣ 📜LoadingSpinner.js
 ┃ ┣ 📜NavBar.js
 ┃ ┣ 📜Pagination.js
 ┃ ┗ 📜Toast.js
 ┣ 📂hooks
 ┃ ┗ 📜useToast.js
 ┣ 📂pages
 ┃ ┣ 📜AdminPage.js
 ┃ ┣ 📜CreatePage.js
 ┃ ┣ 📜EditPage.js
 ┃ ┣ 📜HomePage.js
 ┃ ┣ 📜ListPage.js
 ┃ ┣ 📜NotFoundPage.js
 ┃ ┗ 📜ShowPage.js
 ┣ 📂store
 ┃ ┣ 📜authSlice.js
 ┃ ┣ 📜store.js
 ┃ ┗ 📜toastSlice.js
 ┣ 📜App.js
 ┣ 📜ProtectedRoute.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┗ 📜routes.js
```
### 이미지

- Admin 페이지
<img width="1440" alt="스크린샷 2023-04-29 오후 6 28 20" src="https://user-images.githubusercontent.com/105588175/235295582-e8590f88-a3a7-49a8-b35a-46eb7d3e2fd9.png">

- Blog 페이지
<img width="1440" alt="스크린샷 2023-04-29 오후 5 54 20" src="https://user-images.githubusercontent.com/105588175/235294239-4b62a200-6245-4195-a166-22f75523d6d9.png">

- Create 페이지
<img width="1440" alt="스크린샷 2023-04-29 오후 5 54 42" src="https://user-images.githubusercontent.com/105588175/235294246-937636a8-12e4-4fb4-b2b9-c23e688b5763.png">

- 상세페이지
<img width="1440" alt="스크린샷 2023-04-29 오후 5 54 51" src="https://user-images.githubusercontent.com/105588175/235294254-292d7773-9283-4f38-8b5d-dc3815bf40e8.png">

---
### 프로젝트 소개

- 기술스택 : React, Bootstrap, Axios, React Router, Redux-Toolkit<br >
- 기능 : 로그인 / 로그아웃, Admin / CRUD, 검색, 토스트 알럿, 페이지네이션<br >

---
### 프로잭트 실행 방법

1. 설치
   ```
   npm install
   ```
2. 실행
   ```
   npm start
   ```
3. json.server 실행
   ```
   npm run db
   ```
---
### 주요 기능 설명

- 로그인 / 로그아웃
   - redux-toolkit으로 상태 전역 관리
   - 로컬스토리지에 값을 저장하는 방식으로 로그인 처리
   - 로그인 시 Admin 페이지 진입 가능
   </br>
- Admin / CRUD
   - Admin이면, 게시물 Create / Edit / Delete 권한 부여
   - Admin이면, Publish 체크 유무에 상관없이 모든 게시물 조회 권한 부여
   - Adimin이 아니라면, Publish가 체크된 게시물만 조회 가능
   </br>
- 검색
   - onKeyUp 이벤트를 사용하여 검색바에 검색어 입력 후, Enter키 누르면 검색 실행
   - 검색어와 게시물 제목의 일부분 혹은 전체가 일치하다면 검색 결과로 반환 
   </br>
- 토스트 알럿
   - redux-toolkit으로 상태 전역 관리
   - 최상위 컴포넌트인 App.js에서 Toast 컴포넌트를 렌더링
   - 토스트 알럿을 등록하고 삭제하는 함수를 useToast 커스텀훅으로 작성 후 활용
   - setTimeout을 사용하여 토스트 알럿 실행 후 3초 뒤에 자동으로 삭제되는 기능 추가
   </br>
- 페이지네이션
   - 한 페이지에는 게시물이 5개이고, 총 게시물이 6개 이상이라면 페이지 버튼 활성화
   - 뒤로가기 버튼을 누르면 이전 페이지로 이동 가능
   - 페이지가 5개가 넘는다면, Next 버튼과 Previous 버튼 활성화
