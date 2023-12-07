import { $fetch } from '@/$api/api.fetch'
import { IUser } from '@/types/user.types'
import { useQuery } from '@tanstack/react-query'

export const useGetAllUsers = (
	path: string,
	props: string,
	enabled: boolean
) => {
	const { data } = useQuery({
		queryKey: ['users', props],
		queryFn: () => $fetch.get<IUser[]>(path, true),
		enabled,
	})
	return { data }
}
