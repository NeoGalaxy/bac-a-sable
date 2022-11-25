import { writable, type Writable } from "svelte/store"
import { rankings } from "./data"
import type { Filters } from "./types"

export const filters: Writable<Filters> = writable({
	biasCorrection: false,
	comparison: 0,
	methods: new Array(rankings.length).fill(false),
})
