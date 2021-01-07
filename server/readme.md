### 사용법

1. `.env` 파일에서 설정을 확인합니다.

    DBCONFIG 는 [사용자]:[패스워드]@[호스트(기본은 local)]/[db 이름] 의 구조입니다.

    기본으로 test 데이터베이스를 사용하므로, `create database test;` 명령을 입력해주세요.

2. swagger 관련 주석이 변경되었다면 `swag init` 으로 적용합니다.

    swagger 는 별도로 설치해야합니다. `go get -u github.com/swaggo/swag/cmd/swag`

3. `/server` 디렉토리에서 `go run main.go` 를 입력합니다.

4. swagger 문서는 http://localhost:5000/swagger/index.html 에서 확인할 수 있으며, api 기본 루트는 `/api/v1`입니다. 예: http://localhost:5000/api/v1/members


### 참고문헌

* 디렉토리 구조: https://github.com/swaggo/swag/tree/master/example/celler

* db 연결: https://github.com/velopert/gin-rest-api-sample