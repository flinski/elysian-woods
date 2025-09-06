// import { useQuery } from '@tanstack/react-query'
// import { getCabins } from '@/services/apiCabins'

import CabinTable from '@/features/cabins/CabinTable'
import Heading from '@/ui/Heading'

export default function Cabins() {
	// const { isPending, error, data } = useQuery({ queryKey: ['cabins'], queryFn: getCabins })

	return (
		<>
			<div className="mx-auto flex max-w-7xl flex-col gap-y-8">
				<div className="flex items-center justify-between">
					<Heading className="text-3xl font-semibold text-stone-700">All cabins</Heading>
					<p>TEST</p>
				</div>
				<CabinTable />
			</div>
		</>
	)
}
