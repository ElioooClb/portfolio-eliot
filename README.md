# Portfolio Eliot Collomb

Portfolio évolutif : projets avec leur avancement réel, journal d'avancement, compétences, parcours et contact.

En ligne : https://elioooclb.github.io/portfolio-eliot/

## Stack

React 18, TypeScript, Vite 5, Tailwind CSS 3, react-router-dom 6 (`HashRouter`, adapté à GitHub Pages), lucide-react.

## Développement

```bash
npm ci
npm run dev       # serveur local
npm run build     # vérification des types puis build dans dist/
npm run preview   # sert le build localement
```

## Déploiement

Automatique à chaque push sur `main` : `.github/workflows/deploy.yml` (Node 20, `npm ci`, `npm run build`, GitHub Pages). Travailler sur une branche et ne fusionner dans `main` qu'une version validée.

## Mettre à jour le contenu

Tout le contenu évolutif vit dans `src/data/`, sans toucher au code.

### Un projet : `src/data/projects.json`

| Champ | Rôle |
|---|---|
| `status` | Avancement : `planned`, `preparation`, `in_progress`, `completed`, `paused`, `abandoned` |
| `statusNote` | Une phrase factuelle sur l'état actuel |
| `updatedAt` | Date de la dernière information vérifiée (`AAAA-MM-JJ`) |
| `group` | Section de la page Projets : `infraops`, `project`, `archive` |
| `steps` | Étapes, chacune `done`, `in_progress` ou `planned` |
| `highlights`, `learnings`, `limits` | Points clés, enseignements, limites connues |
| `featured` | Affiché sur l'accueil (groupe `project`) |
| `order` | Ordre d'affichage |

À chaque jalon : mettre à jour `status`, `steps`, `statusNote` et `updatedAt`.

### Le journal : `src/data/journal.json`

Une entrée par réalisation, décision, test ou incident résolu, la plus récente en haut. `type` : `decision`, `realisation`, `test`, `incident`. `projectId` facultatif, pour lier une fiche.

### Le site : `src/data/site.json`

`updatedAt` (date affichée sur l'accueil), `nextGoal` (prochain objectif), `cvUpdated` (date du CV, à changer en même temps que `public/cv-eliot-collomb.pdf`).

## Règles

- **Dépôt public** : aucune adresse IP, aucun nom d'hôte interne, port interne, chemin serveur, secret ni donnée personnelle non validée.
- **Honnêteté** : aucun pourcentage, aucune métrique, aucune disponibilité inventés. Ce qui est prévu est présenté comme prévu, une démo hors ligne n'est pas liée.
