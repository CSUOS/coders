import React from 'react';

import {
	CommentsContextProvider,
	ProblemContextProvider,
	ProblemInfoContextProvider,
	UserContextProvider,
} from './Model';
import ViewModel from './ViewModel';

const Provider = () => (
	<UserContextProvider>
		<CommentsContextProvider>
			<ProblemContextProvider>
				<ProblemInfoContextProvider>
					<ViewModel />
				</ProblemInfoContextProvider>
			</ProblemContextProvider>
		</CommentsContextProvider>
	</UserContextProvider>
);

export default Provider;
