# 프론트 엔드

## Tech

React hook, scss, MVVM pattern

## Start

remove package-lock.json
  ```sh
  npm install
  npm start
  ```

## Structure
- 📁 frontend
  - 📁 components 
    - 📄 Model.js (관리할 값 정의및 Context화)
    - 📄 Provider.js (ViewModel이 Model의 구독하는 관계 형성)
    - 📄 ViewModel.js (Model의 State 변경 및 View 알림)
    - 📁 UI (페이지 내에서 사용될 컴포넌트 폴더)
      - 📁 Login  (로그인 페이지에 사용될 컴포넌트)
      - 📁 Problem (문제풀이 페이지에 사용될 컴포넌트
      - 📁 Question (질문 페이지에 사용될 컴포넌트)
      - 📁 User (유저 페이지에 사용될 컴포넌트)
    - 📁 View
  - 📁 function
  - 📁 scss
    - 📁 base
    - 📁 UI
    - 📁 View
    - 📄 main.scss
  - 📄 package.json
  - 📄 App.js
  - 📄 Root.js
