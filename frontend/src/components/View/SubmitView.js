import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import {
	PageHeader,
	InputBox,
	InputDropDown,
	EditorBox,
	MarkdownViewer,
	NoticeDialog,
	LeavingGuard,
} from '../UI';

const SubmitView = () => {
	const mainTitle = '문제 출제하기';
	const labels = ['제목', '분류'];
	const values = ['BFS', 'DFS'];
	const styles = { width: '100%', height: '70vh' };
	const lang = 'markdown';
	const history = useHistory();
	const [input, setInput] = useState('# 문제 설명');
	const [notice, setNotice] = useState(false);
	const [guard, setGuard] = useState(true);
	const handleInput = (e) => {
		setInput(e);
	};
	const showNotice = () => {
		setNotice(!notice);
	};

	return (
		<Grid className="submit">
			<Grid className="submit-container">
				{!notice && guard ? (
					<LeavingGuard
						when={guard}
						navigate={(p) => {
							history.push(p);
						}}
						shouldBlockNavigation={(location) => {
							if (guard && location.pathname !== '/submit') {
								return true;
							}
							return false;
						}}
					/>
				) : null}
				<PageHeader mainTitle={mainTitle} />
				<Grid className="submit-content">
					<Grid container className="submit-info" direction="column">
						{labels.map((label) => (
							<InputBox title={label} size="10" />
						))}
						<InputDropDown title="태그" value={values} />
						<Grid className="submit-form">
							<Grid className="submit-text">
								<EditorBox
									styles={styles}
									lang={lang}
									handleChange={handleInput}
								/>
							</Grid>
							<Grid className="submit-viewer">
								<MarkdownViewer source={input} />
							</Grid>
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
										title="출제 확인"
										info="문제를 출제하시겠습니까?"
										path="/"
									/>
								) : null}
								제출
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default SubmitView;
