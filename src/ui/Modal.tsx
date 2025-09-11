import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

type ModalProps = {
	children: React.ReactNode
	onClose: () => void
}

export default function Modal({ children, onClose }: ModalProps) {
	return createPortal(
		<div className="bg-backdrop fixed top-0 left-0 z-50 h-screen w-full backdrop-blur-[4px]">
			<div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md border-1 border-stone-200 bg-stone-50 p-6 shadow-xl">
				<button
					onClick={onClose}
					className="absolute top-[8px] right-[8px] flex cursor-pointer items-center justify-center rounded-md p-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-950"
				>
					<X size={24} />
				</button>
				<div>{children}</div>
			</div>
		</div>,
		document.body
	)
}
