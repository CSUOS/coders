import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	page: {
		margin: '0 10%',
	},
	menu: {
		backgroundColor: '#e9ecef',
		flexGrow: 1,
		marginTop: 5,
	},
	buttonText: {
		fontSize: 16,
		textAlign: 'center',
	},
	buttonRight: {
		fontSize: 16,
		textAlign: 'center',
		marginLeft: 'auto',
	},
	select: {
		width: '20%',
		height: '90%',
	},
	textField: {
		marginTop: 10,
		width: '80%',
		height: '100%',
		borderLeft: '3px solid #dee2e6',
		padding: '1%',
	},
}));
const ProblemInput = () => {
	const classes = useStyles();
	return (
		<Grid container className={classes.textField} direction="column" xs={6}>
			<TextField rows={30} multiline variant="outlined" />
			<Grid container direction="row">
				<Button
					className={classes.buttonRight}
					variant="contained"
					color="primary"
				>
					예제 실행
				</Button>
				<Button
					className={classes.buttonText}
					variant="contained"
					color="primary"
				>
					제출
				</Button>
			</Grid>
		</Grid>
	);
};

export default ProblemInput;
