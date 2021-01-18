import React, { useState } from 'react';
import { Grid, Button, IconButton, Typography } from '@material-ui/core';
import { Route, Link } from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import {
	ProblemInput,
	ProblemRank,
	ProblemScore,
	SelectForm,
	MarkdownViewer,
	AccordianComment,
} from '../UI';

const content = `
# 0. Emoji 테스트
[여기에](https://gist.github.com/rxaviers/7360908) 나열된 Emoji를 사용할 수 있습니다.
# :smile: :sunglasses: :+1:
# 1. LaTeX 테스트
LaTeX 문법으로 입력한 수식이 Markdown 요소와 잘 섞여 출력됩니다.
### 예시 문제
**Review the following textbox.**
***
Function $G:Z^+ \\rightarrow Z$ is defined by the rule
$$
  G(n)=\\begin{cases}
      1 & \\text{if } n=1 \\\\
      G(\\frac{n}{2}) & \\text{if }n\\text{ is even} \\\\
      2+G(3n-5) & \\text{if }n\\text{ is odd and }n>1 \\\\
  \\end{cases}
$$
for each integer $n \\geq 1$.
***
**Is the function G is well defined? Justify your answer.**
### 예시 답안
함수가 잘 정의되지 않았다는 반례를 들 수 있다. $n=5$라고 하자. 그렇다면 $G(n)$은 아래와 같이 전개된다.
$$
\\begin{aligned}
    G(5) =& 2+G(3 \\cdot 5 - 5) & \\text{(5는 1보다 큰 홀수이므로 3번째 경우에 대입)} \\\\
    =& 2+G(10) & \\text{(대수적 계산에 의함)} \\\\
    =& 2+G(5) & \\text{(10은 짝수이므로 2번째 경우에 대입)} \\\\
\\end{aligned}
$$
결과적으로 $G(5)=2+G(5)$라는 결과가 도출되므로 $G(5)$를 정의할 수 없다. 따라서 함수 $G$는 잘 정의되지 않았다. (not well-defined)
# 2. 헤더 테스트
아래와 같은 6가지 해더를 사용할 수 있습니다.
# This is a H1
## This is a H2
### This is a H3
#### This is a H4
##### This is a H5
###### This is a H6
# 3. BlockQuote 테스트
\`\`\`>\`\`\` 문자를 이용하여 인용문을 작성할 수 있습니다.
> This is a first blockqute.
>> This is a second blockqute.
>>> This is a third blockqute.
> ### This is a H3
> * List
>>\`\`\`
>>code
>>\`\`\`
# 4. 목록 테스트
아래와 같이 숫자로 시작하는 목록과 점으로 시작하는 목록을 작성할 수 있습니다.
1. 첫번째
2. 두번째
3. 세번째
* 빨강
  * 녹색
    * 파랑
+ 빨강
  + 녹색
    + 파랑
- 빨강
  - 녹색
    - 파랑
* 1단계
  - 2단계
    + 3단계
      + 4단계
# 5. 코드 테스트
아래와 같이 코드 블럭을 사용할 수 있습니다.
This is a normal paragraph:
    This is a code block.
end code block.
\`\`\`
public class BootSpringBootApplication {
  public static void main(String[] args) {
    System.out.println("Hello, Honeymon");
  }
}
\`\`\`
# 6. 수평선 테스트
아래와 같이 수평선을 사용할 수 있습니다.
* * *
***
*****
- - -
---------------------------------------
# 7. 링크 테스트
아래와 같이 링크를 생성할 수 있습니다.
Link: [Google][googlelink]
[googlelink]: https://google.com "Go google"
# 8. 강조 테스트
아래와 같이 강조할 수 있습니다.
* *single asterisks*
* _single underscores_
* **double asterisks**
* __double underscores__
* ~~cancelline~~
# 9. 이미지 삽입 테스트
아직 이미지 서버를 지원하지는 않으나, 아래와 같은 방법으로 이미지 서버에 있는 이미지를 가져올 수 있습니다.
![screensh](https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png)
# 10. 표 테스트
아래와 같이 표를 작성할 수 있습니다.
| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
`;

const ProblemView = ({ match }) => {
	const [star, setStar] = useState(false);
	const [like, setLike] = useState(false);
	const [language, setLanguage] = useState('C++');
	const clickStar = () => {
		setStar(!star);
	};
	const clickLike = () => {
		setLike(!like);
	};
	const changeLang = (e) => {
		setLanguage(e.target.value);
	};
	return (
		<Grid className="problem">
			<Grid container direction="row" className="problem-container">
				<Grid className="problem-bar">
					<Grid className="bar-item">
						<Link to={`${match.path}`}>
							<Button>문제 설명</Button>
						</Link>
						<Link to={`${match.path}/rank`}>
							<Button>맞은 사람</Button>
						</Link>
						<Link to={`${match.path}/score`}>
							<Button>채점 현황</Button>
						</Link>
					</Grid>
					<Grid className="bar-item">
						<IconButton
							onClick={clickLike}
							title="문제 좋아요"
							className="toggle"
						>
							{like ? (
								<ThumbUp style={{ fontSize: '1.8rem' }} />
							) : (
								<ThumbUpAltOutlinedIcon
									style={{ fontSize: '1.8rem' }}
								/>
							)}
						</IconButton>
						<IconButton
							onClick={clickStar}
							title="북마크 설정"
							className="toggle"
						>
							{star ? (
								<div>
									<Star style={{ fontSize: '1.8rem' }} />
								</div>
							) : (
								<div>
									<StarBorderIcon
										style={{ fontSize: '1.8rem' }}
									/>
								</div>
							)}
							<Typography>북마크 추가</Typography>
						</IconButton>
					</Grid>
				</Grid>
				<Grid className="problem-bar">
					<SelectForm
						defaultValue="C++"
						values={['C++', 'Java', 'Python']}
						handelChange={changeLang}
					/>
				</Grid>
				<Grid container className="problem-info">
					<Route
						exact
						path={`${match.path}`}
						render={() => <MarkdownViewer source={content} />}
					/>
					<Route
						exact
						path={`${match.path}/Rank`}
						component={ProblemRank}
					/>
					<Route
						exact
						path={`${match.path}/score`}
						component={ProblemScore}
					/>
				</Grid>
				{/* ace Editor 소스 코드 입력 */}
				<ProblemInput language={language} />
				<AccordianComment />
			</Grid>
		</Grid>
	);
};

export default ProblemView;
