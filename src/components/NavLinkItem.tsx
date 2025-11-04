import { NavLink } from 'react-router-dom'
import type { NavLinkProps } from 'react-router-dom'

export default function NavLinkItem(props: NavLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')}
    />
  )
}
