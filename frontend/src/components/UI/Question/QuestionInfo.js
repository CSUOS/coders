import React from 'react';
import { Grid, Card, CardHeader, Avatar, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { EditorBox } from '..';
import AccordianComment from '../Problem/AccordianComment';

const QuestionInfo = ({ title, publisher, lang }) => {
	const styles = { width: '100%', height: '90%' };
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
			<Grid className="code-text">
				<EditorBox
					className="code-text"
					styles={styles}
					lang={lang}
					readFlag="true"
					initValue={`#include <iostream>
using namespace std;

int main(void) {
	cout << "Hello World" << endl;
}`}
				/>
			</Grid>
			<Grid className="comment">
				<AccordianComment />
			</Grid>
		</Card>
	);
};

export default QuestionInfo;
