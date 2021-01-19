import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import {
	PageHeader,
	QuestionTable,
	Pagination,
	QuestionInput,
	SearchBar,
	QuestionInfo,
	Dropdown,
} from '../UI';

const createData = (
	number,
	status,
	title,
	category,
	publisher,
	comments,
	date
) => {
	return {
		number,
		status,
		title,
		category,
		publisher,
		comments,
		date,
	};
};

const rows = [
	createData(
		'1',
		'해결',
		'[C++] 메모리 초과 질문입니다',
		'5번 문제',
		'pySoo',
		'3',
		'1일 전'
	),
	createData(
		'2',
		'해결',
		'[Python] 문법 질문입니다',
		'자유',
		'pySoo',
		'2',
		'3일 전'
	),
	createData(
		'3',
		'미해결',
		'[Python] 반례를 못 찾겠어요',
		'1번 문제',
		'pySoo',
		'1',
		'7일 전'
	),
];

const QuestionView = ({ match }) => {
	const mainTitle = '질문 게시판';
	const tableHead = [
		'번호',
		'상태',
		'제목',
		'분류',
		'글쓴이',
		'댓글',
		'작성일',
	];
	const label1 = '해결 여부';
	const values1 = ['해결', '미해결'];
	const label2 = '태그';
	const values2 = ['BFS', 'DFS'];
	const searchLabel = '제목, 내용, 분류로 검색';
	return (
		<Grid className="question">
			<Grid className="question-container">
				<PageHeader mainTitle={mainTitle} />
				<Grid className="question-content">
					<Route
						exact
						path={`${match.path}`}
						render={() => (
							<>
								<Grid
									conatiner
									direction="row"
									className="search"
								>
									<Grid className="search" xs={5}>
										<SearchBar label={searchLabel} />
									</Grid>
								</Grid>
								<Grid
									container
									className="dropdown-box"
									direction="row"
								>
									<Grid className="dropdown">
										<Dropdown
											label={label1}
											values={values1}
										/>
									</Grid>
									<Grid className="dropdown">
										<Dropdown
											label={label2}
											values={values2}
										/>
									</Grid>
								</Grid>
								<QuestionTable head={tableHead} rows={rows} />
								<Grid className="bottom">
									<Pagination count={5} />
									<Grid>
										<Link to={`${match.path}/write`}>
											<Button
												variant="outlined"
												color="primary"
											>
												글쓰기
											</Button>
										</Link>
									</Grid>
								</Grid>
							</>
						)}
					/>
					<Route
						exact
						path={`${match.path}/write`}
						component={QuestionInput}
					/>
					<Route
						exact
						path={`${match.path}/id/:id`}
						render={() => (
							<QuestionInfo
								title="[C++] 메모리 초과 질문입니다"
								questionInfo="질문 내용입니다"
								publisher="pySoo"
								lang="c_cpp"
							/>
						)}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default QuestionView;
