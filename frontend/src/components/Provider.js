import React from 'react';
import { CookiesProvider } from 'react-cookie';
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
	<CookiesProvider>
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
	</CookiesProvider>
);

export default Provider;
