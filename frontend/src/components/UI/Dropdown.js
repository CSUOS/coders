import React, { useState } from 'react';
import { Grid, MenuItem, FormControl, Select } from '@material-ui/core';

const Dropdown = ({
	label,
	values,
	selectedValue,
	handleSelectedValue,
	defaultValue,
	hasLabel = true,
}) => {
	return (
		<Grid className="dropdown">
			<FormControl
				variant="outlined"
				size="small"
				className="dropdown-form"
			>
				<Select
					value={selectedValue}
					onChange={handleSelectedValue}
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
