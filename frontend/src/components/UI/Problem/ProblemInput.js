import React from 'react';
import { Grid, Button, TextField } from '@material-ui/core';

const ProblemInput = () => {
	return (
		<Grid
			container
			className="problem-input-container"
			direction="column"
			xs={6}
		>
			<TextField
				rows={30}
				className="problem-input-text"
				multiline
				variant="outlined"
			/>
			<Grid container direction="row">
				<Button className="problem-input-btn" variant="contained">
					예제 실행
				</Button>
				<Button variant="contained" color="primary">
					제출
				</Button>
			</Grid>
		</Grid>
	);
};

export default ProblemInput;
