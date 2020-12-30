import React from 'react';
import { Grid } from '@material-ui/core';
import { PageHeader, Dropdown, SearchInput, ProblemTable } from '../UI';

const HomeView = () => {
	const mainTitle = '문제 선택';
	const label1 = '해결 여부';
	const values = ['해결', '미해결'];
	const label2 = '제목, 내용, 분류로 검색';
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
					<ProblemTable />
				</Grid>
			</Grid>
		</Grid>
	);
};

export default HomeView;
