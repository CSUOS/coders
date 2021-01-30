import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { PageHeader, Table, Pagination, SearchInput } from '../UI';
import { getTotalPageCount } from '../../function/PaginationManager';

const mainTitle = '회원 랭킹';
const tableHead = [
	'등수',
	'닉네임',
	'상태 메시지',
	'맞은 문제',
	'제출한 문제',
	'정답률',
];

const RangkingView = ({ users }) => {
	// =============[ for pagination ] ===========================
	const totalUserCount = users.length;
	const pageLimit = 20;
	const [currentPageIndex, setCurrentPageIndex] = useState(0);
	const totalPageCount = getTotalPageCount(totalUserCount, pageLimit);
	// ===========================================================
	const tableBody = users.map((user) => [
		user.rank,
		user.name,
		user.intro,
		'50',
		'100',
		'50%',
	]);
	const label = '사용자 검색하기';
	const [input, setInput] = useState('');
	const [filterUser, setFilterUser] = useState(null);
	const getInput = (e) => {
		setInput(e);
	};
	useEffect(() => {
		let data = users.filter((x) => x.name.includes(input));
		if (data != null) {
			data = data.map((user) => [
				user.rank,
				user.name,
				user.intro,
				'50',
				'100',
				'50%',
			]);
			setFilterUser(data);
		}
	}, [input]);

	const handleCurrentPageIndex = (indexToMove) => {
		setCurrentPageIndex(indexToMove);
	};

	return (
		<Grid className="ranking">
			<Grid className="ranking-container">
				<PageHeader mainTitle={mainTitle} />
				<Grid className="ranking-content">
					<Grid className="ranking-tableselector">
						<Grid className="ranking-search">
							<SearchInput
								getInput={(e) => getInput(e)}
								label={label}
							/>
						</Grid>
					</Grid>
					<Table
						head={tableHead}
						rows={filterUser != null ? filterUser : tableBody}
					/>
					<Grid className="ranking-tableselector">
						<Grid className="ranking-pagination">
							<Pagination
								totalPageCount={totalPageCount}
								currentPageIndex={currentPageIndex}
								handleCurrentPageIndex={handleCurrentPageIndex}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default RangkingView;
