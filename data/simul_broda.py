import csv
import matplotlib.pyplot as plt

def gen_results(file):
    results = {}
    nb_votants = 0
    with open(file, newline='') as csvfile:
        reader = csv.DictReader(filter(lambda row: row[0]!='#', csvfile))
        for row in reader:
            nb_votants += 1
            for candidate in row:
                if candidate in ["Voter", "official vote"]:
                    continue
                if candidate not in results:
                    results[candidate] = [0] * 11
                if row[candidate] != "":
                    results[candidate][11 - int(row[candidate])] += int(row[candidate])

    output = {
        "results": [
            {
                "name": c,
                # On divise par nb_votants * 11 en plus car la valeur max qu'un candidat peut avoir est nb_votants * 11
                "value": sum(results[c]) / (nb_votants * 11) * 100
            }
            for c in results
        ],
        "unit": "percent"
    }

    return output