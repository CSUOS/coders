import React from 'react';
import { Grid, TextField } from '@material-ui/core';

const LabelInput = ({ label, defaultValue = null }) => {
	return (
		<Grid className="labelinput">
			<Grid className="labelinput-label">{label}</Grid>
			<Grid className="labelinput-input">
				<TextField
					size="small"
					variant="outlined"
					fullWidth
					defaultValue={defaultValue}
				/>
			</Grid>
		</Grid>
	);
};

export default LabelInput;
