import { useState } from 'react'

import CabinTable from '@/features/cabins/CabinTable'
import CreateCabinForm from '@/features/cabins/CreateCabinForm'
import Button from '@/ui/Button'
import Heading from '@/ui/Heading'

export default function Cabins() {
	const [showForm, setShowForm] = useState(false)

	return (
		<>
			<div className="flex flex-col gap-y-8">
				<div className="flex items-center justify-between">
					<Heading className="text-3xl font-semibold text-stone-700">All cabins</Heading>
					<p>Filter / Sort</p>
				</div>
				<CabinTable />

				<Button onClick={() => setShowForm((show) => !show)}>Add new cabin</Button>
				{showForm && <CreateCabinForm />}
			</div>
		</>
	)
}
