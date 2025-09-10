import supabase from './supabase'

type Settings = {
	id: string
	created_at: string
	minBookingLength: number
	maxBookingLength: number
	maxGuestsPerBooking: number
	breakfastPrice: number
}

export async function getSettings() {
	const { data, error } = await supabase.from('settings').select('*').single()

	if (error) {
		console.error(error)
		throw new Error('Settings could not be loaded')
	}

	const settings: Settings = data

	return settings
}

type NewSetting = {
	[key: string]: string
}

export async function updateSetting(newSetting: NewSetting) {
	const { data, error } = await supabase
		.from('settings')
		.update(newSetting)
		.eq('id', '32bdff9a-c7f9-4d55-aab9-6eee569f4373')
		.single()

	if (error) {
		console.error(error)
		throw new Error('Settings could not be updated')
	}

	const settings: Settings = data

	return settings
}
