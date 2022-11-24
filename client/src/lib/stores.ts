import { writable, type Writable } from "svelte/store"
import type { Filters } from "./types"

export const filters: Writable<Filters> = writable({
	biasCorrection: false,
	comparison: 0,
	methods: [0, 1],
})
