import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: '#E5E5E5',
		color: theme.palette.common.black,
		fontWeight: 'bold',
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

function createData(number, subject, category, correctRate, like) {
	return { number, subject, category, correctRate, like };
}

const rows = [
	createData(1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15),
	createData(1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15),
	createData(1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15),
	createData(1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15),
	createData(1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15),
	createData(1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15),
	createData(1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15),
	createData(1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15),
	createData(1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15),
	createData(1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15),
	createData(1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15),
	createData(1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15),
	createData(1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15),
	createData(1, '문제 1', '카카오 2020 코딩테스트', `33%`, 15),
];

const ProblemTable = () => {
	return (
		<TableContainer>
			<Table size="small" style={{ border: '2px solid #9E9B9A' }}>
				<TableHead>
					<TableRow>
						<StyledTableCell align="center">
							문제 번호
						</StyledTableCell>
						<StyledTableCell align="center">제목</StyledTableCell>
						<StyledTableCell align="center">분류</StyledTableCell>
						<StyledTableCell align="center">정답률</StyledTableCell>
						<StyledTableCell align="center">
							좋아요 수
						</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.number}>
							<StyledTableCell
								align="center"
								component="th"
								scope="row"
							>
								{row.number}
							</StyledTableCell>
							<StyledTableCell align="center">
								{row.subject}
							</StyledTableCell>
							<StyledTableCell align="center">
								{row.category}
							</StyledTableCell>
							<StyledTableCell align="center">
								{row.correctRate}
							</StyledTableCell>
							<StyledTableCell align="center">
								{row.like}
							</StyledTableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ProblemTable;
