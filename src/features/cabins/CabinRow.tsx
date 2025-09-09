import { useState } from 'react'
import { Copy, Pencil, Trash } from 'lucide-react'

import { type Cabin } from '@/services/apiCabins'
import { formatCurrency } from '@/utils/helpers'

import { useDeleteCabin } from '@/features/cabins/useDeleteCabin'
import { useCreateCabin } from '@/features/cabins/useCreateCabin'
import CreateCabinForm from '@/features/cabins/CreateCabinForm'

type CabinRowProps = {
	cabin: Cabin
}

export default function CabinRow({ cabin }: CabinRowProps) {
	const [showForm, setShowForm] = useState(false)
	const { isDeleting, deleteCabin } = useDeleteCabin()
	const { isCreating, createCabin } = useCreateCabin()

	const { id, name, maxCapacity, regularPrice, discount, description, imageUrl } = cabin

	const handleDuplicate = () => {
		createCabin({
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			description,
			imageUrl,
		})
	}

	return (
		<>
			<div className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] items-center gap-x-6 border-b-1 border-stone-200 px-2 py-2 last:border-b-0">
				<div className="relative aspect-[16/10] overflow-hidden rounded-sm">
					<img
						src={imageUrl}
						alt={description}
						className="absolute top-0 left-0 size-full object-cover"
					/>
				</div>
				<div>{name}</div>
				<div className="">Fits up to {maxCapacity} guests</div>
				<div>{formatCurrency(regularPrice)}</div>
				{discount ? (
					<div className="text-matcha-500 font-medium">{formatCurrency(discount)}</div>
				) : (
					<div>&mdash;</div>
				)}
				<div className="flex items-center">
					<button
						onClick={handleDuplicate}
						disabled={isDeleting || isCreating}
						className="flex size-8 cursor-pointer items-center justify-center rounded-sm border-1 border-stone-200 bg-stone-100 hover:border-blue-200 hover:bg-blue-100 disabled:opacity-50"
					>
						<Copy size={20} />
					</button>
					<button
						onClick={() => setShowForm((show) => !show)}
						disabled={isDeleting || isCreating}
						className="flex size-8 cursor-pointer items-center justify-center rounded-sm border-1 border-stone-200 bg-stone-100 hover:border-amber-200 hover:bg-amber-100 disabled:opacity-50"
					>
						<Pencil size={20} />
					</button>
					<button
						onClick={() => deleteCabin(id)}
						disabled={isDeleting || isCreating}
						className="flex size-8 cursor-pointer items-center justify-center rounded-sm border-1 border-stone-200 bg-stone-100 hover:border-red-200 hover:bg-red-100 disabled:opacity-50"
					>
						<Trash size={20} />
					</button>
				</div>
			</div>
			{showForm && <CreateCabinForm cabinToEdit={cabin} />}
		</>
	)
}
