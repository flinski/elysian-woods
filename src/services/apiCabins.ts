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

export async function deleteCabin(id: string) {
	const { error } = await supabase.from('cabins').delete().eq('id', id)

	if (error) {
		console.error(error)
		throw new Error('Cabin could not be deleted')
	}
}
