import React from 'react';
import { Grid, TextField } from '@material-ui/core';

const InputBox = ({ title, size }) => {
	return (
		<Grid container direction="row" className="input-box">
			<Grid className="title">{title}</Grid>
			<Grid className="input-content" xs={size}>
				<TextField
					id="outlined-basic"
					variant="outlined"
					size="small"
					fullWidth
				/>
			</Grid>
		</Grid>
	);
};

export default InputBox;
