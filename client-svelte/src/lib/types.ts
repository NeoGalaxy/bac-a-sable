export type Filters = {
	biasCorrection: boolean
	comparison: number
	methods: boolean[]
	methods2: number[]
}

export type HoveredBar = {
	methodId: string
	color: string
}

export type DataByCandidate = {
	name: string
	color: string
	data: {
		methodId: string
		value: number
	}[]
}[]
