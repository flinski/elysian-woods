import CabinTable from '@/features/cabins/CabinTable'
import Heading from '@/ui/Heading'

export default function Cabins() {
	return (
		<>
			<div className="flex flex-col gap-y-8">
				<div className="flex items-center justify-between">
					<Heading className="text-3xl font-semibold text-stone-700">All cabins</Heading>
					<p>Filter / Sort</p>
				</div>
				<CabinTable />
			</div>
		</>
	)
}
