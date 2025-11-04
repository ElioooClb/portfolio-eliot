export default function Contact() {
  return (
    <>
      <h2>Contact</h2>
      <form action="https://formspree.io/f/xxxxxxxx" method="POST" className="card" style={{maxWidth:520}}>
        <label>Nom <input name="name" required /></label>
        <label>Email <input type="email" name="email" required /></label>
        <label>Message <textarea name="message" rows={5} required /></label>
        <button type="submit" className="navlink" style={{border:'1px solid var(--border)'}}>Envoyer</button>
      </form>
    </>
  )
}
