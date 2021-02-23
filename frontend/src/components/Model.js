import React, { useState, createContext, useContext } from 'react';

// ======== [ 임시 값 ] =============
import data from '../data.json';

const problemData = data.problem;
// ==================================

// ================= [ problem context ] ============================
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

// ================= [ problemInfo context ] =========================
const PInfoContext = createContext();
const PInfoDispatchContext = createContext();

export const ProblemInfoContextProvider = ({ children }) => {
	const [pInfo, setPInfo] = useState('');
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

// ================= [ comments context ] ============================
const CommentsContext = createContext();
const CommentsDispatchContext = createContext();

export const CommentsContextProvider = ({ children }) => {
	const [comments, setComments] = useState(null);
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

// ================= [ submissions context ] =========================
const SubmissionsContext = createContext();
const SubmissionsDispatchContext = createContext();

export const SubmissionsContextProvider = ({ children }) => {
	const [submissions, setSubmissions] = useState([]);
	return (
		<SubmissionsContext.Provider value={submissions}>
			<SubmissionsDispatchContext.Provider value={setSubmissions}>
				{children}
			</SubmissionsDispatchContext.Provider>
		</SubmissionsContext.Provider>
	);
};

export const useSubmissionsContext = () => {
	const context = useContext(SubmissionsContext);
	return context;
};
export const useSubmissionsDispatchContext = () => {
	const context = useContext(SubmissionsDispatchContext);
	return context;
};
// ===================================================================

// ================= [ mySubmissions context ] =========================
const MySubmissionsContext = createContext();
const MySubmissionsDispatchContext = createContext();

export const MySubmissionsContextProvider = ({ children }) => {
	const [mySubmissions, setMySubmissions] = useState([]);
	return (
		<MySubmissionsContext.Provider value={mySubmissions}>
			<MySubmissionsDispatchContext.Provider value={setMySubmissions}>
				{children}
			</MySubmissionsDispatchContext.Provider>
		</MySubmissionsContext.Provider>
	);
};

export const useMySubmissionsContext = () => {
	const context = useContext(MySubmissionsContext);
	return context;
};
export const useMySubmissionsDispatchContext = () => {
	const context = useContext(MySubmissionsDispatchContext);
	return context;
};
// ===================================================================

// ================= [ problemSubmit context ] =========================
const ProblemResultContext = createContext();
const ProblemResultDispatchContext = createContext();

export const ProblemResultContextProvider = ({ children }) => {
	const [problemSubmit, setProblemSubmit] = useState(null);
	return (
		<ProblemResultContext.Provider value={problemSubmit}>
			<ProblemResultDispatchContext.Provider value={setProblemSubmit}>
				{children}
			</ProblemResultDispatchContext.Provider>
		</ProblemResultContext.Provider>
	);
};

export const useProblemResultContext = () => {
	const context = useContext(ProblemResultContext);
	return context;
};
export const useProblemResultDispatchContext = () => {
	const context = useContext(ProblemResultDispatchContext);
	return context;
};
