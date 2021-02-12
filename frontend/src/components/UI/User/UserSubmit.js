import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { getTotalPageCount } from '../../../function/PaginationManager';

import { Dropdown, Pagination, Table } from '..';

const tableHead = ['문제 번호', '제목', '분류', '정답률', '좋아요 수'];
const paginationDropdownLabel = '한 페이지 당 문제 수:';
const paginationDropdownValues = [...Array(4)].map(
	(_, index) => (index + 1) * 5
);

const UserSubmit = ({ problems }) => {
	const tableBody = problems.map((problem, index) => [
		index + 1,
		problem.title,
		problem.class,
		`33%`,
		15,
	]);
	const dropdownHasLabel = false;

	// =============[ for pagination ] ===========================
	const totalProblemCount = problems.length;
	const [currentPageIndex, setCurrentPageIndex] = useState(0);
	const [currentLimit, setCurrentLimit] = useState(
		paginationDropdownValues[0]
	);
	const totalPageCount = getTotalPageCount(totalProblemCount, currentLimit);
	// ===========================================================

	const handleCurrentPageIndex = (indexToMove) => {
		setCurrentPageIndex(indexToMove);
	};

	const handleCurrentLimit = (e) => {
		setCurrentLimit(e.target.value);
	};

	return (
		<Grid container direction="column" className="user-table">
			<Grid container className="user-dropdown" direction="row" />
			<Table head={tableHead} rows={tableBody} />
			<Grid className="user-tableselector">
				<Grid className="user-tableselector-start">
					<Grid className="page-label">
						{paginationDropdownLabel}
					</Grid>
					<Dropdown
						hasLabel={dropdownHasLabel}
						values={paginationDropdownValues}
						selectedValue={currentLimit}
						handleSelectedValue={handleCurrentLimit}
					/>
				</Grid>
				<Pagination
					totalPageCount={totalPageCount}
					currentPageIndex={currentPageIndex}
					handleCurrentPageIndex={handleCurrentPageIndex}
				/>
			</Grid>
		</Grid>
	);
};

export default UserSubmit;
