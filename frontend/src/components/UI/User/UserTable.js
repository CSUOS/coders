import React from 'react';
import {
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';

const UserTable = ({ head, rows }) => {
	return (
		<Grid className="table">
			<TableContainer>
				<Table size="small">
					<TableHead>
						<TableRow className="table-head">
							{head.map((text) => (
								<TableCell
									className="table-headcell"
									key={text}
									align="center"
								>
									{text}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow className="table-bodyrow">
								{row.map((rowCell) => (
									<TableCell
										className="table-bodycell"
										align="center"
									>
										{rowCell}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
};

export default UserTable;
