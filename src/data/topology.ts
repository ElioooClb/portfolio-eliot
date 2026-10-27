import type { InfraEdge, InfraEdgeCategory, InfraGroup, InfraNode } from "../types";

// Carte statique de l'infrastructure, mise à jour à la main après chaque
// inventaire. Dépôt public : aucune adresse IP, aucun nom d'hôte, aucun port
// interne, aucun chemin serveur. Les observations sont datées et ne décrivent
// jamais un état en temps réel.

export const TOPOLOGY_OBSERVED_AT = "2026-10-27";

const INVENTAIRE = "inventaire manuel";

export const infraGroups: InfraGroup[] = [
  {
    id: "ovh",
    label: "OVHcloud",
    detail: "Deux VPS Debian 13, reliés par un réseau privé chiffré (Tailscale)",
    center: [3.5, 0],
    size: [15, 7],
  },
  {
    id: "local",
    label: "Lab local",
    detail: "Poste de travail et machines virtuelles VMware Workstation",
    center: [-8.2, 0.1],
    size: [7.2, 7],
  },
  {
    id: "external",
    label: "Services externes",
    detail: "Code, intégration continue et hébergement du portfolio",
    center: [7, -7.4],
    size: [7.2, 3],
  },
];

const declaredNodes: InfraNode[] = [
  {
    id: "knowledge",
    label: "Serveur de connaissances",
    type: "vps",
    model: "server",
    units: 2,
    group: "ovh",
    role: "Héberge la base de connaissances RAG de mes notes et ses sauvegardes.",
    details: ["VPS Debian 13, 2 vCPU, 4 Go de RAM", "Seul SSH est exposé sur Internet (clé uniquement)", "API publiée uniquement dans le réseau privé"],
    observation: { state: "observed", date: "2026-10-27", source: INVENTAIRE },
    position: [-0.2, 0, 1.6],
    projectId: "plateforme-jarvis",
  },
  {
    id: "rag",
    label: "Base de connaissances RAG",
    shortLabel: "Recherche RAG",
    type: "service",
    model: "database",
    group: "ovh",
    role: "Recherche sémantique dans plus de 400 notes de cours et de projets.",
    details: ["API FastAPI en lecture seule, protégée par clé", "PostgreSQL avec pgvector", "Embeddings calculés en local par Ollama", "Réindexation automatique à chaque push du vault"],
    observation: { state: "observed", date: "2026-10-27", source: INVENTAIRE },
    position: [-1.6, 0, -1.6],
    host: "knowledge",
    projectId: "plateforme-jarvis",
  },
  {
    id: "backups",
    label: "Sauvegardes",
    type: "service",
    model: "backup",
    group: "ovh",
    role: "Sauvegarde quotidienne de la base et du dépôt Git du vault.",
    details: ["Rétention : 7 quotidiennes, 4 hebdomadaires, 3 mensuelles", "Copie hebdomadaire vers mon poste, vérifiée par SHA-256", "Restauration testée le 27/10/2026"],
    observation: { state: "observed", date: "2026-10-27", source: INVENTAIRE },
    position: [1.4, 0, -1.6],
    host: "knowledge",
    projectId: "plateforme-jarvis",
  },
  {
    id: "hermes",
    label: "Serveur d'agents",
    type: "vps",
    model: "server",
    units: 3,
    group: "ovh",
    role: "Exécute mes agents serveur et accueillera la plateforme de déploiement d'InfraOps Lab.",
    details: ["VPS Debian 13, 6 vCPU, 12 Go de RAM", "Seul SSH est exposé sur Internet (clé uniquement)", "Docker prêt, aucun conteneur pour l'instant"],
    observation: { state: "observed", date: "2026-10-27", source: INVENTAIRE },
    position: [7, 0, 1.6],
    projectId: "plateforme-jarvis",
  },
  {
    id: "agents",
    label: "Agents Claude Code",
    shortLabel: "Agents IA",
    type: "service",
    model: "agent",
    group: "ovh",
    role: "Agent d'audit de sécurité statique de mes dépôts, appelable depuis mon PC et mon téléphone.",
    details: ["Utilisateur dédié, sans sudo ni accès à Docker", "Rapports publiés dans ma base de notes"],
    observation: { state: "observed", date: "2026-10-27", source: INVENTAIRE },
    position: [4.6, 0, -1.6],
    host: "hermes",
    projectId: "plateforme-jarvis",
  },
  {
    id: "deploy",
    label: "Plateforme de déploiement",
    shortLabel: "Déploiement",
    type: "service",
    model: "containers",
    group: "ovh",
    role: "Application de démonstration déployée par Ansible, Docker Compose et GitHub Actions.",
    details: ["Staging et production séparés", "Contrôles de santé et retour arrière"],
    observation: { state: "planned" },
    position: [7, 0, -2.2],
    host: "hermes",
    projectId: "cloudops-platform",
  },
  {
    id: "monitoring",
    label: "Supervision Zabbix",
    shortLabel: "Supervision",
    type: "service",
    model: "monitoring",
    group: "ovh",
    role: "Métriques, contrôles HTTP et alertes sur les serveurs et le lab.",
    details: ["Incidents simulés traités de bout en bout"],
    observation: { state: "planned" },
    position: [9.4, 0, -1.6],
    host: "hermes",
    projectId: "secops-observability",
  },
  {
    id: "pc",
    label: "Poste de travail",
    type: "workstation",
    model: "laptop",
    group: "local",
    role: "Administration des serveurs, hôte du lab VMware et copie de sécurité des sauvegardes. Les machines du lab ne tournent que lorsqu'il est allumé.",
    details: ["Windows, VMware Workstation, 16 Go de RAM", "Reçoit chaque semaine une copie vérifiée des sauvegardes"],
    observation: { state: "observed", date: "2026-10-27", source: INVENTAIRE },
    position: [-8.2, 0, 1.8],
  },
  {
    id: "vm-winserver",
    label: "Windows Server 2025",
    shortLabel: "Windows Server",
    type: "vm",
    model: "vm-windows-server",
    group: "local",
    role: "Contrôleur de domaine : Active Directory, DNS, DHCP, stratégies de groupe.",
    details: ["Machine virtuelle du lab"],
    observation: { state: "planned" },
    position: [-10.5, 0, -1.6],
    host: "pc",
    projectId: "enterprise-network-lab",
  },
  {
    id: "vm-router",
    label: "Routeur VyOS",
    shortLabel: "Routeur",
    type: "vm",
    model: "vm-router",
    group: "local",
    role: "Passerelle du lab : relie le réseau des serveurs et celui des postes clients, et leur donne accès à Internet.",
    details: [
      "VyOS, 1 vCPU, 1 Go de RAM",
      "Routage entre deux réseaux isolés, NAT vers Internet, relais DNS",
      "Administration SSH par clé, configuration versionnée",
      "Pare-feu entre réseaux : à venir",
    ],
    observation: { state: "observed", date: "2026-10-27", source: "construction du lab" },
    position: [-10.6, 0, 1.4],
    host: "pc",
    projectId: "enterprise-network-lab",
  },
  {
    id: "vm-debian",
    label: "Serveur Debian",
    shortLabel: "Debian",
    type: "vm",
    model: "vm-debian",
    group: "local",
    role: "Serveur Linux du lab : services réseau et automatisation.",
    details: [
      "Debian 13 sans interface graphique, 2 Go de RAM",
      "Réseau des serveurs, sortie vers Internet par le routeur",
      "Connexion SSH par clé uniquement, mot de passe refusé",
    ],
    observation: { state: "observed", date: "2026-10-27", source: "construction du lab" },
    position: [-8.2, 0, -2.2],
    host: "pc",
    projectId: "enterprise-network-lab",
  },
  {
    id: "vm-rocky",
    label: "Serveur Rocky Linux",
    shortLabel: "Rocky Linux",
    type: "vm",
    model: "vm-linux",
    group: "local",
    role: "Seconde famille Linux (Red Hat) du lab, cible des playbooks Ansible.",
    details: ["Machine virtuelle du lab"],
    observation: { state: "planned" },
    position: [-5.9, 0, 1.4],
    host: "pc",
    projectId: "enterprise-network-lab",
  },
  {
    id: "vm-client",
    label: "Client Windows",
    type: "vm",
    model: "vm-windows-client",
    group: "local",
    role: "Poste utilisateur membre du domaine, pour tester droits, partages et flux.",
    details: ["Machine virtuelle du lab"],
    observation: { state: "planned" },
    position: [-5.9, 0, -1.6],
    host: "pc",
    projectId: "enterprise-network-lab",
  },
  {
    id: "github",
    label: "GitHub",
    type: "external",
    model: "cloud",
    group: "external",
    role: "Code source, intégration continue et déploiement.",
    details: ["Dépôts publics et privés", "GitHub Actions"],
    observation: { state: "observed", date: "2026-10-27", source: "déploiement du portfolio" },
    position: [5.4, 0, -7.4],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    type: "external",
    model: "browser",
    group: "external",
    role: "Ce site, hébergé sur GitHub Pages et redéployé à chaque publication.",
    details: ["React, TypeScript, Vite, Tailwind CSS"],
    observation: { state: "observed", date: "2026-10-27", source: "déploiement du portfolio" },
    position: [8.6, 0, -7.4],
  },
];

