import React from 'react';
import {
	CommentsContextProvider,
	ProblemContextProvider,
	ProblemInfoContextProvider,
	SubmissionsContextProvider,
	MySubmissionsContextProvider,
	ProblemResultContextProvider,
	RankContextProvider,
} from './Model';
import ViewModel from './ViewModel';

const Provider = () => (
	<RankContextProvider>
		<ProblemResultContextProvider>
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
		</ProblemResultContextProvider>
	</RankContextProvider>
);

export default Provider;
