package judge

type ProblemInfo struct {
	Name		string
	Modified	float64
}

type JudgeInfo struct {
	ID			string
	Key			string
	Problems	[]ProblemInfo
	Executors	[]string
}

type BaseResponse struct {
	Name	string	`json:"name"`
}

type PingRequest struct {
	Name	string	`json:"name"`
	When	string	`json:"when"`
}

type SubmissionRequest struct {
	Name			string	`json:"name"`
	SubmissionID	int64	`json:"submission-id"`
	ProblemID		string	`json:"problem-id"`
	Language		string	`json:"language"`
	Source			string	`json:"source"`
	TimeLimit		int64	`json:"time-limit"`
	MemoryLimit		int64	`json:"memory-limit"`
	ShortCircuit	bool	`json:"short-circuit"`
	Meta			string	`json:"meta"`
}