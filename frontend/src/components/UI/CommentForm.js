import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { Comment } from '.';

const CommentForm = ({ comments }) => {
	return (
		<Grid className="comment-form" container direction="column">
			<Grid className="comment-post">
				<TextField
					className="comment-post-input"
					label="comment"
					multiline
					variant="outlined"
				/>
				<Button
					className="comment-post-btn"
					variant="outlined"
					color="primary"
				>
					댓글 작성
				</Button>
			</Grid>
			<Grid className="comment-comments">
				{comments.map((comment) => (
					<Comment
						userName={comment.userId}
						comment={comment.text}
						createAt={comment.createdAt}
					/>
				))}
			</Grid>
		</Grid>
	);
};

export default CommentForm;
