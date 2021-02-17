// 전체 제출 목록에서 필요한 데이터만 추출하는 함수
const GetSubmissions = (submissions) => {
	const arr = [];
	submissions.forEach((data) => {
		const { id, memoryLimit, timeLimit, language, createdAt } = data;
		let date = '';
		date = date.concat(
			createdAt.substr(0, 10),
			' ',
			createdAt.substr(11, 5)
		);
		arr.push([id, memoryLimit, timeLimit, language, date]);
	});
	return arr;
};

export default GetSubmissions;
