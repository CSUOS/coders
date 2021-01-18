import React from 'react';

import { ProblemContextProvider } from './Model';
import ViewModel from './ViewModel';

const Provider = () => (
	<ProblemContextProvider>
		<ViewModel />
	</ProblemContextProvider>
);

export default Provider;
