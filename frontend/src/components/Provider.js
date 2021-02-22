import React from 'react';
import { CookiesProvider } from 'react-cookie';
import {
	CommentsContextProvider,
	ProblemContextProvider,
	ProblemInfoContextProvider,
	SubmissionsContextProvider,
	MySubmissionsContextProvider,
	ProblemResultContextProvider,
	UserContextProvider,
} from './Model';
import ViewModel from './ViewModel';

const Provider = () => (
	<CookiesProvider>
		<ProblemResultContextProvider>
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
		</ProblemResultContextProvider>
	</CookiesProvider>
);

export default Provider;
