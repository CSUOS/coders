import React from 'react';
import { Box, Card, CardHeader, Avatar, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const QuestionInfo = ({ title, publisher, questionInfo }) => {
	return (
		<Card className="question-info">
			<CardHeader title="5번 문제" />
			<CardHeader
				avatar={<Avatar className="avatar">User</Avatar>}
				title={title}
				subheader={publisher}
			/>
			<CardContent>
				<Typography color="textSecondary" component="p">
					질문 내용
				</Typography>
			</CardContent>
			<Box border={1} className="code-text">
				<CardContent className="content">
					<Typography color="textSecondary" component="p">
						codeText
					</Typography>
				</CardContent>
			</Box>
		</Card>
	);
};

export default QuestionInfo;
