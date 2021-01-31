import React from 'react';

import {
	CommentsContextProvider,
	ProblemContextProvider,
	ProblemInfoContextProvider,
	SubmissionsContextProvider,
	MySubmissionsContextProvider,
	ProblemSubmitContextProvider,
	UserContextProvider,
} from './Model';
import ViewModel from './ViewModel';

const Provider = () => (
	<ProblemSubmitContextProvider>
		<SubmissionsContextProvider>
			<MySubmissionsContextProvider>
				<UserContextProvider>
					<CommentsContextProvider>
						<ProblemContextProvider>
							<ProblemInfoContextProvider>
								<ViewModel />
							</ProblemInfoContextProvider>
						</ProblemContextProvider>
					</CommentsContextProvider>
				</UserContextProvider>
			</MySubmissionsContextProvider>
		</SubmissionsContextProvider>
	</ProblemSubmitContextProvider>
);

export default Provider;
