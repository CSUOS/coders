import React, { useState, createContext, useContext } from 'react';

// ======== [ 임시 값 ] =============
import data from '../data.json';

const problemData = data.problem;
const userData = data.user;
const problemInfo = data.problem_info[0];
const problemComments = data.P_Comment;
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
const PInfoContext = createContext();
const PInfoDispatchContext = createContext();

export const ProblemInfoContextProvider = ({ children }) => {
	const [pInfo, setPInfo] = useState(problemInfo);
	return (
		<PInfoContext.Provider value={pInfo}>
			<PInfoDispatchContext.Provider value={setPInfo}>
				{children}
			</PInfoDispatchContext.Provider>
		</PInfoContext.Provider>
	);
};

export const usePInfoContext = () => {
	const context = useContext(PInfoContext);
	return context;
};
export const usePInfoDispatchContext = () => {
	const context = useContext(PInfoDispatchContext);
	return context;
};
// ===================================================================

// ================= [ comments context ] ======================
const CommentsContext = createContext();
const CommentsDispatchContext = createContext();

export const CommentsContextProvider = ({ children }) => {
	const [comments, setComments] = useState(problemComments);
	return (
		<CommentsContext.Provider value={comments}>
			<CommentsDispatchContext.Provider value={setComments}>
				{children}
			</CommentsDispatchContext.Provider>
		</CommentsContext.Provider>
	);
};

export const useCommentsContext = () => {
	const context = useContext(CommentsContext);
	return context;
};
export const useCommentsDispatchContext = () => {
	const context = useContext(CommentsDispatchContext);
	return context;
};
// ===================================================================
