import React, { useState } from 'react';
import {
	Grid,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from '@material-ui/core';

const Dropdown = ({ label, values, defaultValue }) => {
	const [state, setState] = useState();

	const handleChange = (event) => {
		setState(event.target.value);
	};

	return (
		<Grid className="dropdown">
			<FormControl
				// variant="outlined"
				// size="small"
				className="dropdown-form"
			>
				<InputLabel>{label}</InputLabel>
				<Select
					value={state}
					onChange={handleChange}
					defaultValue={defaultValue}
				>
					<MenuItem>
						<em>선택 없음</em>
					</MenuItem>
					{values.map((value) => (
						<MenuItem value={value}>{value}</MenuItem>
					))}
				</Select>
			</FormControl>
		</Grid>
	);
};

export default Dropdown;
