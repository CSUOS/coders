import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const ProblemTable = ({ head, rows }) => {
	return (
		<table className="table">
			<thead className="table-head">
				<tr>
					{head.map((headCell) => (
						<th className="table-headCell">{headCell}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((row) => (
					<tr className="table-bodyrow">
						{row.map((rowCell, idx) => (
							<td className="table-bodycell">
								{idx === 1 ? (
									<Grid
										component={Link}
										to={`/problem/${row[0]}`}
										className="linkcell"
									>
										{rowCell}
									</Grid>
								) : (
									<Grid>{rowCell}</Grid>
								)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default ProblemTable;
