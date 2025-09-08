import supabase, { supabaseUrl } from './supabase'

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

export type NewCabin = {
	name: string
	maxCapacity: number
	regularPrice: number
	discount: number
	description: string
	imageUrl: File
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

export async function createCabin(newCabin: NewCabin) {
	const randomId = Math.random().toString().slice(2)
	const imageName = `${randomId}-${newCabin.imageUrl.name}`.replaceAll('/', '')
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

	const { data, error } = await supabase
		.from('cabins')
		.insert([{ ...newCabin, imageUrl: imagePath }])
		.select()

	if (error) {
		console.error(error)
		throw new Error('Cabin could not be created')
	}

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.imageUrl)

	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data[0].id)
		console.error(storageError)
		throw new Error('Cabin image could not be uploaded and the cabin was not created')
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
