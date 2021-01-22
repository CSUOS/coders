import React, { useState, createContext, useContext } from 'react';

// ======== [ 임시 값 ] =============
import data from '../data.json';

const problemData = data.problem;
const userData = data.user;
const problemInfo = data.problem_info[0];
// ==================================

// ================= [ problem context ] ======================
const ProblemDataContext = createContext();
const ProblemDispatchContext = createContext();

export const ProblemContextProvider = ({ children }) => {
	const [problems, setProblems] = useState(problemData);

	return (
		<ProblemDataContext.Provider value={problems}>
			<ProblemDispatchContext.Provider value={setProblems}>
				{children}
			</ProblemDispatchContext.Provider>
		</ProblemDataContext.Provider>
	);
};

export const useProblemDataContext = () => {
	const context = useContext(ProblemDataContext);
	return context;
};

export const useProblemDispatchContext = () => {
	const context = useContext(ProblemDispatchContext);
	return context;
};
// ===================================================================

// ================= [ problemInfo context ] ======================
const pInfoContext = createContext();
const pInfoDispatchContext = createContext();

export const ProblemInfoContextProvider = ({ children }) => {
	const [pInfo, setPInfo] = useState(problemInfo);
	return (
		<pInfoContext.Provider value={pInfo}>
			<pInfoDispatchContext.Provider value={setPInfo}>
				{children}
			</pInfoDispatchContext.Provider>
		</pInfoContext.Provider>
	);
};

export const usePInfoContext = () => {
	const context = useContext(pInfoContext);
	return context;
};
export const usePInfoDispatchContext = () => {
	const context = useContext(pInfoDispatchContext);
	return context;
};
// ===================================================================
