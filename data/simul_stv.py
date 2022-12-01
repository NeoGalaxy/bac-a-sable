import csv
import matplotlib.pyplot as plt

def gen_results(file):
    candidates = set()
    distribution = {}
    disqualifications = []
    results = []
    blancs = [0]

    nb_votants = 0

    # Read data
    with open(file, newline='') as csvfile:
        reader = csv.DictReader(filter(lambda row: row[0]!='#', csvfile))
        for row in reader:
            voter_choice = []
            nb_votants += 1
            for candidate in row:
                if candidate in ["Voter", "official vote"] or row[candidate] == '':
                    continue
                i = int(row[candidate])
                if i >= len(voter_choice):
                    voter_choice += [None] * (i - len(voter_choice) + 1)
                voter_choice[i] = candidate
            if len(voter_choice) == 0:
                blancs[-1] += 1
            else:
                first_candidate = voter_choice.pop()
                assert first_candidate is not None
                if first_candidate not in distribution:
                    distribution[first_candidate] = []
                    candidates.add(first_candidate)
                distribution[first_candidate].append(voter_choice)
            

    # Compute winner
    print("nb votants: ", nb_votants)
    while True:
        results.append({c: len(distribution[c]) for c in distribution})
        if any(v >= nb_votants/2 for v in results[-1].values()): # fonctionne sûrement pas en borda4
            print("majorité trouvée")
            break
        if all(v == 0 for v in results[-1].values()):
            print("aucune majorité stricte trouvée")
            blancs.pop() # Sinon tout le monde vote blanc :/
            break
        disqual = min(
            (c for c in distribution if len(distribution[c]) != 0),
            key = lambda c: len(distribution[c])
        )
        disqualifications.append(disqual)
        #print(disqual, "disqualifié")
        blancs.append(0)
        for votes in distribution[disqual]:
            next_c = votes.pop()
            
            while next_c is not None and results[-1][next_c] == 0:
                next_c = votes.pop()

            assert disqual != next_c

            if next_c is None:
                blancs[-1] += 1
                continue
            if next_c not in distribution:
                distribution[next_c] = []
                candidates.add(next_c)
            distribution[next_c].append(votes)
        distribution[disqual] = []

    output = {
        "results": [
            {
                "name": c,
                "value": max(results[i][c] / nb_votants * 100 for i in range(len(results)))
            }
            for c in candidates
        ],
        "unit": "percent"
    }

    return output