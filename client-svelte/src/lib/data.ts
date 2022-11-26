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

export const rankings = [
	{
		methodId: "borda4",
		methodName: "Borda 4",
		description:
			"Méthode de vote où les participants doivent classer jusqu'à leurs 4 candidats préférés dans leur ordre de préférence. Pour décider du candidat gagnant, on somme pour chaque candidat le nombre de votants les ayant choisi en tant que premier vote. Celui ayant le moins de votes est éliminé, et ses votes sont redistribués aux autres candidats en fonction des votes suivant des votants ayant voté pour le candidat éliminé. Les candidats sont ainsi éliminés un à un jusqu'à ce qu'il y en ait un qui a la majorité.",
		results: [
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
		],
		unit: "PERCENT",
	},
	{
		methodId: "approval",
		methodName: "Approval",
		description:
			"Méthode de vote où les participants doivent indiquer s'ils étaient favorable ou non au candidat, pour chaque candidat.",
		results: [
			{ name: "Emmanuel Macron", value: 25.01 },
			{ name: "Marine Le Pen", value: 20.3 },
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
		methodId: "ev101",
		methodName: "Evaluation Voting -1/0/1",
		description:
			"Méthode de vote où les participants doivent donner un score à chaque candidat: -1, 0 ou 1.",
		results: [
			{ name: "Emmanuel Macron", value: 20.01 },
			{ name: "Marine Le Pen", value: 22.3 },
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

const candidates = rankings[0].results.map((d) => d.name)

export const dataByCandidate = candidates.map((candidate) => {
	return {
		name: candidate,
		color: `#${("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(
			-6
		)}`,
		data: rankings.map((r) => {
			return {
				methodId: r.methodId,
				value: r.results.find((result) => result.name === candidate).value,
			}
		}),
	}
})
