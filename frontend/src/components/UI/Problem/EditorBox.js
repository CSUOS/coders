import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-tomorrow';

/** 에디터 사용법 :
 * 에디터 내부 크기 수정은 styles 를 통해서만 수정이 가능합니다. ex) const styles = { width: '100%', height: '90%' };
 * lang 에 사용 모드를 넣어주세요 마크다운이면 markdown
 * handleChange를 통해 getValue 를 사용할 수 있습니다.
 * 미리 초기값을 넣어주려면 initValue에 넣으면 됩니다.
 */
const EditorBox = ({ styles, lang, handleChange, initValue, readFlag }) => {
	return (
		<AceEditor
			style={styles}
			className="editor-box"
			placeholder={`input here! `}
			mode={lang}
			theme="tomorrow"
			name="codeInput"
			// onLoad={onLoad}
			onChange={handleChange}
			fontSize={19}
			showPrintMargin
			showGutter
			highlightActiveLine
			defaultValue={initValue}
			readOnly={readFlag}
			setOptions={{
				enableBasicAutocompletion: false,
				enableLiveAutocompletion: false,
				enableSnippets: false,
				showLineNumbers: true,
				tabSize: 4,
			}}
		/>
	);
};

export default EditorBox;
