import React from 'react';
import { Grid } from '@material-ui/core';
import { MenuBar, PageHeader, LabelInput } from '../UI';

const SubmitView = () => {
	const mainTitle = '문제 출제하기';
	const labels = ['제목', '분류', '태그'];

	return (
		<Grid className="submit">
			<MenuBar />
			<Grid className="submit-container">
				<PageHeader mainTitle={mainTitle} />
				<Grid className="submit-content">
					<Grid className="submit-info">
						{labels.map((label) => (
							<LabelInput label={label} />
						))}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default SubmitView;
