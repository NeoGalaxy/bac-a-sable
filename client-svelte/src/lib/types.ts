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

export type Candidate = {
	name: string
	color: string
	correction: number
}

export type DataByMethod = {
	methodId: string
	methodName: string
	description: string
	results: {
		name: string
		value: number
	}[]
	unit: string
}

export type DataByCandidate = {
	name: string
	color: string
	data: {
		methodId: string
		value: number
	}[]
}
