import type { Candidate, DataByCandidate, DataByMethod } from "./types"

export default [
	{ name: "Emmanuel Macron", value: 24.01 },
	{ name: "Marine Le Pen", value: 21.3 },
	{ name: "François Fillon", value: 19.95 },
	{ name: "Jean-Luc Mélenchon", value: 19.6 },
	{ name: "Benoît Hamon", value: 6.36 },
	{ name: "Nathalie Arthaud", value: 0.93 },
	{ name: "Philippe Poutou", value: 0.9 },
	{ name: "Jacques Cheminade", value: 0.6 },
	{ name: "François Asselineau", value: 0.55 },
	{ name: "Nicolas Dupont-Aignan", value: 0.54 },
	{ name: "Jean Lassalle", value: 0.17 },
]

export const correction = [
	{ name: "Emmanuel Macron", value: 1.03 },
	{ name: "Marine Le Pen", value: 12.81 },
	{ name: "François Fillon", value: 4.33 },
	{ name: "Jean-Luc Mélenchon", value: 0.44 },
	{ name: "Benoît Hamon", value: 0.32 },
	{ name: "Nathalie Arthaud", value: 1.79 },
	{ name: "Philippe Poutou", value: 0.49 },
	{ name: "Jacques Cheminade", value: 1.09 },
	{ name: "François Asselineau", value: 0.64 },
	{ name: "Nicolas Dupont-Aignan", value: 4.1 },
	{ name: "Jean Lassalle", value: 1.98 },
]

export const rankings: DataByMethod[] = [
	{
		methodId: "borda4",
		methodName: "Borda 4",
		description:
			"Méthode de vote où les participants doivent classer jusqu'à leurs 4 candidats préférés dans leur ordre de préférence. Pour décider du candidat gagnant, on somme pour chaque candidat le nombre de votants les ayant choisi en tant que premier vote. Celui ayant le moins de votes est éliminé, et ses votes sont redistribués aux autres candidats en fonction des votes suivant des votants ayant voté pour le candidat éliminé. Les candidats sont ainsi éliminés un à un jusqu'à ce qu'il y en ait un qui a la majorité.",
		results: [
			{ name: "Emmanuel Macron", value: 24.01 },
			{ name: "Marine Le Pen", value: 5.3 },
			{ name: "François Fillon", value: 19.95 },
			{ name: "Jean-Luc Mélenchon", value: 19.6 },
			{ name: "Benoît Hamon", value: 6.36 },
			{ name: "Nathalie Arthaud", value: 0.93 },
			{ name: "Philippe Poutou", value: 0.9 },
			{ name: "Jacques Cheminade", value: 0.6 },
			{ name: "François Asselineau", value: 0.55 },
			{ name: "Nicolas Dupont-Aignan", value: 0.54 },
			{ name: "Jean Lassalle", value: 0.17 },
		],
		unit: "PERCENT",
	},
	{
		methodId: "approval",
		methodName: "Approval",
		description:
			"Méthode de vote où les participants doivent indiquer s'ils étaient favorable ou non au candidat, pour chaque candidat.",
		results: [
			{ name: "Emmanuel Macron", value: 13.61 },
			{ name: "Marine Le Pen", value: 1.57 },
			{ name: "François Fillon", value: 3.61 },
			{ name: "Jean-Luc Mélenchon", value: 25.16 },
			{ name: "Benoît Hamon", value: 23.92 },
			{ name: "Nathalie Arthaud", value: 7.07 },
			{ name: "Philippe Poutou", value: 13.55 },
			{ name: "Jacques Cheminade", value: 2.01 },
			{ name: "François Asselineau", value: 2.44 },
			{ name: "Nicolas Dupont-Aignan", value: 3.09 },
			{ name: "Jean Lassalle", value: 3.97 },
		],
		unit: "PERCENT",
	},
	{
		methodId: "ev101",
		methodName: "Evaluation Voting -1/0/1",
		description:
			"Méthode de vote où les participants doivent donner un score à chaque candidat: -1, 0 ou 1.",
		results: [
			{ name: "Emmanuel Macron", value: 20.01 },
			{ name: "Marine Le Pen", value: 3.3 },
			{ name: "François Fillon", value: 20.95 },
			{ name: "Jean-Luc Mélenchon", value: 20.6 },
			{ name: "Benoît Hamon", value: 6.36 },
			{ name: "Nathalie Arthaud", value: 0.93 },
			{ name: "Philippe Poutou", value: 0.9 },
			{ name: "Jacques Cheminade", value: 0.6 },
			{ name: "François Asselineau", value: 0.55 },
			{ name: "Nicolas Dupont-Aignan", value: 0.54 },
			{ name: "Jean Lassalle", value: 0.17 },
		],
		unit: "PERCENT",
	},
]

const colors = [
	{ name: "Nathalie Arthaud", color: "#bb0000" },
	{ name: "François Asselineau", color: "#118088" },
	{ name: "Jacques Cheminade", color: "#26c4ec" },
	{ name: "Nicolas Dupont-Aignan", color: "#0082C4" },
	{ name: "François Fillon", color: "#0066cc" },
	{ name: "Benoît Hamon", color: "#FF8080" },
	{ name: "Jean Lassalle", color: "#a5c1df" },
	{ name: "Marine Le Pen", color: "#0D378A" },
	{ name: "Emmanuel Macron", color: "#ffd600" },
	{ name: "Jean-Luc Mélenchon", color: "#cc2443" },
	{ name: "Philippe Poutou", color: "#dd0000" },
]

export const candidates: Candidate[] = rankings[0].results.map((d) => {
	return {
		name: d.name,
		color: colors.find((c) => c.name === d.name).color,
	}
})

export const dataByCandidate: DataByCandidate[] = candidates.map(
	(candidate) => {
		return {
			name: candidate.name,
			color: candidate.color,
			data: rankings.map((r) => {
				return {
					methodId: r.methodId,
					value: r.results.find((result) => result.name === candidate.name)
						.value,
				}
			}),
		}
	}
)
