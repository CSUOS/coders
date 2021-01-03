import React from 'react';
import { Grid } from '@material-ui/core';

const Pagination = ({ count }) => {
	return (
		<Grid className="pagination">
			<Grid className="pagination-button">
				<button type="button">{'<'}</button>
			</Grid>
			{[...Array(count)].map((_, index) => (
				<Grid className="pagination-button">
					<button type="button">{index + 1}</button>
				</Grid>
			))}
			<Grid className="pagination-button">
				<button type="button">{'>'}</button>
			</Grid>
		</Grid>
	);
};

export default Pagination;
