import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createEditCabin, type NewCabin } from '@/services/apiCabins'

export function useEditCabin() {
	const queryClient = useQueryClient()
	const { isPending: isEditing, mutate: editCabin } = useMutation({
		mutationFn: ({ newCabin, id }: { newCabin: NewCabin; id: string }) =>
			createEditCabin(newCabin, id),
		onSuccess: () => {
			toast.success('Cabin successfully edited')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
		},
		onError: (error) => {
			toast.error(`An error has occurred: ${error.message}`)
		},
	})

	return { isEditing, editCabin }
}