const declaredEdges: InfraEdge[] = [
  { from: "pc", to: "hermes", label: "Administration SSH", short: "SSH", category: "admin", state: "verified" },
  { from: "pc", to: "knowledge", label: "Administration SSH et push du vault", short: "SSH, push du vault", category: "admin", state: "verified" },
  { from: "pc", to: "rag", label: "Recherche dans mes notes (réseau privé)", short: "Recherche", category: "data", state: "verified" },
  { from: "backups", to: "pc", label: "Copie hebdomadaire vérifiée", short: "Copie hebdo", category: "backup", state: "verified" },
  { from: "agents", to: "rag", label: "Contexte des notes (réseau privé)", short: "Contexte", category: "data", state: "documented" },
  { from: "agents", to: "github", label: "Lecture des dépôts à auditer", short: "Lecture des dépôts", category: "data", state: "documented" },
  { from: "github", to: "portfolio", label: "Déploiement automatique", short: "Déploiement", category: "deploy", state: "verified" },
  { from: "github", to: "deploy", label: "Pipeline CI/CD", short: "CI/CD", category: "deploy", state: "planned" },
  { from: "monitoring", to: "knowledge", label: "Supervision (agent léger)", short: "Supervision", category: "monitoring", state: "planned" },
  { from: "pc", to: "vm-router", label: "Administration SSH par clé", short: "SSH", category: "admin", state: "verified" },
  { from: "pc", to: "vm-debian", label: "Administration SSH par clé, via le routeur", short: "SSH (rebond)", category: "admin", state: "verified" },
  { from: "vm-debian", to: "vm-router", label: "Accès Internet (NAT) et relais DNS", short: "NAT, DNS", category: "data", state: "verified" },
  { from: "vm-client", to: "vm-winserver", label: "Authentification, DNS", short: "Auth, DNS", category: "data", state: "planned" },
  { from: "vm-debian", to: "vm-winserver", label: "Résolution DNS", short: "DNS", category: "data", state: "planned" },
];

