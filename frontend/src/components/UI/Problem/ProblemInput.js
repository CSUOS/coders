import React from 'react';
import { Grid, Button } from '@material-ui/core';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow';

const ProblemInput = ({ language }) => {
	// input 언어 설정
	const styles = { width: '100%', height: '90%' };
	let lang = 'c_cpp';
	switch (language) {
		case 'C++':
			lang = 'c_cpp';
			break;
		case 'Java':
			lang = 'java';
			break;
		case 'Python':
			lang = 'python';
			break;
		default:
			break;
	}
	return (
		<Grid
			container
			className="problem-input-container"
			direction="column"
			xs={6}
		>
			<AceEditor
				style={styles}
				className="problem-code-input"
				placeholder={`code here! ${lang}`}
				mode={lang}
				theme="tomorrow"
				name="codeInput"
				// onLoad={onLoad}
				// onChange={this.onChange}
				fontSize={18}
				showPrintMargin
				showGutter
				highlightActiveLine
				value=""
				setOptions={{
					enableBasicAutocompletion: false,
					enableLiveAutocompletion: false,
					enableSnippets: false,
					showLineNumbers: true,
					tabSize: 4,
				}}
			/>

			<Grid container direction="row">
				<Button className="problem-input-btn" variant="contained">
					예제 실행
				</Button>
				<Button variant="contained" color="primary">
					제출
				</Button>
			</Grid>
		</Grid>
	);
};

export default ProblemInput;
