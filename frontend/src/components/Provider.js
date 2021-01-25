import React from 'react';

import {
	CommentsContextProvider,
	ProblemContextProvider,
	ProblemInfoContextProvider,
} from './Model';
import ViewModel from './ViewModel';

const Provider = () => (
	<CommentsContextProvider>
		<ProblemContextProvider>
			<ProblemInfoContextProvider>
				<ViewModel />
			</ProblemInfoContextProvider>
		</ProblemContextProvider>
	</CommentsContextProvider>
);

export default Provider;
