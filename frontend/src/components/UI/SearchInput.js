import React from 'react';
import { Grid, TextField, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchInput = ({ label }) => {
	return (
		<Grid className="searchinput">
			<Grid className="searchinput-container" component="form">
				<input
					type="text"
					className="searchinput-inputbase"
					placeholder={label}
				/>
				<button type="button" className="searchinput-iconbtn">
					<SearchIcon />
				</button>
			</Grid>
		</Grid>
	);
};

export default SearchInput;
