export default function Projects() {
  return (
    <>
      <h2>Mes projets</h2>
      <ul className="cards">
        <li className="card">
          <h3>Référentiels fournisseurs (Laravel)</h3>
          <p>CRUD complet, imports massifs, règles d’intégrité. Contexte Olga — Data Management.</p>
          <div className="badges">
            <span className="badge">Laravel</span>
            <span className="badge">MariaDB</span>
            <span className="badge">CI/CD</span>
          </div>
        </li>

        <li className="card">
          <h3>Site vitrine WordPress</h3>
          <p>Thème enfant, CPT + ACF, optimisation perfs (cache, images, lazyload).</p>
          <div className="badges">
            <span className="badge">WordPress</span>
            <span className="badge">CPT/ACF</span>
            <span className="badge">SEO</span>
          </div>
        </li>

        <li className="card">
          <h3>Script Python — tri PDF</h3>
          <p>Automatisation du classement par regex + métadonnées. Journalisation & tests.</p>
          <div className="badges">
            <span className="badge">Python</span>
            <span className="badge">Automatisation</span>
          </div>
        </li>
      </ul>
    </>
  )
}
