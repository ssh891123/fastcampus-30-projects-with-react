draggable 컴포넌트 

[lib추가]underscore - debounce를 사용하기 위해 설치

npm package 등록 방법
(1) npm - 회원가입 / 로그인
(2) babel 설치: npm i -D @babel/cli @babel/preset-reac
(3-1) package.json에 추가 - "publish":"rm -rf dist && mkdir dist && babel src/lib -d dist --copy-files"
(3-2) name: ID/packageNumber //ID는 Npm사이트의 동일한 ID로 해야됨
(4) dist 생성: npm run pulish
(5) .gitignore에 /src, /public 추가
(6) npm login
(7) npm publish -access public