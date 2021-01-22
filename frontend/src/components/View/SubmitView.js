import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import {
	PageHeader,
	InputBox,
	InputDropDown,
	EditorBox,
	MarkdownViewer,
} from '../UI';

const SubmitView = () => {
	const mainTitle = '문제 출제하기';
	const labels = ['제목', '분류'];
	const values = ['BFS', 'DFS'];
	const styles = { width: '100%', height: '70vh' };
	const lang = 'markdown';
	const [input, setInput] = useState('# 문제 설명');
	const handleInput = (e) => {
		setInput(e);
	};

	return (
		<Grid className="submit">
			<Grid className="submit-container">
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
							<Link to="/">
								<Button variant="outlined" color="primary">
									제출
								</Button>
							</Link>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default SubmitView;
