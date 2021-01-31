import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import AssistantPhotoOutlinedIcon from '@material-ui/icons/AssistantPhotoOutlined';
import { getTotalPageCount } from '../../function/PaginationManager';

import {
	PageHeader,
	Dropdown,
	Pagination,
	UserMenu,
	ProblemTable,
} from '../UI';

const mainTitle = '회원 정보';
const tableHead = ['문제 번호', '제목', '분류', '정답률', '좋아요 수'];
const paginationDropdownLabel = '한 페이지 당 문제 수:';
const paginationDropdownValues = [...Array(4)].map(
	(_, index) => (index + 1) * 5
);

const UserView = ({ users, problems }) => {
	const tableBody = problems.map((problem, index) => [
		index + 1,
		problem.title,
		problem.class,
		`33%`,
		15,
	]);
	const label2 = '해결 여부';
	const values2 = ['해결', '미해결'];
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
		<Grid className="user">
			<PageHeader mainTitle={mainTitle} />
			<Grid container direction="column" className="user-container">
				<Grid container className="user-info">
					<Grid container direction="row" className="profile-info">
						<Grid className="user-name">{users[0].name}님</Grid>
						<Grid className="user-icon">
							<AssistantPhotoOutlinedIcon />
						</Grid>
						<Grid className="user-rank">
							랭킹: {users[0].rank}위
						</Grid>
					</Grid>
					<Grid className="user-intro">
						<Grid>{users[0].intro}</Grid>
					</Grid>
				</Grid>
				<Grid container direction="row" className="user-context">
					<Grid className="user-menu">
						<UserMenu />
					</Grid>
					<Grid container direction="column" className="user-table">
						<Grid
							container
							className="user-dropdown"
							direction="row"
						>
							<Dropdown label={label2} values={values2} />
						</Grid>
						<ProblemTable head={tableHead} rows={tableBody} />
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
				</Grid>
			</Grid>
		</Grid>
	);
};

export default UserView;
