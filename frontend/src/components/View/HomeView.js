import React from 'react';
import { Grid } from '@material-ui/core';
import { PageHeader, Dropdown, SearchInput, ProblemTable } from '../UI';

const HomeView = () => {
	const mainTitle = '문제 선택';
	const label1 = '해결 여부';
	const values = ['해결', '미해결'];
	const label2 = '제목, 내용, 분류로 검색';
	const tableHead = ['문제 번호', '제목', '분류', '정답률', '좋아요 수'];
	const tableBody = [1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15];
	return (
		<Grid className="home">
			<Grid className="home-container">
				<PageHeader mainTitle={mainTitle} />
				<Grid className="home-content">
					<Grid className="home-tableselector">
						<SearchInput label={label2} />
						<Grid className="home-dropdowns">
							<Grid className="home-dropdown">
								<Dropdown label={label1} values={values} />
							</Grid>
							<Grid className="home-dropdown">
								<Dropdown label={label1} values={values} />
							</Grid>
							<Grid className="home-dropdown">
								<Dropdown label={label1} values={values} />
							</Grid>
						</Grid>
					</Grid>
					<ProblemTable
						head={tableHead}
						rows={[...Array(10)].map(() => tableBody)}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default HomeView;
