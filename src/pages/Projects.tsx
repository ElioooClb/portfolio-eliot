import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  return (
    <>
      <h2>Mes projets</h2>
      <ul className="cards">
        <ProjectCard
          title="Référentiels fournisseurs (Laravel)"
          desc="CRUD, imports massifs, règles d’intégrité. Contexte Olga — Data Management."
          tags={['Laravel', 'MariaDB', 'CI/CD']}
        />

        <ProjectCard
          title="Site vitrine WordPress"
          desc="Thème enfant, CPT + ACF, optimisation perfs/SEO."
          tags={['WordPress', 'CPT/ACF', 'SEO']}
        />

        <ProjectCard
          title="Script Python — tri PDF"
          desc="Classement automatisé par regex + métadonnées, logs."
          tags={['Python', 'Automatisation']}
        />
      </ul>
    </>
  )
}
