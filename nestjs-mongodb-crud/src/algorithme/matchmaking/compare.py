import sys
import json
from haversine import haversine
import polyline
import numpy as np

SEUIL_CHEVAUCHEMENT = 0.05  # 50 mètres

def calculer_chevauchement_optimise(trajet1, trajet2):
    SEUIL_CHEVAUCHEMENT = 0.05  # 50 mètres
    points_chevauchants = 0
    # Optionnel : simplifiez les trajets ici pour réduire les calculs
    for point1 in trajet1:
        if any(haversine(point1, point2) <= SEUIL_CHEVAUCHEMENT for point2 in trajet2):
            points_chevauchants += 1
    pourcentage_chevauchement = (points_chevauchants / len(trajet1)) * 100
    return pourcentage_chevauchement

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python compare.py <trajet1 JSON> <trajet2 JSON>")
        sys.exit(1)

    try:
        trajet2 = json.loads(sys.argv[1])
        trajet1 = json.loads(sys.argv[2])
    except json.JSONDecodeError as e:
        print("Erreur de décodage JSON:", e)
        sys.exit(1)

    if not (isinstance(trajet1, list) and all(isinstance(item, list) and len(item) == 2 for item in trajet1)) or not (isinstance(trajet2, list) and all(isinstance(item, list) and len(item) == 2 for item in trajet2)):
        print("Erreur: Les trajets doivent être des listes de tuples [latitude, longitude].")
        sys.exit(1)

    chevauchement = calculer_chevauchement_optimise(trajet1, trajet2)
    print(json.dumps({"chevauchement": chevauchement}))
