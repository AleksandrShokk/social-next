import { $fetch } from '@/$api/api.fetch'
import { useQuery } from '@tanstack/react-query'

export const useAddToFriends = (
	friendsId: number | undefined,
	enabled: boolean
) => {
	const { data } = useQuery({
		queryKey: ['friends', friendsId],
		queryFn: () => $fetch.post(`/friends/create`),
		enabled,
	})
	return { data }
}
