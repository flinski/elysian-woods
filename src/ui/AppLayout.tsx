import { Outlet } from 'react-router'

import Header from '@/ui/Header'
import Sidebar from '@/ui/Sidebar'
import Main from '@/ui/Main'
import Container from '@/ui/Container'

export default function AppLayout() {
	return (
		<div className="grid h-screen grid-cols-[17rem_1fr] grid-rows-[auto_1fr]">
			<Header />
			<Sidebar />
			<Main>
				<Container>
					<Outlet />
				</Container>
			</Main>
		</div>
	)
}
