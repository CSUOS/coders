import React from 'react';

import {
	CommentsContextProvider,
	ProblemContextProvider,
	ProblemInfoContextProvider,
	SubmissionsContextProvider,
	MySubmissionsContextProvider,
	ProblemCodeContextProvider,
	UserContextProvider,
} from './Model';
import ViewModel from './ViewModel';

const Provider = () => (
	<ProblemCodeContextProvider>
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
	</ProblemCodeContextProvider>
);

export default Provider;
