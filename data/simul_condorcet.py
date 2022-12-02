import csv
import matplotlib.pyplot as plt

def gen_results(file):
    candidates = set()
    duels = {}

    # Read data
    with open(file, newline='') as csvfile:
        reader = csv.DictReader(filter(lambda row: row[0]!='#', csvfile))
        for row in reader:
            winner = None
            for turn in row:
                if turn in ["Voter", "official vote"]:
                    continue
                if row[turn] == '':
                    break
                if winner == None:
                    winner = row[turn]
                else:
                    loser = row[turn]
                    key = (winner, loser) if winner < loser else (loser, winner)
                    if key not in duels:
                        candidates.add(winner)
                        candidates.add(loser)
                        duels[key] = 0
                    duels[key] += 1 if winner < loser else -1
                    winner = None

    results = {}
    nb_duels = {}
    for (candidate0, candidate1) in duels:
        if candidate0 not in results:
            results[candidate0] = 0
            nb_duels[candidate0] = 0
        if candidate1 not in results:
            results[candidate1] = 0
            nb_duels[candidate1] = 0

        nb_duels[candidate0] += 1
        nb_duels[candidate1] += 1

        if duels[(candidate0, candidate1)] > 0:
            results[candidate0] += 1
        elif duels[(candidate0, candidate1)] < 0:
            results[candidate1] += 1
        else:
            results[candidate0] += 0.5
            results[candidate1] += 0.5

    print(nb_duels)

    # Compute winner
    output = {
        "results": [
            {
                "name": c,
                "value": results[c] / nb_duels[c] * 100
            }
            for c in candidates
        ],
        "unit": "percent"
    }

    return output