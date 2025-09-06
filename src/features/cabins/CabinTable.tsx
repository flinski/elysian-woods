import { useQuery } from '@tanstack/react-query'
import { getCabins } from '@/services/apiCabins'

import CabinRow from '@/features/cabins/CabinRow'
import Spinner from '@/ui/Spinner'
import ErrorMessage from '@/ui/ErrorMessage'
import Table from '@/ui/Table'
import TableHeader from '@/ui/TableHeader'

export default function CabinTable() {
	const { isPending, error, data: cabins } = useQuery({ queryKey: ['cabins'], queryFn: getCabins })

	if (isPending) {
		return <Spinner />
	}

	if (error) {
		return <ErrorMessage message={error.message} />
	}

	return (
		<Table>
			<TableHeader>
				<div></div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</TableHeader>

			{cabins.map((cabin) => (
				<CabinRow cabin={cabin} key={cabin.id} />
			))}
		</Table>
	)
}
