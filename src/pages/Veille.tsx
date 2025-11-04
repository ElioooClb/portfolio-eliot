export default function Veille() {
  return (
    <>
      <h2>Veille technologique</h2>
      <section className="card">
        <h3>IDE assistés par IA (Cursor, etc.)</h3>
        <p>Résumé, enjeux, frise chronologique, sources.</p>
        <ul className="badges"><li className="badge">Productivité</li><li className="badge">Qualité</li></ul>
      </section>
      <section className="card" style={{marginTop:16}}>
        <h3>Cybersécurité / NIS2</h3>
        <p>Impacts, obligations, pistes de mise en conformité.</p>
      </section>
    </>
  )
}
