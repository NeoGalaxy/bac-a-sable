import json

import simul_stv
import simul_broda
import simul_ev

SIMULATIONS_DATA = [
	(simul_stv.gen_results, [
		{
			"file": "stv111.csv", "id": "stv111", "name": "STV 1-11",
			"description": "Dans ce système de scrutin, chaque électeur donne un rang à chaque candidat. Les votes correspondants au premier rang est attribué à chaque candidat. Ensuite, le candidat avec le moins de vote est disqualifié, et chacun de ses votes est transféré au candidat non disqualifié ayant le rang le plus élevé d'après le vote. Les votants ne sont les mêmes que dans STV 4-11."
		},
		{
			"file": "stv411.csv", "id": "stv411", "name": "STV 4-11",
			"description": "Dans ce système de scrutin, chaque électeur donne un rang à chaque candidat. Les votes correspondants au premier rang est attribué à chaque candidat. Ensuite, le candidat avec le moins de vote est disqualifié, et chacun de ses votes est transféré au candidat non disqualifié ayant le rang le plus élevé d'après le vote. Les votants ne sont les mêmes que dans STV 1-11."
		},
	]),
	(simul_broda.gen_results, [
		{
			"file": "borda4.csv", "id": "borda4", "name": "Borda 4",
			"description": "Système de scrutin dans lequel chaque électeur donne un rang à ses 4 candidats favoris, et le score final des candidats est attribué en faisant une somme pondérée des votes."
		},
	]),
	(simul_ev.gen_results, [
		{
			"file": "ev012.csv", "id": "ev012", "name": "Evaluation 0 à 2", "arg": [0],
			"description": "Méthode de vote où les participants doivent attribuer une note à chaque candidat, note allant de 0 à 2. Le décompte consiste à faire, pour chaque candidat, la somme des notes et de la comparer avec la note maximale possible avec le même nombre de votants. Lorsque quelqu'un ne vote pas pour un candidat, la note minimale de 0 est appliquée."
		},
		{
			"file": "ev0123.csv", "id": "ev0123", "name": "Evaluation 0 à 3", "arg": [0],
			"description": "Méthode de vote où les participants doivent attribuer une note à chaque candidat, note allant de 0 à 3. Le décompte consiste à faire, pour chaque candidat, la somme des notes et de la comparer avec la note maximale possible avec le même nombre de votants. Lorsque quelqu'un ne vote pas pour un candidat, la note minimale de 0 est appliquée."
		},
		{
			"file": "ev-101.csv", "id": "ev-101", "name": "Evaluation -1 à 1", "arg": [-1],
			"description": "Méthode de vote où les participants doivent attribuer une note à chaque candidat, note allant de -1 à 1. Le décompte consiste à faire, pour chaque candidat, la somme des notes et de la comparer avec la note maximale possible avec le même nombre de votants. Lorsque quelqu'un ne vote pas pour un candidat, la note minimale de -1 est appliquée."
		},
		{
			"file": "ev-1012.csv", "id": "ev-1012", "name": "Evaluation -1 à 2", "arg": [-1],
			"description": "Méthode de vote où les participants doivent attribuer une note à chaque candidat, note allant de -1 à 2. Le décompte consiste à faire, pour chaque candidat, la somme des notes et de la comparer avec la note maximale possible avec le même nombre de votants. Lorsque quelqu'un ne vote pas pour un candidat, la note minimale de -1 est appliquée."
		},
		{
			"file": "evcontinuous.csv", "id": "evcontinuous", "name": "Evaluation continue",
			"description": "Méthode de vote où les participants doivent attribuer une note à chaque candidat, note allant de 0 à 100. Le décompte consiste à faire, pour chaque candidat, la somme des notes et de la comparer avec la note maximale possible avec le même nombre de votants. Lorsque quelqu'un ne vote pas pour un candidat, il n'est pas décompté parmis les votants lors du calcul du score de ce candidat."
		},
	]),
]

def main(json_file, to_run, append):
	res = []
	if append:
		with open(json_file, 'r') as json_fp:
			res = json.load(json_fp)
	for (script, methods) in to_run:
		for method_data in methods:
			method_res = {
				"methodId": method_data["id"],
				"methodName": method_data["name"],
				"description": method_data["description"]
			}
			args = method_data["arg"] if "arg" in method_data else []
			method_res.update(
				script(method_data["file"], *args)
			)
			res.append(method_res)
	with open(json_file, 'w') as json_fp:
		res = json.dump(res, json_fp, indent='\t')

if __name__ == '__main__':
	main("../client-svelte/src/lib/data.json", SIMULATIONS_DATA, False)
	#main("./data.json", SIMULATIONS_DATA, False)
