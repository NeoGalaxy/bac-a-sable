import type { Candidate, DataByCandidate, DataByMethod } from "./types"
import methodsData from "./data.json"

export const dataByMethod: DataByMethod[] = methodsData

export const candidates: Candidate[] = [
	{ name: "Emmanuel Macron", color: "#ffd600", correction: 1.03 },
	{ name: "Marine Le Pen", color: "#0D378A", correction: 12.81 },
	{ name: "François Fillon", color: "#0066cc", correction: 4.33 },
	{ name: "Jean-Luc Mélenchon", color: "#cc2443", correction: 0.44 },
	{ name: "Benoît Hamon", color: "#FF8080", correction: 0.32 },
	{ name: "Nicolas Dupont-Aignan", color: "#0082C4", correction: 4.1 },
	{ name: "Jean Lassalle", color: "#a5c1df", correction: 1.98 },
	{ name: "Philippe Poutou", color: "#dd0000", correction: 0.49 },
	{ name: "François Asselineau", color: "#118088", correction: 0.64 },
	{ name: "Nathalie Arthaud", color: "#bb0000", correction: 1.79 },
	{ name: "Jacques Cheminade", color: "#26c4ec", correction: 1.09 },
]

export const dataByCandidate: DataByCandidate[] = candidates.map(
	(candidate) => {
		return {
			name: candidate.name,
			color: candidate.color,
			data: dataByMethod.map((r) => {
				return {
					methodId: r.methodId,
					value: r.results.find((result) => result.name === candidate.name)
						.value,
				}
			}),
		}
	}
)
