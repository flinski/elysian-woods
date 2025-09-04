import { NavLink } from 'react-router'
import { Calendar, House, School, Settings, Users } from 'lucide-react'

const navItems = [
	{ to: '/dashboard', icon: House, text: 'Home' },
	{ to: '/bookings', icon: Calendar, text: 'Bookings' },
	{ to: '/cabins', icon: School, text: 'Cabins' },
	{ to: '/users', icon: Users, text: 'Users' },
	{ to: '/settings', icon: Settings, text: 'Settings' },
]

export default function MainNav() {
	return (
		<nav>
			<ul className="flex flex-col gap-1">
				{navItems.map(({ to, icon: Icon, text }) => (
					<li key={to}>
						<NavLink
							to={to}
							className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
						>
							<Icon size={20} className="shrink-0" />
							<span>{text}</span>
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	)
}
