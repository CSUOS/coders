import React from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';

const Comment = ({ userName, comment, createAt }) => {
	return (
		<Grid
			className="comment-container"
			container
			direction="column"
			xs={12}
		>
			<Grid className="comment-header">
				<Typography className="user">
					<PersonIcon />
					{userName}
					<Typography className="created">
						&nbsp;&nbsp;
						{createAt.substr(0, 10)}&nbsp; {createAt.substr(11, 5)}
						&nbsp;&nbsp;
					</Typography>
				</Typography>
				<Grid>
					<IconButton size="small">
						<EditIcon fontSize="small" />
					</IconButton>
					<IconButton size="small">
						<ClearIcon fontSize="small" />
					</IconButton>
				</Grid>
			</Grid>
			<Typography className="comment">{comment}</Typography>
		</Grid>
	);
};

export default Comment;
