type MainProps = {
	children: React.ReactNode
}

export default function Main({ children }: MainProps) {
	return <main className="bg-stone-100 px-12 pt-10 pb-16">{children}</main>
}
