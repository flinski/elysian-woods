import { useForm } from 'react-hook-form'

import Button from '@/ui/Button'

export default function CreateCabinForm() {
	const { register, handleSubmit } = useForm()

	const rowStyles = 'grid grid-cols-[1fr_0.8fr_1fr] border-b-1 border-stone-100 items-center'
	const labelStyles = 'font-semibold'
	const inputStyles = 'border-1 border-stone-200 rounded-sm my-3 px-3 py-2'

	function onSubmit() {
		// console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="bg-stone-50 p-6">
			<div className={rowStyles}>
				<label htmlFor="name" className={labelStyles}>
					Cabin name
				</label>
				<input type="text" id="name" {...register('name')} className={inputStyles} />
			</div>

			<div className={rowStyles}>
				<label htmlFor="maxCapacity" className={labelStyles}>
					Maximum capacity
				</label>
				<input
					type="number"
					id="maxCapacity"
					{...register('maxCapacity')}
					className={inputStyles}
				/>
			</div>

			<div className={rowStyles}>
				<label htmlFor="regularPrice" className={labelStyles}>
					Regular price
				</label>
				<input
					type="number"
					id="regularPrice"
					{...register('regularPrice')}
					className={inputStyles}
				/>
			</div>

			<div className={rowStyles}>
				<label htmlFor="discount" className={labelStyles}>
					Discount
				</label>
				<input
					type="number"
					id="discount"
					defaultValue={0}
					{...register('discount')}
					className={inputStyles}
				/>
			</div>

			<div className={rowStyles}>
				<label htmlFor="description" className={labelStyles}>
					Description for website
				</label>
				<textarea
					id="description"
					defaultValue=""
					{...register('description')}
					className={inputStyles}
				/>
			</div>

			<div className={rowStyles}>
				<label htmlFor="image" className={labelStyles}>
					Cabin photo
				</label>
				<input type="file" id="image" accept="image/*" className={inputStyles} />
			</div>

			<div className="flex justify-end gap-x-3">
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button>Edit</Button>
			</div>
		</form>
	)
}
