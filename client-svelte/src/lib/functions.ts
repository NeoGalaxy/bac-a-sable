export function printPercentage(number: number) {
	return number % 1 === 0 ? number : number.toFixed(2) + "%"
}
