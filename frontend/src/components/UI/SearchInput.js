import React, { useState } from 'react';
import { Grid, TextField, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchInput = ({ getInput, label }) => {
	const [text, setText] = useState('');
	const onChange = (e) => {
		setText(e.target.value);
	};
	const sendText = () => {
		getInput(text);
	};

	return (
		<Grid className="searchinput">
			<Grid className="searchinput-container" component="form">
				<input
					type="text"
					className="searchinput-inputbase"
					placeholder={label}
					onChange={onChange}
					value={text}
				/>
				<button
					type="button"
					className="searchinput-iconbtn"
					onClick={sendText}
				>
					<SearchIcon />
				</button>
			</Grid>
		</Grid>
	);
};

export default SearchInput;
