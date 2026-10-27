# Portfolio Eliot Collomb

Portfolio évolutif : projets avec leur avancement réel, journal d'avancement, compétences, parcours et contact.

En ligne : https://elioooclb.github.io/portfolio-eliot/

## Stack

React 18, TypeScript, Vite 5, Tailwind CSS 3, react-router-dom 6 (`HashRouter`, adapté à GitHub Pages), lucide-react.

## Thème

Modes clair et sombre. Palette dans `src/index.css` (variables CSS : `:root` pour le clair, `.dark` pour le sombre), exposée à Tailwind par des jetons dans `tailwind.config.cjs` (`page`, `surface`, `surface2`, `line`, `fg`, `body`, `subtle`, `accent`). Le thème initial suit le choix enregistré, sinon la préférence du système (script dans `index.html`). Changer une couleur se fait dans `src/index.css`, sans toucher aux composants.

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
| `status` | Avancement : `planned`, `in_progress`, `completed`, `paused` |
| `statusNote` | Une phrase factuelle sur l'état actuel |
| `updatedAt` | Date de la dernière information vérifiée (`AAAA-MM-JJ`) |
| `group` | Section de la page Projets : `infraops`, `project`, `archive` |
| `steps` | Étapes, chacune `done`, `in_progress` ou `planned` |
| `skills` | Compétences travaillées : `name`, `detail` (ce qui a été fait concrètement), `upcoming` (pas encore pratiquée, affichée « À venir ») |
| `limits` | Limites connues |
| `featured` | Affiché sur l'accueil (groupe `project`) |
| `order` | Ordre d'affichage |

À chaque jalon : mettre à jour `status`, `steps`, `statusNote`, `updatedAt`, et retirer `upcoming` des compétences désormais pratiquées (en complétant leur `detail`).

### Le journal : `src/data/journal.json`

Une entrée par réalisation, décision, test ou incident résolu, la plus récente en haut. `type` : `decision`, `realisation`, `test`, `incident`. `projectId` facultatif, pour lier une fiche.

### La carte d'infrastructure : `src/data/topology.ts`

Page Infrastructure : carte 3D (React Three Fiber, chargée à la demande) et vue liste équivalente, alimentées par le même fichier.

- `infraGroups` : plateformes (OVHcloud, lab local, services externes), position et taille.
- `infraNodes` : machines, services et VM. `observation` est `{ state: "observed", date, source }` ou `{ state: "planned" }` : toujours datée, jamais présentée comme du temps réel. `host` rattache un service ou une VM à sa machine, `projectId` renvoie vers une fiche projet.
- `infraEdges` : flux, chacun `verified` (constaté lors d'un test daté), `documented` ou `planned`.
- `TOPOLOGY_OBSERVED_AT` : date du dernier inventaire, affichée sur la page.

Après chaque inventaire ou déploiement : mettre à jour les observations, passer les éléments déployés de `planned` à `observed`, ajuster les flux, puis `TOPOLOGY_OBSERVED_AT`. Jamais d'IP, de nom d'hôte, de port interne ni de chemin serveur dans ce fichier.

Lien direct vers un élément : `#/infrastructure?element=<id>`, vue liste : `?vue=liste`.

### Le site : `src/data/site.json`

`updatedAt` (date affichée sur l'accueil), `cvUpdated` (date du CV, à changer en même temps que `public/cv-eliot-collomb.pdf`).

## Règles

- **Dépôt public** : aucune adresse IP, aucun nom d'hôte interne, port interne, chemin serveur, secret ni donnée personnelle non validée.
- **Honnêteté** : aucun pourcentage, aucune métrique, aucune disponibilité inventés. Ce qui est prévu est présenté comme prévu, une démo hors ligne n'est pas liée.
