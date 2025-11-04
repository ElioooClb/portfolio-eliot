type Props = { title: string; desc: string; tags?: string[]; link?: string }

export default function ProjectCard({ title, desc, tags = [], link }: Props) {
  return (
    <li className="card">
      <h3>{title}</h3>
      <p>{desc}</p>
      {tags.length > 0 && (
        <div className="badges">
          {tags.map(tag => (
            <span key={tag} className="badge">{tag}</span>
          ))}
        </div>
      )}
      {link && (
        <p style={{ marginTop: 12 }}>
          <a href={link} target="_blank" rel="noreferrer">Voir le projet</a>
        </p>
      )}
    </li>
  )
}
