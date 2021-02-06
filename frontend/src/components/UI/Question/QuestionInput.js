import React, { useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { InputBox, InputDropDown, EditorBox, NoticeDialog } from '..';

const QuestionInput = () => {
	const values = ['질문', '자유', '공지'];
	const styles = { width: '100%', height: '400px' };
	const lang = 'c_cpp';
	const [notice, setNotice] = useState(false);
	const showNotice = () => {
		setNotice(!notice);
	};
	return (
		<Grid container className="question-input" direction="column">
			<InputBox title="제목" size="10" />
			<InputDropDown title="분류 " value={values} />
			<InputBox title="문제 번호 " size="1" />

			<TextField
				rows={7}
				className="question-text"
				multiline
				variant="outlined"
			/>
			<Grid className="question-text">
				<EditorBox styles={styles} lang={lang} />
			</Grid>
			<Grid className="btn">
				<Button
					variant="outlined"
					color="primary"
					onClick={() => {
						showNotice();
					}}
				>
					{notice ? (
						<NoticeDialog
							visible={notice}
							title="확인"
							info="질문을 게시하시겠습니까?"
							path="/question"
						/>
					) : null}
					제출
				</Button>
			</Grid>
		</Grid>
	);
};

export default QuestionInput;
