import React from 'react';
import { CookiesProvider } from 'react-cookie';
import {
	CommentsContextProvider,
	ProblemContextProvider,
	ProblemInfoContextProvider,
	SubmissionsContextProvider,
	MySubmissionsContextProvider,
	ProblemResultContextProvider,
} from './Model';
import ViewModel from './ViewModel';

const Provider = () => (
	<CookiesProvider>
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
	</CookiesProvider>
);

export default Provider;
