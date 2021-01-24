import React from 'react';

const Table = ({ head, rows }) => {
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
						{row.map((rowCell) => (
							<td className="table-bodycell">{rowCell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
