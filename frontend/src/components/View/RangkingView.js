import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { PageHeader, Table, Pagination, SearchInput } from '../UI';

const RangkingView = ({ users }) => {
	const mainTitle = '회원 랭킹';
	const tableHead = [
		'등수',
		'닉네임',
		'상태 메시지',
		'맞은 문제',
		'제출한 문제',
		'정답률',
	];
	/*
	const tableBody = [...Array(10)].map((_, index) => [
		index + 1,
		'소보루',
		'소보루의 상태 메시지입니다.',
		'1',
		'100',
		'1%',
	]);
	*/
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
							<Pagination count={4} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default RangkingView;
