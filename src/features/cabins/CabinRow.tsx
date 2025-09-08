import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { deleteCabin, type Cabin } from '@/services/apiCabins'
import { formatCurrency } from '@/utils/helpers'

type CabinRowProps = {
	cabin: Cabin
}

export default function CabinRow({ cabin }: CabinRowProps) {
	const queryClient = useQueryClient()
	const { isPending, mutate } = useMutation({
		mutationFn: deleteCabin,
		onSuccess: () => {
			toast.success('Cabin successfully deleted')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
		},
		onError: (error) => {
			toast.error(`An error has occurred: ${error.message}`)
		},
	})

	const { id, name, maxCapacity, regularPrice, discount, imageUrl, description } = cabin

	return (
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
			<div className="text-matcha-500 font-medium">{formatCurrency(discount)}</div>
			<button
				onClick={() => mutate(id)}
				disabled={isPending}
				className="hover: cursor-pointer rounded-sm border-1 border-stone-200 bg-stone-100 py-2 hover:border-red-200 hover:bg-red-100 disabled:opacity-50"
			>
				{isPending ? 'Deleting...' : 'Delete'}
			</button>
		</div>
	)
}
