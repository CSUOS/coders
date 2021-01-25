import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { SelectForm, SearchInput } from '..';
import Table from '../Table';

const head = [
	'채점 번호',
	'아이디',
	'메모리',
	'시간',
	'언어',
	'코드 길이',
	'제출한 시간',
];
const row = ['3', 'gusrb', '1KB', '1ms', 'Python3', '16B', '3달 전'];

const ProblemRank = ({ submissions }) => {
	return (
		<Grid className="problemrank-container">
			<Grid className="problemrank-input" container>
				<Grid className="problemrank-search">
					<SearchInput label="아이디로 검색" />
				</Grid>
				<SelectForm
					defaultValue="모든 언어"
					values={['모든 언어', 'C++', 'Java', 'Python']}
				/>
				<Button size="small">↓ 메모리로 정렬</Button>
				<Button size="small">↓ 시간으로 정렬</Button>
			</Grid>
			<Table head={head} rows={[...Array(5)].map(() => row)} />
		</Grid>
	);
};

export default ProblemRank;
