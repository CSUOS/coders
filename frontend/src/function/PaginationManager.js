export const getTotalPageCount = (totalItemCount, currentLimit) => {
	const quotient = Math.floor(totalItemCount / currentLimit);
	if (totalItemCount % currentLimit === 0) return quotient;
	return quotient + 1;
};
