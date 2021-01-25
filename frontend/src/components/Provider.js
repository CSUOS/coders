import React from 'react';

import {
	CommentsContextProvider,
	ProblemContextProvider,
	ProblemInfoContextProvider,
	SubmissionsContextProvider,
	MySubmissionsContextProvider,
} from './Model';
import ViewModel from './ViewModel';

const Provider = () => (
	<SubmissionsContextProvider>
		<MySubmissionsContextProvider>
			<CommentsContextProvider>
				<ProblemContextProvider>
					<ProblemInfoContextProvider>
						<ViewModel />
					</ProblemInfoContextProvider>
				</ProblemContextProvider>
			</CommentsContextProvider>
		</MySubmissionsContextProvider>
	</SubmissionsContextProvider>
);

export default Provider;
