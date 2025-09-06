type HeadingProps = {
	children: React.ReactNode
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	className?: string
}

export default function Heading({ children, as: Tag = 'h1', className = '' }: HeadingProps) {
	return <Tag className={className}>{children}</Tag>
}
