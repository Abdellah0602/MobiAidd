from haversine import haversine
import polyline
import numpy as np

# Exemple de deux séquences de points
trajet2 = polyline.decode("{vbiHg}}NA??NL~NB`B@jB@|A@tA@~@@hAD~AD`ADz@FbAFx@Fx@Fp@Hx@Hn@Hx@Fn@J|@Ht@J~@LnAP|ALrAJ~@Jz@Fl@Fp@Ft@Fp@Dn@Dp@Dp@Dv@Bn@Bv@@r@Bz@?z@@|@?~@Ar@?t@Cr@Ar@Ap@Cp@Et@Ex@GfAG`AEr@I|@GpAIdAGhAKtAGfAIjAGbAGz@GbAG|@G~@Ez@Ex@IfAGv@Et@G~@Ev@Ep@Gx@InAGnAEjAEz@Cx@Ax@Ct@At@Ar@ApAAdA?fA?x@@t@@bABhBBbABhAF`BLvCLtCLnCDrAFhAHhBDx@@XJzBJhCHjBF~AFnAFzAJxBFtADbAFzAFjAFpAFtAFfAHhAHlAJnAJrAf@hFRtBTbCJhAL~ANvBH|AFlADbAHtBJrBJzBLtCJbCD|ABlABvA@|A@~B@zC?pC?tB@|C@~E?pD@rD?dDBvB?`CBbJ?rH@`MBbPNzg@BzK?dD@~C?lA?zAEdBEnAGjAOzAS`BSlAWlA[lA]hAo@bBUh@Wf@c@t@_@l@[b@_@d@sA|Ao@n@k@l@kAnA_AfA{@|@o@t@c@d@e@h@eDlDq@t@k@r@u@dAa@n@_@n@S^Q`@Wh@Q`@O^a@`AYt@g@nAWn@k@vA[v@e@jAc@dAYt@g@nAi@nAYv@]x@Wl@[r@S^]p@_@p@Yf@[f@Yb@U\\W\\m@v@]b@o@r@}@~@y@v@g@d@a@Zw@n@eAx@{BfBaAx@SPMLOLOPSTSTQTQVKNQXU`@SZO\\O\\Yr@Un@Qh@Ur@Sx@Qv@Q~@O`AQrAMzAMzAGbAGdAGv@Gt@Gx@Et@Gx@Gr@Cb@Ej@KlAIpAMfBItAGl@Ep@InAKlAG~@Et@Gv@G`AM~AGnAGlACnACdAAzA@dA@bA@x@Bv@Br@Bn@Bb@Bd@Df@Fp@Dd@Hv@J~@Lx@Hn@Lr@Nx@Nx@Rz@Nl@Tx@Nh@Nf@Rj@Rj@Rj@Rf@P^Tf@\\r@\\r@Zl@^t@f@bAd@`AZl@`DvG?B~@pBrf@|cAlEnK~BzFd@bB`AzEdAlGh@lFX`F\\nKFrJAzF?RAREl@a@zBa@tCq@bFwC|X{BlUShCq@|Hi@xHYfH[~OQnO_A`w@Aj@KbI@jDFdDJ|BNlBFz@Hl@J`AN`ALz@Nz@Nt@R~@Rv@Nn@Pn@\\dATp@JXfD~IhB~EN^L\\d@rAfAfDXv@Rt@FVDRBVBV?X@\\ApB?h@eBze@_AdWe@xKInBOfCKfBIvACTI^Mj@GXIVOZi@dAo@jAcDzFyA`C[h@Yd@y@lAe@j@S^Wl@U~@UxAQzAMfCCr@APAXAx@Cp@Er@Gb@EROhAOnAWnBQzAOvAQhBGlAGrAEtB@xBBfBD`BFdAJhAL|@TjA\\vAj@hBp@`Bl@fA~@tA~@~@fA|@lBjAxD~BfEjCt@j@p@p@r@|@bA`B|@bCd@jBTrALdAJfAFhADfA@bA?tAC`ACv@KjAOlA[pAIZgBwA")
trajet1 = polyline.decode("csbiHs|vN@?JzBJhCHjBF~AFnAFzAJxBFtADbAFzAFjAFpAFtAFfAHhAHlAJnAJrAf@hFRtBTbCJhAL~ANvBH|AFlADbAHtBJrBJzBLtCJbCD|ABlABvA@|A@~B@zC?pC?tB@|C@~E?pD@rD?dDBvB?`CBbJ?rH@`MBbPNzg@BzK?dD@~C?lA?zAEdBEnAGjAOzAS`BSlAWlA[lA]hAo@bBUh@Wf@c@t@_@l@[b@_@d@sA|Ao@n@k@l@kAnA_AfA{@|@o@t@c@d@e@h@IH{CbDq@t@k@r@u@dAa@n@_@n@S^Q`@Wh@Q`@O^a@`AYt@g@nAWn@k@vA[v@e@jAc@dAYt@g@nAi@nAYv@]x@Wl@[r@S^]p@_@p@Yf@[f@Yb@U\\W\\m@v@]b@o@r@}@~@y@v@g@d@a@Zw@n@eAx@{BfBaAx@SPMLOLOPSTSTQTQVKNQXU`@SZO\\O\\Yr@Un@Qh@Ur@Sx@Qv@Q~@O`AQrAMzAMzAGbAGdAGv@Gt@Gx@Et@Gx@Gr@Cb@Ej@KlAIpAMfBItAGl@Ep@InAKlAG~@Et@Gv@G`AM~AGnAGlACnACdAAzA@dA@bA@x@Bv@Br@Bn@Bb@Bd@Df@Fp@Dd@Hv@J~@Lx@Hn@Lr@Nx@Nx@Rz@Nl@Tx@Nh@Nf@Rj@Rj@Rj@Rf@P^Tf@\\r@\\r@Zl@^t@f@bAd@`AZl@`DvG?B~@pBrf@|cAlEnK~BzFd@bB`AzEdAlGh@lFX`F\\nKFrJAzF?RAREl@a@zBa@tCq@bFwC|X{BlUShCq@|Hi@xHYfH[~OQnO_A`w@Aj@KbI@jDFdDJ|BNlBFz@Hl@J`AN`ALz@Nz@Nt@R~@Rv@Nn@Pn@\\dATp@JXfD~IhB~EN^L\\d@rAfAfDXv@Rt@FVDRBVBV?X@\\ApB?h@eBze@_AdWe@xKInBOfCKfBIvACTI^Mj@GXIVOZi@dAo@jAcDzFyA`C[h@Yd@y@lAe@j@S^Wl@U~@UxAQzAMfCCr@APAXAx@Cp@Er@Gb@EROhAOnAWnBQzAOvAQhBGlAGrAEtB@xBBfBD`BFdAJhAL|@TjA\\vAj@hBp@`Bl@fA~@tA~@~@fA|@lBjAxD~BfEjCt@j@p@p@r@|@bA`B|@bCd@jBTrALdAJfAFhADfA@bA?tAC`ACv@KjAOlA[pAIZgBwA")

