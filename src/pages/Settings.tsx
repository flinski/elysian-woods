import UpdateSettingsForm from '@/features/settings/UpdateSettingsForm'
import Heading from '@/ui/Heading'

export default function Settings() {
	return (
		<>
			<div className="flex flex-col gap-y-8">
				<div className="flex items-center justify-between">
					<Heading className="text-3xl font-semibold text-stone-700">Hotel settings</Heading>
				</div>
				<UpdateSettingsForm />
			</div>
		</>
	)
}
