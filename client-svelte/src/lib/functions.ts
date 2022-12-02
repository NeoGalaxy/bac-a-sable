export function printPercentage(number: number) {
	return number % 1 === 0 ? number : number.toFixed(2) + "%"
}

export function compareArrays(array1: any[], array2: any[]): boolean {
	return JSON.stringify(array1) === JSON.stringify(array2)
}
