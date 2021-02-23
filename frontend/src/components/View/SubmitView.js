import React, { useState, useEffect } from 'react';
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

const SubmitView = ({ user }) => {
	const mainTitle = '문제 출제하기';
	const labels = ['제목', '분류'];
	const values = ['BFS', 'DFS'];
	const styles = { width: '100%', height: '70vh' };
	const lang = 'markdown';
	const history = useHistory();
	const samePage = ['/submit', '/login'];
	const [input, setInput] = useState('# 문제 설명');
	const [notice, setNotice] = useState(false);
	const [guard, setGuard] = useState(true);
	const handleInput = (e) => {
		setInput(e);
	};
	const showNotice = () => {
		setNotice(!notice);
	};
	const checkPage = (location) => {
		return samePage.indexOf(location.pathname) > -1;
	};

	return (
		<Grid className="submit">
			{user ? (
				<Grid className="submit-container">
					{!notice && guard ? (
						<LeavingGuard
							when={guard}
							navigate={(p) => {
								history.push(p);
							}}
							shouldBlockNavigation={(location) => {
								if (guard && !checkPage(location)) {
									return true;
								}
								return false;
							}}
						/>
					) : undefined}
					<PageHeader mainTitle={mainTitle} />
					<Grid className="submit-content">
						<Grid
							container
							className="submit-info"
							direction="column"
						>
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
			) : (
				<NoticeDialog
					visible={showNotice}
					title="로그인 필요"
					info="접근 권한이 없습니다."
					path="/"
					oneBtn
				/>
			)}
		</Grid>
	);
};

export default SubmitView;
