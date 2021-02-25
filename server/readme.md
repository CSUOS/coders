# 사용법

1. `.env` 파일에서 설정을 확인합니다.

    DBCONFIG 는 [사용자]:[패스워드]@[호스트(기본은 local)]/[db 이름] 의 구조입니다.

    기본으로 test 데이터베이스를 사용하므로, `create database test;` 명령을 입력해주세요.

2. swagger 관련 주석이 변경되었다면 `swag init` 으로 적용합니다.

    swagger 는 별도로 설치해야합니다. `go get -u github.com/swaggo/swag/cmd/swag`

3. `/server` 디렉토리에서 `go run main.go` 를 입력합니다.

4. swagger 문서는 http://localhost:5000/swagger/index.html 에서 확인할 수 있으며, api 기본 루트는 `/api/v1`입니다. 예: http://localhost:5000/api/v1/members


# judge-server 실행 및 통신 방법

*아래의 과정은 https://docs.dmoj.ca/#/judge/setting_up_a_judge?id=judge-side-setup 의 내용을 참조하여 작성하였습니다.*

judge-server는 윈도우를 지원하지 않고 리눅스 상에서 동작하므로, 아래 과정은 리눅스에서 실행하시거나, 윈도우의 WSL 상에서 실행하셔야 합니다.

## judge-server 설정 파일 만들기

judge-server를 설치 및 실행하기에 앞서, 특정 디렉토리에 judge-server의 세부 설정을 담고 있는 yml 파일을 만들고, 같은 디렉토리에 채점할 문제의 입출력 파일을 준비해야 합니다. **이 문서에서는 `/problems/judge.yml` 파일에 세부 설정을 작성하고, `/problems` 디렉토리에 각 문제들의 입출력 파일을 만드는 것으로 하겠습니다.**

### 1. judge.yml 파일 만들기

`judge.yml` 파일은 judge-server의 세부 설정을 담고 있는 파일로, 아래와 같은 정보를 담고 있습니다.

1. `id`: 채점기의 ID
2. `key` 채점기의 인증용 키 (단, 이 정보는 이 프로젝트에서는 활용하지 않으므로 임의로 작성하셔도 됩니다.)
3. `problem_storage_root`: 각 문제의 입출력 데이터를 저장하고 있는 디렉토리 경로

예를 들어, `/problems/judge.yml`의 내용을 아래와 같이 작성할 수 있습니다.

```yml
id: TestJudge
key: key_for_testing
problem_storage_root:
  - /problems
```

### 2. 채점할 문제들의 입출력 데이터 추가

각 문제들의 입출력 데이터는 위에서 설정한 `problem_storage_root` 경로(이 문서의 예시에서는 `/problems` 폴더) 아래에 저장해야 합니다. 저장 형식은 아래와 같습니다.

