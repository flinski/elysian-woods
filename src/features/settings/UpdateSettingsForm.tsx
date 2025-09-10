import { useSettings } from '@/features/settings/useSettings'
import { useUpdateSetting } from '@/features/settings/useUpdateSetting'

import Spinner from '@/ui/Spinner'
import ErrorMessage from '@/ui/ErrorMessage'

export default function UpdateSettingsForm() {
	const { isPending, error, settings } = useSettings()
	const { isUpdating, updateSetting } = useUpdateSetting()

	const rowStyles =
		'grid grid-cols-[1fr_0.8fr_1fr] border-b-1 border-stone-100 items-center gap-6 last:border-b-transparent'
	const labelStyles = 'font-semibold'
	const inputStyles =
		'border-1 border-stone-200 rounded-sm my-3 px-3 py-2 focus:outline-matcha-500 disabled:opacity-50'

	if (isPending) {
		return <Spinner />
	}

	if (error) {
		return <ErrorMessage message={error.message} />
	}

	if (!settings) {
		return <ErrorMessage message="No settings data available" />
	}

	const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings

	const handleUpdate = (e: React.FocusEvent<HTMLInputElement, Element>, setting: string) => {
		const { value } = e.target

		if (!value) {
			return
		}

		updateSetting({ [setting]: value })
	}

	return (
		<form className="rounded-md border-1 border-stone-200 bg-stone-50 p-6">
			<div className={rowStyles}>
				<label htmlFor="min-nights" className={labelStyles}>
					Minimum nights/booking
				</label>
				<input
					type="number"
					id="min-nights"
					className={inputStyles}
					defaultValue={minBookingLength}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'minBookingLength')}
				/>
			</div>

			<div className={rowStyles}>
				<label htmlFor="max-nights" className={labelStyles}>
					Maxumum nights/booking
				</label>
				<input
					type="number"
					id="max-nights"
					className={inputStyles}
					defaultValue={maxBookingLength}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
				/>
			</div>

			<div className={rowStyles}>
				<label htmlFor="max-guests" className={labelStyles}>
					Maxumum guests/booking
				</label>
				<input
					type="number"
					id="max-guests"
					className={inputStyles}
					defaultValue={maxGuestsPerBooking}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
				/>
			</div>

			<div className={rowStyles}>
				<label htmlFor="breakfast-price" className={labelStyles}>
					Breakfast price
				</label>
				<input
					type="number"
					id="breakfast-price"
					className={inputStyles}
					defaultValue={breakfastPrice}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
				/>
			</div>
		</form>
	)
}
