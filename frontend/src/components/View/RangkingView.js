import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { PageHeader, Table, Pagination, SearchInput, Dropdown } from '../UI';
import { getTotalPageCount } from '../../function/PaginationManager';

const mainTitle = '회원 랭킹';
const tableHead = ['등수', '닉네임', '상태 메시지', '문제수'];
const userDropdownValues = [
	'전체',
	'사용 언어',
	'제출한 문제수',
	'출제한 문제수',
];
const languages = ['C++', 'Java', 'Python'];

const RangkingView = ({ ranks, setRanks }) => {
	const {
		getListOfMemberRankedByCountOfProblem,
		getListOfMemberRankedByCountOfSubmission,
	} = setRanks;
	// =============[ for pagination ] ===========================
	const totalUserCount = 50; // 임시 값
	const pageLimit = 20;
	const [currentPageIndex, setCurrentPageIndex] = useState(0);
	const totalPageCount = getTotalPageCount(totalUserCount, pageLimit);
	// ===========================================================

	// =============[ for filtering ] ===========================
	const [userFilter, setUserFilter] = useState(userDropdownValues[0]);
	const [hasExtraFilter, setHasExtraFilter] = useState(false);
	const [extraFilterOptions, setExtraFilterOptions] = useState(undefined);
	const [extraFilter, setExtraFilter] = useState();
	// ===========================================================

	const tableBody = ranks.map((user, index) => [
		index + 1,
		user.Name,
		user.Intro,
		user.Total,
	]);
	const label = '사용자 검색하기';
	const [nameInput, setNameInput] = useState(undefined);
	const handleNameInputChanage = (e) => {
		setNameInput(e.target.value);
	};
	// const [filterUser, setFilterUser] = useState(null);
	// useEffect(() => {
	// 	let data = users.filter((x) => x.name.includes(input));
	// 	if (data != null) {
	// 		data = data.map((user) => [
	// 			user.rank,
	// 			user.name,
	// 			user.intro,
	// 			'50',
	// 			'100',
	// 			'50%',
	// 		]);
	// 		setFilterUser(data);
	// 	}
	// }, [input]);

	const handleCurrentPageIndex = (indexToMove) => {
		setCurrentPageIndex(indexToMove);
	};

	const handleUserFilter = (e) => {
		const selectedUserFilter = e.target.value;
		setUserFilter(selectedUserFilter);
		if (selectedUserFilter === userDropdownValues[1]) {
			setExtraFilterOptions(languages);
			setExtraFilter(languages[0]);
			setHasExtraFilter(true);
		} else {
			setUserFilter(selectedUserFilter);
			setHasExtraFilter(false);
		}
	};

	const handleExtraFilter = (e) => {
		setExtraFilter(e.target.value);
	};

	const onSearchButtonClick = () => {
		const query = {
			page: currentPageIndex,
			limit: pageLimit,
			name: nameInput,
		};
		switch (userFilter) {
			case '전체':
				getListOfMemberRankedByCountOfSubmission({
					...query,
					result: 'AC',
				});
				break;
			case '사용 언어':
				getListOfMemberRankedByCountOfSubmission({
					...query,
					result: 'AC',
					language: extraFilter,
				});
				break;
			case '제출한 문제수':
				getListOfMemberRankedByCountOfSubmission(query);
				break;
			case '출제한 문제수':
				getListOfMemberRankedByCountOfProblem(query);
				break;
			default:
				getListOfMemberRankedByCountOfSubmission({
					...query,
					result: 'AC',
				});
				break;
		}
	};

	useEffect(() => {
		const query = {
			page: currentPageIndex,
			limit: pageLimit,
		};
		switch (userFilter) {
			case '전체':
				getListOfMemberRankedByCountOfSubmission({
					...query,
					result: 'AC',
				});
				break;
			case '사용 언어':
				getListOfMemberRankedByCountOfSubmission({
					...query,
					result: 'AC',
					language: extraFilter,
				});
				break;
			case '제출한 문제수':
				getListOfMemberRankedByCountOfSubmission(query);
				break;
			case '출제한 문제수':
				getListOfMemberRankedByCountOfProblem(query);
				break;
			default:
				getListOfMemberRankedByCountOfSubmission(query);
				break;
		}
	}, [userFilter, extraFilter]);

	return (
		<Grid className="ranking">
			<Grid className="ranking-container">
				<PageHeader mainTitle={mainTitle} />
				<Grid className="ranking-content">
					<Grid className="ranking-tableselector">
						<Grid className="ranking-search">
							<SearchInput
								label={label}
								input={nameInput}
								handleInputChange={handleNameInputChanage}
								onClick={onSearchButtonClick}
							/>
						</Grid>
						<Grid className="ranking-dropdowns">
							<Grid className="ranking-dropdown">
								{hasExtraFilter && (
									<Dropdown
										values={extraFilterOptions}
										selectedValue={extraFilter}
										handleSelectedValue={handleExtraFilter}
										hasLabel={false}
									/>
								)}
							</Grid>
							<Grid className="ranking-dropdown">
								<Dropdown
									values={userDropdownValues}
									selectedValue={userFilter}
									handleSelectedValue={handleUserFilter}
									hasLabel={false}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Table head={tableHead} rows={tableBody} />
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
