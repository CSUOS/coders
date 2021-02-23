import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import { SelectForm, SearchInput, Pagination } from '..';
import Table from '../Table';
import { getTotalPageCount, GetSubmissions } from '../../../function/index';

const head = [
	'채점 번호',
	// '아이디', 추가예정
	'메모리',
	'시간',
	'언어',
	'제출한 시간',
];

const ProblemRank = ({ submissions, handleSubmissions }) => {
	const { id } = useParams();
	useEffect(() => {
		handleSubmissions({ problemId: id, language: 'c11' });
	}, []);

	// =============[ for pagination ] ===========================
	const totalProblemCount = submissions.length;
	const [currentPageIndex, setCurrentPageIndex] = useState(0);
	const currentLimit = 10;
	const totalPageCount = getTotalPageCount(totalProblemCount, currentLimit);
	const handleCurrentPageIndex = (indexToMove) => {
		setCurrentPageIndex(indexToMove);
	};
	// ===========================================================
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
			<Table head={head} rows={GetSubmissions(submissions, true)} />
			<Grid className="problemrank-pagination">
				<Pagination
					totalPageCount={totalPageCount}
					currentPageIndex={currentPageIndex}
					handleCurrentPageIndex={handleCurrentPageIndex}
				/>
			</Grid>
		</Grid>
	);
};

export default ProblemRank;
