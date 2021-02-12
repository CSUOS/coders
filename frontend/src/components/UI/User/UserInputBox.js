import React from 'react';
import { Grid, TextField } from '@material-ui/core';

const UserInputBox = ({ title, size, value, readOnly, password }) => {
	return (
		<Grid container direction="row" className="user-edit">
			<Grid className="edit-title">{title}</Grid>
			<Grid className="edit-content" xs={size}>
				<TextField
					inputProps={{
						readOnly: Boolean(readOnly),
					}}
					variant="outlined"
					size="small"
					fullWidth
					defaultValue={value}
					type={password ? 'password' : 'text'}
				/>
			</Grid>
		</Grid>
	);
};

export default UserInputBox;