# Assurez-vous d'ajuster le seuil basé sur la précision GPS et le contexte urbain
SEUIL_CHEVAUCHEMENT = 0.05  # 50 mètres

def calculer_chevauchement_optimise(trajet1, trajet2):
    points_chevauchants = 0
    # Optionnel : simplifiez les trajets ici pour réduire les calculs
    for point1 in trajet1:
        if any(haversine(point1, point2) <= SEUIL_CHEVAUCHEMENT for point2 in trajet2):
            points_chevauchants += 1
    pourcentage_chevauchement = (points_chevauchants / len(trajet1)) * 100
    return pourcentage_chevauchement



def calculer_angle(vecteur1, vecteur2):
    unit_vector_1 = vecteur1 / np.linalg.norm(vecteur1)
    unit_vector_2 = vecteur2 / np.linalg.norm(vecteur2)
    dot_product = np.dot(unit_vector_1, unit_vector_2)
    angle = np.arccos(dot_product)
    return np.degrees(angle)

def comparer_direction(trajet1, trajet2):
    vecteur1 = np.array(trajet1[-1]) - np.array(trajet1[0])  # Vecteur du trajet1
    vecteur2 = np.array(trajet2[-1]) - np.array(trajet2[0])  # Vecteur du trajet2
    angle = calculer_angle(vecteur1, vecteur2)
    return angle

# Utilisez comparer_direction pour vérifier si deux trajets vont dans le même sens
angle_entre_trajets = comparer_direction(trajet1, trajet2)
if angle_entre_trajets < 30:  # Trajets grosso modo dans le même sens
    print("Trajets dans le même sens")

    chevauchement = calculer_chevauchement_optimise(trajet1, trajet2)
    print(f"Pourcentage de chevauchement: {chevauchement}%")
    
elif abs(angle_entre_trajets - 180) < 30:  # Trajets dans des sens opposés
    print("Trajets dans des sens opposés")