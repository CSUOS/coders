import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { Comment } from '.';
import GetToken from '../../function/GetToken';

const CommentForm = ({ comments, handleComments }) => {
	const [cmt, setText] = useState('');
	const token = GetToken();

	const handlePost = () => {
		if (cmt !== '') {
			try {
				const { id, name } = token;
				const commentData = {
					deleted: false,
					edited: false,
					problemId: id,
					text: cmt,
					userId: 1, // user name 추가 예정
				};
				handleComments('post', commentData);
				setText('');
			} catch (e) {
				console.log(e);
				alert('로그인을 해주세요.');
			}
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
					value={cmt}
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
