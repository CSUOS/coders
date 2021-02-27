import React, { useState } from 'react';
import { Grid, TextField, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchInput = ({ input, label, handleInputChange, onClick }) => {
	return (
		<Grid className="searchinput">
			<Grid className="searchinput-container" component="form">
				<input
					type="text"
					className="searchinput-inputbase"
					placeholder={label}
					onChange={handleInputChange}
					value={input}
				/>
				<button
					type="button"
					className="searchinput-iconbtn"
					onClick={onClick}
				>
					<SearchIcon />
				</button>
			</Grid>
		</Grid>
	);
};

export default SearchInput;
