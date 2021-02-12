import React from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

const SelectForm = ({ defaultValue, values, handelChange }) => {
	return (
		<FormControl onChange={handelChange}>
			<NativeSelect defaultValue={defaultValue}>
				{values.map((value) => (
					<option value={value}>{value}</option>
				))}
			</NativeSelect>
		</FormControl>
	);
};

export default SelectForm;
