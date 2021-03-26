import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import uuid from 'react-uuid';

const Table = ({ head, rows }) => {
	const isProblem = head.includes('문제 번호');
	return (
		<table className="table">
			<thead className="table-head">
				<tr>
					{head.map((headCell) => (
						<th className="table-headCell" key={uuid()}>
							{headCell}
						</th>
					))}
				</tr>
			</thead>
			{isProblem ? (
				<tbody>
					{rows.map((row) => (
						<tr className="table-bodyrow" key={row.id}>
							{row.map((rowCell, idx) => (
								<td className="table-bodycell" key={uuid()}>
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
			) : (
				<tbody>
					{rows.map((row) => (
						<tr className="table-bodyrow" key={uuid()}>
							{row.map((rowCell) => (
								<td className="table-bodycell" key={uuid()}>
									{rowCell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			)}
		</table>
	);
};

export default Table;
