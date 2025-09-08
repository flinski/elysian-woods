type FormErrorProps = {
	children: React.ReactNode
}

export default function FormError({ children }: FormErrorProps) {
	return <div className="text-red-600">{children}</div>
}
