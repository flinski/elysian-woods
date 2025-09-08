type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode
	variation?: 'primary' | 'secondary' | 'danger'
}

export default function Button({ children, variation = 'primary', ...props }: ButtonProps) {
	const primaryStyles = 'text-brown-50 bg-brown-500 py-2 px-4 rounded-sm cursor-pointer font-medium'
	const secondaryStyles =
		' bg-stone-100 py-2 px-4 rounded-sm cursor-pointer border-1 border-stone-200'
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
