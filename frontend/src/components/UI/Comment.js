import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const Comment = ({ userName, comment }) => {
	return (
		<Grid
			className="comment-container"
			container
			direction="column"
			xs={12}
		>
			<Typography className="user">
				<PersonIcon />
				{userName}
			</Typography>
			<Typography className="comment">{comment}</Typography>
		</Grid>
	);
};

export default Comment;
