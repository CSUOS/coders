import React from 'react';
import { Grid } from '@material-ui/core';
import {
	PageHeader,
	MenuBar,
	ProblemTable,
	Pagination,
	SearchInput,
} from '../UI';

const RangkingView = () => {
	const mainTitle = '회원 랭킹';
	const tableHead = [
		'등수',
		'닉네임',
		'상태 메시지',
		'맞은 문제',
		'제출한 문제',
		'정답률',
	];
	const tableBody = [...Array(10)].map((_, index) => [
		index + 1,
		'소보루',
		'소보루의 상태 메시지입니다.',
		'1',
		'100',
		'1%',
	]);
	const label = '사용자 검색하기';

	return (
		<Grid className="ranking">
			<MenuBar />
			<Grid className="ranking-container">
				<PageHeader mainTitle={mainTitle} />
				<Grid className="ranking-content">
					<Grid className="ranking-tableselector">
						<Grid className="ranking-search">
							<SearchInput label={label} />
						</Grid>
					</Grid>
					<ProblemTable head={tableHead} rows={tableBody} />
					<Grid className="ranking-tableselector">
						<Grid className="ranking-pagination">
							<Pagination count={4} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default RangkingView;