예를 들어, [이 문제의](https://dmoj.ca/problem/aplusb) 문제 데이터를 "aplusb"라는 문제 ID로 저장하고 싶다고 가정 하겠습니다. 문제 ID가 "aplusb"인 문제의 입출력 데이터를 저장하려면, `/problems/aplusb` 디렉토리를 만들고, 그 안에 아래와 같은 파일들을 작성해야 합니다.

1. `{입출력 데이터 번호}.in`: 입력 데이터를 나타냅니다.
    - `1.in`의 내용을 아래와 같이 작성할 수 있습니다.
    ```
    2
    1 1
    -1 0
    ```
2. `{입출력 데이터 번호}.out`: 출력 데이터를 나타냅니다.
    - `1.out`의 내용을 아래와 같이 작성할 수 있습니다.
    ```
    2
    -1
    ```
3. `init.yml`: 테스트케이스 목록을 정의합니다.
    - `1.in`, `1.out`, `2.in`, `2.out`와 같은 입출력 데이터가 있다면, `init.yml` 파일의 내용은 아래와 같습니다.
    ```yml
    test_cases:
    - {in: 1.in, out: 1.out, points: 0}
    - {in: 2.in, out: 2.out, points: 0}
    ```
    - 모든 `points` 값을 0으로 설정하면, 채점 도중 단 하나의 테스트 케이스에서라도 오답이 생기면 즉시 채점을 중단하게 됩니다. 반면에 `points` 값이 0이 아닌 값으로 설정되어있다면 하나가 틀리더라도 모든 테스트 케이스를 채점합니다.

## judge-server 실행

실행 방법에는 Docker로 실행하는 방법과 Python 3의 `pip`를 통해 실행하는 방법이 있는데, 여기에서는 Docker로 실행하는 방법을 소개하겠습니다. `pip`로 실행하는 방법은 다음 링크를 참고해주시기 바랍니다.

- https://docs.dmoj.ca/#/judge/setting_up_a_judge?id=judge-side-setup

### Docker 설치

실행 환경에 맞게 Docker를 설치해주세요.

- Ubuntu: https://docs.docker.com/engine/install/ubuntu/
- WSL 2: https://docs.microsoft.com/ko-kr/windows/wsl/tutorials/wsl-containers

### make 설치

`make` 명령 실행을 위해 `sudo apt install gcc make` 를 실행해주세요.

### Docker 컨테이너 빌드

judge-server 리포지토리를 clone 하여 컨테이너를 빌드해야 합니다.

```bash
git clone --recursive https://github.com/DMOJ/judge.git
cd judge/.docker
sudo make judge-tier1
```

이 예시에서는 `judge-tier1`을 빌드하고 있는데, tier 1은 tier 1, 2, 3 중 가장 지원하는 언어 수가 적은 컨테이너입니다. 만약 더 많은 언어를 채점하려면 `judge-tier2`, `judge-tier3`를 고려해야 합니다. 지원하는 언어의 구체적인 목록은 아래 Dockerfile에서 확인할 수 있습니다.

- judge-tier1: https://github.com/DMOJ/runtimes-docker/blob/master/tier1/Dockerfile
- judge-tier2: https://github.com/DMOJ/runtimes-docker/blob/master/tier2/Dockerfile
- judge-tier3: https://github.com/DMOJ/runtimes-docker/blob/master/tier3/Dockerfile

## Coders 백엔드 실행

Coders 백엔드를 먼저 실행합니다.

```
go run main.go
```

## judge-server 컨테이너 실행

위에서 빌드한 Docker 컨테이너를 실행합니다.

```
sudo docker run \
    --name judge_name \
    --network host \
    -v /home/{USER}/problems:/problems \
    --cap-add=SYS_PTRACE \
    -d \
    --restart=always \
    dmoj/judge-tier1:latest \
    run -p "9999" -c /problems/judge.yml "localhost"
```

이렇게 실행하면 컨테이너가 `judge_name`이라는 이름으로 실행되고, 나중에 이 컨테이너를 종료하거나 삭제하거나 재시작해야 할 일이 있다면 `judge_name`이라는 이름으로 접근할 수 있습니다.

정상적으로 실행되었다면 약 30초~1분 내에 Coders 백엔드와 연결되고, 백엔드에서 채점 기능을 사용할 수 있게 됩니다.

# Access Secret 설정 안내

백엔드에서 JWT Token을 사용하려면 `.env` 파일에 `ACCESS_SECRET` 가 정의되어있어야 하며, 이 값으로는 외부에 유출되지 않은 임의의 문자열을 사용해야 합니다. 이 값이 설정되지 않은 채 백엔드를 사용하면 소스코드에 정의된 기본값을 사용하게 되므로 위험할 수 있습니다.

이를 설정하는 방법은 아래와 같습니다.

1. 본 리포지토리의 `/backend` 경로에 `.env` 파일을 만들어주세요.
2. 그리고 그 파일에 `ACCESS_SECRET = [토큰]` (대괄호 제외)를 적어주세요.
```
ACCESS_SECRET = [임의의 토큰]
```
3. `.env` 파일을 저장하고 서버를 다시 시작해주세요.

# 로그인 세션 확인 방법 안내

## 백엔드

백엔드의 몇몇 기능들은 로그인 된 상태에서만 접근할 수 있어야 합니다. 따라서 몇몇 API에서는 이를 확인하는 코드를 넣어야 하는데, 아래와 같이 할 수 있습니다.

### 정상적으로 로그인되었는지 확인

```go
func SampleAPI(ctx *gin.Context) {
	// 로그인되어있는지 확인 (members.go에 정의된 ParseValidAuthToken 함수 사용)
	// controller 패키지 밖에서 사용해야 한다면 controller 패키지를 import 해주세요.
	claims, err := ParseValidAuthToken(ctx.Request)
	if err != nil {
		// 로그인되어있지 않다면 401 반환
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// 토큰에 저장되어있는 특정 데이터에 접근
	// 토큰에 어떤 데이터가 저장되어있는지는 members.go의 Login 함수를 확인해주세요.
	currentId := int(claims["id"].(float64))
}
```

## 프론트엔드

백엔드에서 쿠키에 발행한 토큰을 가져올 때는 `jsonwebtoken` 패키지를 활용할 수 있습니다.

### 백엔드에서 쿠키에 발행한 토큰 가져오기

```js
import jwt from "jsonwebtoken"

export default function getToken(cookies){
    try{
        const access_token = cookies.get('access-token');
        const token = jwt.decode(access_token);
        return token;
    }catch(err){
        return null;
    }
}
```

# 참고문헌

* 디렉토리 구조: https://github.com/swaggo/swag/tree/master/example/celler

* db 연결: https://github.com/velopert/gin-rest-api-sample

* judge-server 실행: https://docs.dmoj.ca/#/judge/setting_up_a_judge?id=judge-side-setup