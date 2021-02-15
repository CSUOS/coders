import React from 'react';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';

const totalButtonCount = 4;
const preButtonText = '<';
const nextButtonText = '>';

const getCurrentPageGroupIndex = (currentPageIndex) => {
	return Math.floor(currentPageIndex / totalButtonCount);
};
const getPreButtonDisabled = (currentPageGroupIndex) => {
	if (currentPageGroupIndex === 0) return true;
	return false;
};
const getNextButtonDisabled = (currentPageGroupIndex, totalPageCount) => {
	const lastPageGroupIndex = Math.floor(totalPageCount / totalButtonCount);
	if (currentPageGroupIndex === lastPageGroupIndex) return true;
	return false;
};

const Pagination = ({
	totalPageCount,
	currentPageIndex,
	handleCurrentPageIndex,
}) => {
	const currentPageGroupIndex = getCurrentPageGroupIndex(currentPageIndex);
	const preButtonDisabled = getPreButtonDisabled(currentPageGroupIndex);
	const nextButtonDisabled = getNextButtonDisabled(
		currentPageGroupIndex,
		totalPageCount
	);
	const onPreButtonClick = () => {
		const prePageGroupIndex = currentPageGroupIndex - 1;
		const prePageIndex = prePageGroupIndex * totalButtonCount;
		handleCurrentPageIndex(prePageIndex);
	};
	const onNextButtonClick = () => {
		const nextPageGroupIndex = currentPageGroupIndex + 1;
		const nextPageIndex = nextPageGroupIndex * totalButtonCount;
		handleCurrentPageIndex(nextPageIndex);
	};
	const onPageButtonClick = (e) => {
		handleCurrentPageIndex(e.target.value);
	};

	return (
		<Grid className="pagination">
			<button
				className={clsx(
					'pagination-button',
					!preButtonDisabled && 'not-disabled'
				)}
				type="button"
				disabled={preButtonDisabled}
				onClick={onPreButtonClick}
			>
				{preButtonText}
			</button>
			{currentPageGroupIndex === 0 ? (
				<span>
					{[...Array(currentPageIndex + 1)].map((_, index) => (
						<button
							className={clsx(
								'pagination-button',
								currentPageIndex === index
									? 'selected'
									: 'not-disabled'
							)}
							type="button"
							value={index}
							onClick={onPageButtonClick}
						>
							{index + 1}
						</button>
					))}
				</span>
			) : (
				<span>
					{[...Array(totalButtonCount)].map((_, index) => (
						<Grid className="pagination-button">
							<button
								className={clsx(
									'pagination-button',
									currentPageIndex ===
										currentPageGroupIndex *
											totalButtonCount +
											index
										? 'selected'
										: 'not-disabled'
								)}
								type="button"
								value={index}
								onClick={onPageButtonClick}
							>
								{currentPageGroupIndex * totalButtonCount +
									(index + 1)}
							</button>
						</Grid>
					))}
				</span>
			)}
			<button
				className={clsx(
					'pagination-button',
					!nextButtonDisabled && 'not-disabled'
				)}
				type="button"
				disabled={nextButtonDisabled}
				onClick={onNextButtonClick}
			>
				{nextButtonText}
			</button>
		</Grid>
	);
};

export default Pagination;
