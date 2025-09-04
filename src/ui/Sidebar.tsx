import Logo from '@/ui/Logo'
import MainNav from '@/ui/MainNav'

export default function Sidebar() {
	return (
		<aside className="row-[1_/_-1] border-r-1 border-stone-200 bg-stone-50 px-6">
			<Logo />
			<MainNav />
		</aside>
	)
}
