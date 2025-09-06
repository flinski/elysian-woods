type TableHeaderProps = {
	children: React.ReactNode
}

export default function TableHeader({ children }: TableHeaderProps) {
	return (
		<header className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] gap-x-6 border-b-1 border-stone-200 px-2 py-4 font-medium text-stone-700 uppercase">
			{children}
		</header>
	)
}
