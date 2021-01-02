import React, { useState } from 'react';
import { Grid, MenuItem, FormControl, Select } from '@material-ui/core';

const Dropdown = ({ label, values, defaultValue, hasLabel = true }) => {
	const [state, setState] = useState();

	const handleChange = (event) => {
		setState(event.target.value);
	};

	return (
		<Grid className="dropdown">
			<FormControl
				variant="outlined"
				size="small"
				className="dropdown-form"
			>
				<Select
					value={state}
					onChange={handleChange}
					defaultValue={defaultValue}
					displayEmpty
				>
					{hasLabel ? (
						<MenuItem disabled>
							<em>{label}</em>
						</MenuItem>
					) : undefined}
					{values.map((value) => (
						<MenuItem value={value}>{value}</MenuItem>
					))}
				</Select>
			</FormControl>
		</Grid>
	);
};

export default Dropdown;
