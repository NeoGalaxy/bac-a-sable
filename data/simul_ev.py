import csv
import matplotlib.pyplot as plt

def gen_results(file, min_v = None):
    results = {}
    #nb_votants = 0
    max_value = 0
    #total_value = 0
    with open(file, newline='') as csvfile:
        reader = csv.DictReader(filter(lambda row: row[0]!='#', csvfile))
        for row in reader:
            #nb_votants += 1
            for candidate in row:
                if candidate in ["Voter", "official vote"]:
                    continue
                if candidate not in results:
                    results[candidate] = (0, 0)
                if row[candidate] != "":
                    val = int(row[candidate])
                else:
                    if min_v is None:
                        continue
                    else:
                        val = min_v

                (total, nb_votants) = results[candidate]
                results[candidate] = (total + val, nb_votants + 1)
                max_value = max(val, max_value)
                #total_value += val


    print(max_value, "---", "; ".join(str(results[c][1]) for c in results))
    output = {
        "results": [
            {
                "name": c,
                "value": results[c][0] / (results[c][1] * max_value) * 100
            }
            for c in results
        ],
        "unit": "percent"
    }

    return output