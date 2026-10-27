type Level = "projet" | "formation" | "apprentissage";

const levelMeta: Record<Level, { label: string; className: string }> = {
  projet: { label: "Pratiqué en projet", className: "bg-emerald-300" },
  formation: { label: "Pratiqué en formation", className: "bg-sky-300" },
  apprentissage: { label: "En apprentissage", className: "bg-amber-300" },
};

type Skill = { name: string; level: Level };

const domains: { title: string; skills: Skill[] }[] = [
  {
    title: "Systèmes",
    skills: [
      { name: "Linux (Debian), administration de serveurs", level: "projet" },
      { name: "systemd, services et timers", level: "projet" },
      { name: "Windows Server, Active Directory, DNS, GPO", level: "formation" },
      { name: "Droits NTFS, partages, quotas", level: "formation" },
      { name: "PowerShell", level: "formation" },
      { name: "Virtualisation (VMware Workstation, Proxmox)", level: "projet" },
    ],
  },
  {
    title: "Réseau",
    skills: [
      { name: "IPv4, adressage, routage, NAT", level: "formation" },
      { name: "DNS, DHCP", level: "formation" },
      { name: "Pare-feu Linux", level: "formation" },
      { name: "VPN maillé (Tailscale), règles en refus par défaut", level: "projet" },
      { name: "Segmentation, VLAN", level: "apprentissage" },
    ],
  },
  {
    title: "Conteneurs et déploiement",
    skills: [
      { name: "Docker, Docker Compose", level: "projet" },
      { name: "Reverse proxy (Traefik, Nginx)", level: "projet" },
      { name: "CI/CD GitHub Actions", level: "projet" },
      { name: "Environnements DEV, TEST, PROD", level: "projet" },
      { name: "Ansible", level: "apprentissage" },
    ],
  },
  {
    title: "Exploitation et sécurité",
    skills: [
      { name: "Sauvegarde et restauration testée", level: "projet" },
      { name: "Cloisonnement des comptes et des accès", level: "projet" },
      { name: "Haute disponibilité applicative (plusieurs nœuds)", level: "projet" },
      { name: "Supervision Zabbix", level: "formation" },
      { name: "Durcissement de serveurs", level: "apprentissage" },
    ],
  },
  {
    title: "Bases de données",
    skills: [
      { name: "PostgreSQL, réplication en flux", level: "projet" },
      { name: "pgvector (recherche sémantique)", level: "projet" },
      { name: "SQL, MySQL, SQLite", level: "projet" },
    ],
  },
  {
    title: "IA et agentique",
    skills: [
      { name: "RAG, embeddings, recherche sémantique", level: "projet" },
      { name: "LLM locaux (Ollama)", level: "projet" },
      { name: "Agents Claude Code sur serveur", level: "projet" },
      { name: "Intégration d'API de LLM", level: "projet" },
    ],
  },
  {
    title: "Développement (socle BTS SIO SLAM)",
    skills: [
      { name: "Python, Bash", level: "projet" },
      { name: "TypeScript, React, Next.js", level: "projet" },
      { name: "Java, Spring Boot", level: "formation" },
      { name: "Git, GitHub", level: "projet" },
    ],
  },
];

const Skills = () => {
  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-white">Compétences</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          Un socle de développement acquis en BTS, tourné aujourd'hui vers
          l'administration systèmes et réseaux, le déploiement et
          l'exploitation. Chaque compétence indique où je l'ai pratiquée, pour
          distinguer ce que j'ai mis en œuvre de ce que j'apprends.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400" aria-label="Légende">
          {Object.values(levelMeta).map((meta) => (
            <li key={meta.label} className="flex items-center gap-2">
              <span aria-hidden="true" className={`h-2 w-2 rounded-full ${meta.className}`} />
              {meta.label}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {domains.map((domain) => (
          <div key={domain.title} className="rounded-2xl border border-white/10 bg-slateCard/60 p-6">
            <h2 className="text-lg font-semibold text-white">{domain.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {domain.skills.map((skill) => {
                const meta = levelMeta[skill.level];
                return (
                  <li key={skill.name} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${meta.className}`}
                    />
                    <span>
                      {skill.name}
                      <span className="sr-only"> ({meta.label})</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Skills;
