import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { createEditCabin, type Cabin, type NewCabin } from '@/services/apiCabins'
import Button from '@/ui/Button'
import FormError from '@/ui/FormError'

type CabinData = {
	name: string
	maxCapacity: string
	regularPrice: string
	discount: string
	description: string
	imageUrl: FileList | string
}

type CreateCabinFormProps = {
	cabinToEdit?: Cabin
}

export default function CreateCabinForm({ cabinToEdit }: CreateCabinFormProps) {
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm<CabinData>({
		defaultValues: cabinToEdit
			? {
					name: cabinToEdit.name,
					maxCapacity: String(cabinToEdit.maxCapacity),
					regularPrice: String(cabinToEdit.regularPrice),
					discount: String(cabinToEdit.discount),
					description: cabinToEdit.description,
					imageUrl: cabinToEdit.imageUrl,
				}
			: {},
	})
	const queryClient = useQueryClient()
	const { isPending: isCreating, mutate: createCabin } = useMutation({
		mutationFn: createEditCabin,
		onSuccess: () => {
			toast.success('New cabin successfully created')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
			reset()
		},
		onError: (error) => {
			toast.error(`An error has occurred: ${error.message}`)
		},
	})

	const { isPending: isEditing, mutate: editCabin } = useMutation({
		mutationFn: ({ newCabin, id }: { newCabin: NewCabin; id: string }) =>
			createEditCabin(newCabin, id),
		onSuccess: () => {
			toast.success('Cabin successfully edited')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
			reset()
		},
		onError: (error) => {
			toast.error(`An error has occurred: ${error.message}`)
		},
	})

	const isWorking = isCreating || isEditing

	const rowStyles = 'grid grid-cols-[1fr_0.8fr_1fr] border-b-1 border-stone-100 items-center gap-6'
	const labelStyles = 'font-semibold'
	const inputStyles =
		'border-1 border-stone-200 rounded-sm my-3 px-3 py-2 focus:outline-matcha-500 disabled:opacity-50'

	const onSubmit: SubmitHandler<CabinData> = (data) => {
		const image = typeof data.imageUrl === 'string' ? data.imageUrl : data.imageUrl[0]
		const newCabin = {
			...data,
			maxCapacity: Number(data.maxCapacity),
			regularPrice: Number(data.regularPrice),
			discount: Number(data.discount),
			imageUrl: image,
		}

		if (cabinToEdit) {
			editCabin({ newCabin, id: cabinToEdit.id })
		} else {
			createCabin(newCabin)
		}
	}

	// const onError = (errors) => {
	// 	console.log(errors)
	// }

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="rounded-md border-1 border-stone-200 bg-stone-50 p-6"
		>
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
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
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
					{...register('imageUrl', {
						required: cabinToEdit ? false : 'This field is required',
					})}
					disabled={isWorking}
					className="file:bg-matcha-400 file:text-matcha-50 hover:file:bg-matcha-500 w-full cursor-pointer file:cursor-pointer file:rounded-sm file:border-1 file:border-transparent file:px-3 file:py-2 file:font-medium disabled:opacity-50"
				/>
				{errors.imageUrl?.message && <FormError>{errors.imageUrl.message}</FormError>}
			</div>

			<div className="flex justify-end gap-x-3">
				<Button variation="secondary" type="reset" disabled={isWorking}>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isCreating
						? 'Creating...'
						: isEditing
							? 'Editing...'
							: cabinToEdit
								? 'Edit cabin'
								: 'Add cabin'}
				</Button>
			</div>
		</form>
	)
}
