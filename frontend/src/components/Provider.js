import React from 'react';

import {
	CommentsContextProvider,
	ProblemContextProvider,
	ProblemInfoContextProvider,
	SubmissionsContextProvider,
	MySubmissionsContextProvider,
	ProblemSubmitContextProvider,
} from './Model';
import ViewModel from './ViewModel';

const Provider = () => (
	<ProblemSubmitContextProvider>
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
	</ProblemSubmitContextProvider>
);

export default Provider;
