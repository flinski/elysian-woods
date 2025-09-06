import supabase from './supabase'

export type Cabin = {
	id: string
	created_at: string
	name: string
	maxCapacity: number
	regularPrice: number
	discount: number
	description: string
	imageUrl: string
}

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*')

	if (error) {
		console.error(error)
		throw new Error('Cabins could not be loaded')
	}

	const cabins: Cabin[] = data

	return cabins
}
