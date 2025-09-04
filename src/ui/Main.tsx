type MainProps = {
	children: React.ReactNode
}

export default function Main({ children }: MainProps) {
	return <main className="bg-stone-100">{children}</main>
}
