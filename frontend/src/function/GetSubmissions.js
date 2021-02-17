// 전체 제출 목록에서 필요한 데이터만 추출하는 함수
// isAll 이 true 면 전체 기록, false면 내 기록만 가공
const GetSubmissions = (submissions, isAll) => {
	const arr = [];
	if (submissions === []) {
		return null;
	}
	submissions.forEach((data) => {
		// name 추가예정
		if (isAll) {
			const { id, memoryLimit, timeLimit, language, createdAt } = data;
			let date = '';
			date = date.concat(
				createdAt.substr(0, 10),
				' ',
				createdAt.substr(11, 5)
			);
			arr.push([id, memoryLimit, timeLimit, language, date]);
		} else {
			const {
				id,
				result,
				memoryLimit,
				timeLimit,
				language,
				createdAt,
			} = data;
			let date = '';
			date = date.concat(
				createdAt.substr(0, 10),
				' ',
				createdAt.substr(11, 5)
			);
			arr.push([id, result, memoryLimit, timeLimit, language, date]);
		}
	});
	return arr;
};

export default GetSubmissions;
