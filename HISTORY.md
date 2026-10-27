# HISTORY : portfolio

> Journal synthétique, le plus récent en haut.

## 2026-10-27 : lab local, étapes 1 et 2 (branche `lab-local-etapes-1-2`)

- Carte : routeur VyOS ajouté et serveur Debian passé en « observé » (construction du lab du 27/10), serveur Rocky Linux ajouté en « prévu », trois flux vérifiés (SSH vers le routeur, SSH par rebond vers Debian, NAT et relais DNS). Deux modèles 3D : `vm-router` (flèches opposées) et `vm-linux` (invite de commande). 15 éléments, 14 flux.
- Fiche Enterprise Network Lab : statut, compétences (virtualisation, administration Linux et SSH, routage), étapes et stack mis à jour. Contrôleur de domaine en « Planifié ». Entrée de journal.
- Aucune adresse, aucun nom d'hôte ni nom de domaine interne (vérifié par recherche dans `src/`).

## 2026-10-27 : lot B, explorateur d'infrastructure 3D

- Page Infrastructure : carte 3D statique (React Three Fiber 8, drei 9, three 0.172), chargée à la demande (~240 Ko compressés, l'accueil reste à ~74 Ko), vue liste équivalente au clavier, panneau de détail (rôle, observation datée, flux, projet), lien partageable, repli automatique sans WebGL. Couleurs du thème actif, caméra adaptée aux cadres étroits.
- Données dans `src/data/topology.ts`, tirées des inventaires du 27/10 : 13 éléments, 11 flux (vérifiés, documentés ou prévus), aucune donnée sensible.
- Vérifié par captures headless (Edge) en clair, en sombre, avec sélection et en vue liste. Défauts corrigés au passage : traits parasites des plateformes arrondies, étiquettes qui se chevauchaient, cadrage, configuration de caméra réappliquée à chaque redimensionnement.
- Retours d'Elio (rendu trop géométrique, éléments trop proches, flux peu clairs) : modèles reconnaissables construits en primitives (serveurs en baie, portable, écrans de VM avec logo, base de données, archive, robot, conteneurs, supervision, nuage, navigateur), disposition aérée sur toute la largeur, panneau de détail en surimpression (côté opposé à l'élément, bouton Fermer), flux colorés par catégorie avec flèche de direction, libellés courts placés sans chevauchement (calcul à l'écran), survol d'un flux, filtres par catégorie, sélection d'un serveur étendue aux flux de ses services, éléments prévus en teinte « plan », vue liste par défaut sur petit écran. Interrupteurs « Afficher les flux » et « Afficher les noms » (aussi dans l'adresse : `?flux=masques`, `?noms=masques`).
- Robustesse aux ajouts : caméra cadrée automatiquement sur l'emprise des éléments, contrôle de cohérence des identifiants (bandeau en développement, élément fautif ignoré en production). Testé avec un élément hors emprise, un flux vers un id inexistant et un id en double, puis données de test retirées. Guide « Ajouter un élément » dans le README.
- React Router 6.30.3 → 6.30.6 (avis de sécurité). Deux avis modérés restent ouverts (correctif en React Router 7), à traiter au lot C.

## 2026-10-27 : refonte V1, lot A (branche `refonte-v1`)

- `node_modules/`, `dist/` et `*.tsbuildinfo` retirés du suivi git (ajoutés avant le `.gitignore`).
- Nouveau positionnement (systèmes, réseaux et Cloud/DevOps, recherche d'alternance), modèle de données avec statuts d'avancement datés, pages Journal et Parcours, Compétences réécrites avec niveau de preuve, CV et Contact regroupés, dossiers E5/E6 déplacés dans Parcours (anciennes adresses redirigées).
- Projets : trois volets d'InfraOps Lab, Plateforme Jarvis, MediBox (part d'Elio uniquement), NovetIA en archive. Projets BTS retirés des fiches (couverts par les dossiers E5/E6), démos hors ligne retirées.
- Retours d'Elio : CV d'octobre 2026 publié (parcours aligné dessus), NovetIA présenté comme terminé (démo réalisée et présentée) avec une fiche détaillée tirée de son README, palette plus chaleureuse (neutres chauds, accent cuivre) avec modes clair et sombre.
- Statuts limités à quatre (« En pause » en orange pour le distinguer de « Planifié »), compétences sans niveau « en apprentissage ». Lot A fusionné dans `main` et publié le 27/10.
- Après publication : section « Prochain objectif » retirée de l'accueil. Fiches projets : « Points clés » et « Ce que j'en retiens » remplacés par « Compétences travaillées » (ce qui a été fait concrètement pour chaque compétence, « À venir » si pas encore pratiquée, « Compétences visées » pour un projet planifié).
- Suivants : lot B (explorateur d'infrastructure 3D statique), lot C (finitions).
