import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import {
	PageHeader,
	Dropdown,
	SearchInput,
	ProblemTable,
	Pagination,
} from '../UI';

const mainTitle = '문제 선택';
const dropdownLabel = '해결 여부';
const dropdownValues = ['해결', '미해결'];
const searchInputLabel = '제목, 내용, 분류로 검색';
const tableHead = ['문제 번호', '제목', '분류', '정답률', '좋아요 수'];
const sortButtonText = '↑↓ 제목으로 정렬';
const paginationDropdownLabel = '한 페이지 당 문제 수:';
const paginationDropdownValues = [...Array(4)].map(
	(_, index) => (index + 1) * 5
);
const dropdownHasLabel = false;
const HomeView = ({ problems }) => {
	const tableBody = problems.map((problem, index) => [
		index + 1,
		problem.title,
		problem.class,
		`33%`,
		15,
	]);

	const [input, setInput] = useState('');
	const [filterPb, setFilterPb] = useState(null);
	const getInput = (e) => {
		setInput(e);
	};
	useEffect(() => {
		let data = problems.filter(
			(x) => x.title.includes(input) || x.class.includes(input)
		);
		if (data != null) {
			data = data.map((problem, index) => [
				index + 1,
				problem.title,
				problem.class,
				`33%`,
				15,
			]);
			setFilterPb(data);
		}
	}, [input]);
	return (
		<Grid className="home">
			<Grid className="home-container">
				<PageHeader mainTitle={mainTitle} />
				<Grid className="home-content">
					<Grid className="home-tableselector">
						<Grid className="home-tableselector-start">
							<SearchInput
								getInput={(e) => getInput(e)}
								label={searchInputLabel}
							/>
							<Button className="sort-button">
								{sortButtonText}
							</Button>
						</Grid>
						<Grid className="home-dropdowns">
							<Grid className="home-dropdown">
								<Dropdown
									label={dropdownLabel}
									values={dropdownValues}
								/>
							</Grid>
						</Grid>
					</Grid>
					<ProblemTable
						head={tableHead}
						rows={filterPb != null ? filterPb : tableBody}
					/>
					<Grid className="home-tableselector">
						<Grid className="home-tableselector-start">
							<Grid className="page-label">
								{paginationDropdownLabel}
							</Grid>
							<Dropdown
								hasLabel={dropdownHasLabel}
								values={paginationDropdownValues}
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
