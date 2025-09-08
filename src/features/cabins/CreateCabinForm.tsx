import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { createCabin } from '@/services/apiCabins'
import Button from '@/ui/Button'
import FormError from '@/ui/FormError'

type CabinData = {
	name: string
	maxCapacity: string
	regularPrice: string
	discount: string
	description: string
	imageUrl: string
}

export default function CreateCabinForm() {
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm<CabinData>()
	const queryClient = useQueryClient()
	const { isPending, mutate } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success('Cabin successfully created')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
			reset()
		},
		onError: (error) => {
			toast.error(`An error has occurred: ${error.message}`)
		},
	})

	const rowStyles = 'grid grid-cols-[1fr_0.8fr_1fr] border-b-1 border-stone-100 items-center gap-6'
	const labelStyles = 'font-semibold'
	const inputStyles =
		'border-1 border-stone-200 rounded-sm my-3 px-3 py-2 focus:outline-matcha-500 disabled:opacity-50'

	const onSubmit: SubmitHandler<CabinData> = (data) => {
		const newCabin = {
			...data,
			maxCapacity: Number(data.maxCapacity),
			regularPrice: Number(data.regularPrice),
			discount: Number(data.discount),
		}

		mutate(newCabin)
	}

	// const onError = (errors) => {
	// 	console.log(errors)
	// }

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="bg-stone-50 p-6">
			<div className={rowStyles}>
				<label htmlFor="name" className={labelStyles}>
					Cabin name
				</label>
				<input
					type="text"
					id="name"
					{...register('name', {
						required: 'This field is required',
					})}
					disabled={isPending}
					className={inputStyles}
				/>
				{errors.name?.message && <FormError>{errors.name.message}</FormError>}
			</div>

			<div className={rowStyles}>
				<label htmlFor="maxCapacity" className={labelStyles}>
					Maximum capacity
				</label>
				<input
					type="number"
					id="maxCapacity"
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
					disabled={isPending}
					className={inputStyles}
				/>
				{errors.maxCapacity?.message && <FormError>{errors.maxCapacity.message}</FormError>}
			</div>

			<div className={rowStyles}>
				<label htmlFor="regularPrice" className={labelStyles}>
					Regular price
				</label>
				<input
					type="number"
					id="regularPrice"
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Price should be at least 1',
						},
					})}
					disabled={isPending}
					className={inputStyles}
				/>
				{errors.regularPrice?.message && <FormError>{errors.regularPrice.message}</FormError>}
			</div>

			<div className={rowStyles}>
				<label htmlFor="discount" className={labelStyles}>
					Discount
				</label>
				<input
					type="number"
					id="discount"
					defaultValue={0}
					{...register('discount', {
						required: 'This field is required',
						validate: (value) =>
							Number(value) <= Number(getValues().regularPrice) ||
							'Discount should be less than regular price',
					})}
					disabled={isPending}
					className={inputStyles}
				/>
				{errors.discount?.message && <FormError>{errors.discount.message}</FormError>}
			</div>

			<div className={rowStyles}>
				<label htmlFor="description" className={labelStyles}>
					Description for website
				</label>
				<textarea
					id="description"
					defaultValue=""
					{...register('description', {
						required: 'This field is required',
					})}
					disabled={isPending}
					className={inputStyles}
				/>
				{errors.description?.message && <FormError>{errors.description.message}</FormError>}
			</div>

			<div className={rowStyles}>
				<label htmlFor="image" className={labelStyles}>
					Cabin photo
				</label>
				<input
					type="file"
					id="image"
					accept="image/*"
					disabled={isPending}
					className={inputStyles}
				/>
			</div>

			<div className="flex justify-end gap-x-3">
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isPending}>{isPending ? 'Creating...' : 'Add cabin'}</Button>
			</div>
		</form>
	)
}
