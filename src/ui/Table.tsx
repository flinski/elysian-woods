type TableProps = {
	children: React.ReactNode
}

export default function Table({ children }: TableProps) {
	return (
		<div className="overflow-hidden rounded-md border-1 border-stone-200 bg-stone-50">
			{children}
		</div>
	)
}
