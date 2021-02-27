import React from 'react';
import { CookiesProvider } from 'react-cookie';
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
	<CookiesProvider>
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
	</CookiesProvider>
);

export default Provider;
