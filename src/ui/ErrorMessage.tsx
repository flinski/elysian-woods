type ErrorMessageProps = {
	message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
	return (
		<div className="flex items-center justify-center gap-x-1 text-red-400">
			<span>An error has occurred:</span> <span className="font-semibold">{message}</span>
		</div>
	)
}
