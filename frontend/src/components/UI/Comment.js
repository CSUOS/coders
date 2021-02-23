import React, { useState } from 'react';
import { Grid, Typography, IconButton, TextField } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';

const Comment = (props) => {
	const {
		userName,
		comment,
		createAt,
		problemId,
		commentId,
		handleComments,
	} = props;
	let time = ' ';
	if (createAt != null) {
		time = time.concat(createAt.substr(0, 10), ' ', createAt.substr(11, 5));
	}
	// 댓글 삭제
	const handleDelete = () => {
		const commentData = { commentId, problemId };
		handleComments('delete', commentData);
	};
	// 댓글 수정
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState(comment);
	const handlePatch = () => {
		if (edit) {
			const commentData = {
				commentId,
				deleted: false,
				edited: true,
				problemId,
				text,
				userId: 1, // 토큰 id로 바꿀 예정
			};
			handleComments('patch', commentData);
			setEdit(!edit);
		} else {
			setEdit(!edit);
		}
	};
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
						{time}
						&nbsp;&nbsp;
					</Typography>
				</Typography>
				<Grid>
					<IconButton size="small" onClick={handlePatch}>
						<EditIcon fontSize="small" />
					</IconButton>
					<IconButton size="small" onClick={handleDelete}>
						<ClearIcon fontSize="small" />
					</IconButton>
				</Grid>
			</Grid>
			{edit ? (
				<TextField
					className="comment"
					multiline
					variant="outlined"
					defaultValue={comment}
					onChange={(e) => {
						setText(e.target.value);
					}}
				/>
			) : (
				<Typography className="comment">{text}</Typography>
			)}
		</Grid>
	);
};

export default Comment;
