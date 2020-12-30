import React from 'react';
import { Grid, TextField, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchInput = ({ label }) => {
	return (
		<Grid className="searchinput">
			<Grid className="searchinput-container" component="form">
				<TextField className="searchinput-inputbase" label={label} />
				<IconButton
					type="submit"
					className="searchinput-iconbtn"
					aria-label="search"
				>
					<SearchIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default SearchInput;
