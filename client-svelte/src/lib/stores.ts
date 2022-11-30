import { writable, type Writable } from "svelte/store"
import { dataByMethod } from "./data"
import type { Filters, HoveredBar } from "./types"

export const filters: Writable<Filters> = writable({
	biasCorrection: false,
	comparison: 0,
	methods: new Array(dataByMethod.length).fill(false, 2).fill(true, 0, 2),
	methods2: [0, 1],
})

export const hoveredBar: Writable<HoveredBar> = writable(null)
