import React from 'react';
import { Link } from 'react-router-dom';
import {
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';

const QuestionTable = ({ head, rows }) => {
	return (
		<Grid className="questiontable">
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
							<TableRow
								key={row.number}
								className="table-bodyrow"
							>
								<TableCell
									className="table-bodycell"
									align="center"
								>
									{row.number}
								</TableCell>
								<TableCell
									className="table-bodycell"
									align="center"
								>
									{row.status}
								</TableCell>
								<TableCell
									className="table-bodycell"
									align="center"
								>
									<Grid
										component={Link}
										to={`/question/id/${row.number}`}
										className="linkcell"
									>
										{row.title}
									</Grid>
								</TableCell>
								<TableCell
									className="table-bodycell"
									align="center"
								>
									<Grid
										component={Link}
										to={`/question/id/${row.number}`}
										className="linkcell"
									>
										{row.category}
									</Grid>
								</TableCell>
								<TableCell
									className="table-bodycell"
									align="center"
								>
									{row.publisher}
								</TableCell>
								<TableCell
									className="table-bodycell"
									align="center"
								>
									{row.comments}
								</TableCell>
								<TableCell
									className="table-bodycell"
									align="center"
								>
									{row.date}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
};

export default QuestionTable;
