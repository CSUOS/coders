import React from 'react';

import { ProblemContextProvider, ProblemInfoContextProvider } from './Model';
import ViewModel from './ViewModel';

const Provider = () => (
	<ProblemContextProvider>
		<ProblemInfoContextProvider>
			<ViewModel />
		</ProblemInfoContextProvider>
	</ProblemContextProvider>
);

export default Provider;
