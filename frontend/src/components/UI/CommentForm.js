import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { Comment } from '.';

const CommentForm = ({ pId, comments, handleComments }) => {
	const [cmt, setText] = useState('');
	// 댓글 post 함수
	const handlePost = () => {
		if (cmt !== '') {
			const commentData = {
				deleted: false,
				edited: false,
				problemId: Number(pId),
				text: cmt,
				userId: 1, // 토큰 id로 바꿀 예정
			};
			handleComments('post', commentData);
			setText('');
		}
	};

	return (
		<Grid className="comment-form" container direction="column">
			<Grid className="comment-post">
				<TextField
					className="comment-post-input"
					label="comment"
					multiline
					variant="outlined"
					onChange={(e) => {
						setText(e.target.value);
					}}
				/>
				<Button
					className="comment-post-btn"
					variant="outlined"
					color="primary"
					onClick={handlePost}
				>
					댓글 작성
				</Button>
			</Grid>
			{comments ? (
				<Grid className="comment-comments">
					{comments.map((comment) => (
						<Comment
							userName={comment.userId}
							comment={comment.text}
							createAt={comment.createdAt}
							problemId={comment.problemId}
							commentId={comment.id}
							handleComments={handleComments}
						/>
					))}
				</Grid>
			) : undefined}
		</Grid>
	);
};

export default CommentForm;
