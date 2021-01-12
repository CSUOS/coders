import React from 'react';
import { Grid, TextField, IconButton, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { ProblemSubmitTable, SelectForm } from '..';

const createData = (
	number,
	id,
	memory,
	time,
	language,
	codeLen,
	submitTime
) => {
	return {
		number,
		id,
		memory,
		time,
		language,
		codeLen,
		submitTime,
	};
};

const rows = [
	createData('4', 'powergee', '1KB', '1ms', 'C++', '1236B', '9달 전'),
	createData('3', 'gusrb', '1KB', '1ms', 'Python3', '16B', '3달 전'),
	createData('1', 'igee', '2KB', '2ms', 'C++', '1236B', '9달 전'),
	createData('2', '22e', '1KB', '1ms', 'C++', '136B', '5달 전'),
];

const ProblemRank = () => {
	return (
		<Grid className="problemrank-container">
			<Grid className="problemrank-input" container>
				<TextField
					className="problemrank-textfield"
					label="아이디로 검색"
				/>
				<IconButton
					type="submit"
					className="problemrank-iconbtn"
					aria-label="search"
				>
					<SearchIcon />
				</IconButton>

				<SelectForm
					defaultValue="모든 언어"
					values={['모든 언어', 'C++', 'Java', 'Python']}
				/>
				<Button size="small">↓ 메모리로 정렬</Button>
				<Button size="small">↓ 시간으로 정렬</Button>
			</Grid>
			<ProblemSubmitTable rows={rows} />
		</Grid>
	);
};

export default ProblemRank;
