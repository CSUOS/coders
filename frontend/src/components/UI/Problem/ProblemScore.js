import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import { SelectForm, Table, Pagination } from '..';
import { getTotalPageCount } from '../../../function/PaginationManager';

const head = [
	'채점 번호',
	'아이디',
	'결과',
	'메모리',
	'시간',
	'언어',
	'코드 길이',
	'제출한 시간',
];
const row = [
	'3',
	'gusrb',
	'Accepted',
	'1KB',
	'1ms',
	'Python3',
	'16B',
	'3달 전',
];
const ProblemScore = ({ mySubmissions, handleMySubmissions }) => {
	const { id } = useParams();
	const [progress, setProgress] = useState(true);

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress(!progress);
		}, 1000);
		handleMySubmissions(id);
	}, [id, mySubmissions]);

	// =============[ for pagination ] ===========================
	const totalProblemCount = mySubmissions.length;
	const [currentPageIndex, setCurrentPageIndex] = useState(0);
	const currentLimit = 10;
	const totalPageCount = getTotalPageCount(totalProblemCount, currentLimit);
	const handleCurrentPageIndex = (indexToMove) => {
		setCurrentPageIndex(indexToMove);
	};
	// ===========================================================
	return (
		<Grid className="problem-score" direction="column">
			<Grid className="problem-score-info">
				<FormatListNumberedIcon style={{ fontSize: '2rem' }} />
				<b>채점 현황</b>
			</Grid>
			{progress ? (
				<Grid className="problem-score-progress">
					<CircularProgress color="inherit" />
				</Grid>
			) : (
				<Table head={head} rows={[row]} />
			)}
			<Grid className="problem-score-info">
				<FormatListNumberedIcon style={{ fontSize: '2rem' }} />
				<b>나의 제출 현황</b>
			</Grid>
			<Grid className="problem-score-order">
				<SelectForm
					defaultValue="모든 결과"
					values={['모든 결과', '통과', '컴파일 에러', '오답']}
				/>
				<Button size="small">↓ 메모리로 정렬</Button>
				<Button size="small">↓ 시간으로 정렬</Button>
			</Grid>
			<Table head={head} rows={mySubmissions} />
			<Grid className="problem-score-pagination">
				<Pagination
					totalPageCount={totalPageCount}
					currentPageIndex={currentPageIndex}
					handleCurrentPageIndex={handleCurrentPageIndex}
				/>
			</Grid>
		</Grid>
	);
};

export default ProblemScore;
