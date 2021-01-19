import React from 'react';
import { Grid, Button } from '@material-ui/core';
import {
	PageHeader,
	Dropdown,
	SearchInput,
	ProblemTable,
	Pagination,
} from '../UI';

const HomeView = ({ problems }) => {
	const mainTitle = '문제 선택';
	const label1 = '해결 여부';
	const values1 = ['해결', '미해결'];
	const label2 = '제목, 내용, 분류로 검색';
	const tableHead = ['문제 번호', '제목', '분류', '정답률', '좋아요 수'];
	const tableBody = problems.map((problem, index) => [
		index + 1,
		problem.title,
		problem.class,
		`33%`,
		15,
	]);
	const label3 = '↑↓ 제목으로 정렬';
	const label4 = '↑↓ 좋아요 수로 정렬';
	const label5 = '한 페이지 당 문제 수:';
	const dropdownHasLabel = false;
	const values2 = [...Array(12)].map((_, index) => index + 1);
	return (
		<Grid className="home">
			<Grid className="home-container">
				<PageHeader mainTitle={mainTitle} />
				<Grid className="home-content">
					<Grid className="home-tableselector">
						<Grid className="home-tableselector-start">
							<SearchInput label={label2} />
							<Button className="sort-button">{label3}</Button>
							<Button className="sort-button">{label4}</Button>
						</Grid>
						<Grid className="home-dropdowns">
							<Grid className="home-dropdown">
								<Dropdown label={label1} values={values1} />
							</Grid>
							<Grid className="home-dropdown">
								<Dropdown label={label1} values={values1} />
							</Grid>
							<Grid className="home-dropdown">
								<Dropdown label={label1} values={values1} />
							</Grid>
						</Grid>
					</Grid>
					<ProblemTable head={tableHead} rows={tableBody} />
					<Grid className="home-tableselector">
						<Grid className="home-tableselector-start">
							{label5}
							<Dropdown
								hasLabel={dropdownHasLabel}
								values={values2}
								defaultValue={12}
							/>
						</Grid>
						<Pagination count={4} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default HomeView;
