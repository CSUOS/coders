import React from 'react';
import {
	Grid,
	NativeSelect,
	FormControl,
	TextField,
	IconButton,
	Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { ProblemSubmitTable } from '.';

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

				<FormControl className="problemrank-select">
					<NativeSelect defaultValue="모든 언어">
						<option value="모든 언어">모든 언어</option>
						<option value="C++">C++</option>
						<option value="Java">Java</option>
						<option value="Python">Python</option>
					</NativeSelect>
				</FormControl>
				<Button size="small">↓ 메모리로 정렬</Button>
				<Button size="small">↓ 시간으로 정렬</Button>
			</Grid>
			<ProblemSubmitTable />
		</Grid>
	);
};

export default ProblemRank;
