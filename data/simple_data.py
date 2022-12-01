import csv
import json
import sys

descriptions = {
    "Approval": "Méthode de vote où les participants doivent indiquer s'ils sont favorables ou non au candidat, pour chaque candidat.",
    "Evaluation 0/1/2": "Méthode de vote où les participants doivent attribuer une note à chaque candidat, note allant de 0 à 2.",
    "Evaluation 0/1/2/3": "Méthode de vote où les participants doivent attribuer une note à chaque candidat, note allant de 0 à 3.",
    "Evaluation -1/0/1/2": "Méthode de vote où les participants doivent attribuer une note à chaque candidat, note allant de -1 à 2.",
    "Evaluation -1/0/1": "Méthode de vote où les participants doivent attribuer une note à chaque candidat, note allant de -1 à 1.",
    "Borda 4": "Méthode de vote où les participants doivent classer exactement 4 candidats.",
    "STV 4-11": "Méthode de vote où les participants doivent classer au moins 4 candidats.",
    "STV 1-11": "Méthode de vote où les participants doivent classer autant de candidats qu’ils le souhaitent.",
    "Evaluation Continuous": "Méthode de vote où les participants doivent attribuer une note à chaque candidat, note allant de 0 à 100. Les participants choisissent quels candidats ils décident d’évaluer.",
    "Condorcet": "Des paires aléatoires de candidats sont présentées aux participants. Pour chaque paire, ils doivent choisir qui, selon eux, était le meilleur candidat des deux.",
}

def main():
    results = []
    with open("./vote-counts.csv", newline='') as csv_file:
        reader = csv.DictReader(filter(lambda row: row[0] != '#', csv_file))
        for row in reader:
            ballot = row["Ballot Box"]
            results.append({
                "methodId": ballot.lower().replace(" ", "").replace("/", ""),
                "methodName": ballot,
                "unit": "PERCENT",
                "results": [],
                "description": descriptions[ballot]
            })
            
            i = -1
            for col in row:
                i += 1
                if i == 0:
                    continue
                if i > 11:
                    break
                total_voters = int(row["total number"]) - int(row["non répondu"]) - int(row["ne se prononce pas"]) - int(row["non inscrit"]) - int(row["abstention"]) - int(row["blanc"]) - int(row["incertitude"])
                results[-1]["results"].append({"name": col, "value": 100 * int(row[col]) / total_voters})

            results[-1]["results"].sort(key=lambda d: d["name"].split()[1])
    json.dump(results, sys.stdout)
        

"""
[
	{
		"methodId": "approval",
		"methodName": "Approval",
		"description":
			"Méthode de vote où les participants doivent indiquer s'ils étaient favorable ou non au candidat, pour chaque candidat.",
		"results": [
			{ "name": "Emmanuel Macron", "value": 13.61 },
			{ "name": "Marine Le Pen", "value": 1.57 },
			{ "name": "François Fillon", "value": 3.61 },
			{ "name": "Jean-Luc Mélenchon", "value": 25.16 },
			{ "name": "Benoît Hamon", "value": 23.92 },
			{ "name": "Nathalie Arthaud", "value": 7.07 },
			{ "name": "Philippe Poutou", "value": 13.55 },
			{ "name": "Jacques Cheminade", "value": 2.01 },
			{ "name": "François Asselineau", "value": 2.44 },
			{ "name": "Nicolas Dupont-Aignan", "value": 3.09 },
			{ "name": "Jean Lassalle", "value": 3.97 }
		],
		"unit": "PERCENT"
	},
   
"""
        

if __name__ == "__main__":
    main()