// --- Contrôle de cohérence ---------------------------------------------------
// TypeScript vérifie les types, modèles, plateformes et catégories, mais pas
// les identifiants qui se référencent entre eux. Une incohérence (id en
// double, flux ou hôte vers un id inexistant) est signalée sur la page en
// développement ; en production, l'élément fautif est ignoré pour que la
// page ne casse jamais.

export const topologyProblems: string[] = [];

const knownIds = new Set<string>();
const uniqueNodes = declaredNodes.filter((node) => {
  if (knownIds.has(node.id)) {
    topologyProblems.push(`Identifiant en double : « ${node.id} » (seule la première déclaration est gardée)`);
    return false;
  }
  knownIds.add(node.id);
  return true;
});

export const infraNodes: InfraNode[] = uniqueNodes.filter((node) => {
  if (node.host && !knownIds.has(node.host)) {
    topologyProblems.push(`« ${node.id} » : hôte inconnu « ${node.host} » (élément ignoré)`);
    return false;
  }
  return true;
});

const displayedIds = new Set(infraNodes.map((node) => node.id));
export const infraEdges: InfraEdge[] = declaredEdges.filter((edge) => {
  const missing = [edge.from, edge.to].filter((id) => !displayedIds.has(id));
  if (missing.length > 0) {
    topologyProblems.push(`Flux « ${edge.from} → ${edge.to} » : élément inconnu « ${missing.join(", ")} » (flux ignoré)`);
    return false;
  }
  return true;
});

if (topologyProblems.length > 0) {
  console.warn(`Carte d'infrastructure : ${topologyProblems.length} incohérence(s)`, topologyProblems);
}

export const edgeCategoryLabel: Record<InfraEdgeCategory, string> = {
  admin: "Administration",
  data: "Données et services",
  backup: "Sauvegarde",
  deploy: "Déploiement",
  monitoring: "Supervision",
};

export const edgeStateLabel: Record<InfraEdge["state"], string> = {
  verified: "Vérifié",
  documented: "Documenté",
  planned: "Prévu",
};
