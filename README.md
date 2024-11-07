# The BnB Office

---
> - [Introduction](#introduction)
> - [How to](#how-to)
> - [Technical deployment](#technical-deployment)

## Introduction

---
The BnB Office est une application de réservation d'espaces de travail conçue pour optimiser l'utilisation des bureaux en mode flex office. Elle permet aux utilisateurs de réserver :

- Des places dans l'open space (8 places disponibles)
- Des salles de réunion spécifiques :
  - La Cuisine (espace convivial)
  - Matt&Klox (salle de réunion)
  - Thibs (salle de réunion)

L'application offre une interface intuitive avec une visualisation claire des disponibilités et un système de réservation simple.

## How to

---
### Réserver un espace

1. **Identification**
   - Entrez votre nom dans le champ en haut de l'écran
   - Votre nom sera sauvegardé pour vos prochaines visites

2. **Sélection de la date**
   - Choisissez la date souhaitée dans le calendrier
   - Les réservations existantes s'afficheront automatiquement

3. **Réservation**
   - Cliquez sur l'espace souhaité (place en open space ou salle)
   - Définissez l'heure de début et de fin
   - Confirmez la réservation

### Conseils
- Les places déjà réservées apparaissent en rouge
- Vous pouvez basculer entre le mode clair et sombre avec le bouton en haut à droite
- Consultez les réservations existantes avant de choisir votre créneau

## Technical deployment
### How to run with IntelliJ
- Install, `npm install`
- Run, `npm run dev`

### How to deploy on GitHub Pages
- Si pas déjà fait, `npm install gh-pages --save-dev`
- Build, `npm run build`
- Deploy on GitHub Pages, `npm run deploy`
- Go on https://github.com/Ma2t-Br/the-bnb-office/actions to check the deployment