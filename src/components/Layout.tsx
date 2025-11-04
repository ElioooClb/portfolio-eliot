import { Outlet } from 'react-router-dom'
import NavLinkItem from './NavLinkItem'

export default function Layout() {
  return (
    <>
      <header>
        <div className="wrap top">
          <h1 className="brand">
            Eliot Collomb <small>— Portfolio BTS SIO (SLAM)</small>
          </h1>
          <nav className="nav">
            <NavLinkItem to="/">Accueil</NavLinkItem>
            <NavLinkItem to="/projets">Projets</NavLinkItem>
            <NavLinkItem to="/veille">Veille</NavLinkItem>
            <NavLinkItem to="/cv">CV</NavLinkItem>
            <NavLinkItem to="/contact">Contact</NavLinkItem>
          </nav>
        </div>
      </header>

      <main className="wrap">
        <Outlet />
      </main>

      <footer className="wrap small">© {new Date().getFullYear()} Eliot Collomb</footer>
    </>
  )
}
