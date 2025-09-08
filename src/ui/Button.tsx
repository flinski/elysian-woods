type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode
	variation?: 'primary' | 'secondary' | 'danger'
}

export default function Button({ children, variation = 'primary', ...props }: ButtonProps) {
	const primaryStyles =
		'text-matcha-50 bg-matcha-500 py-2 px-4 rounded-sm cursor-pointer font-medium disabled:opacity-50 border-1 border-transparent'
	const secondaryStyles =
		' bg-stone-100 py-2 px-4 rounded-sm cursor-pointer border-1 border-stone-200 disabled:opacity-50'
	const dangerStyles = ''

	const styles =
		variation === 'primary'
			? primaryStyles
			: variation === 'secondary'
				? secondaryStyles
				: dangerStyles

	return (
		<button {...props} className={styles}>
			{children}
		</button>
	)
}
