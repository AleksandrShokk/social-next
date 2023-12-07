import { $fetch } from '@/$api/api.fetch'
import { IUser } from '@/types/user.types'
import { useQuery } from '@tanstack/react-query'

export const useGetFriends = (
	relationId: number | undefined,
	enabled: boolean
) => {
	const { data, isFetching, isLoading } = useQuery({
		queryKey: ['profile', relationId],
		queryFn: () =>
			$fetch.get<{ data: IUser }>(`/friends/${relationId}?populate=*`, true),
		select: data => data.data,
		enabled: enabled,
	})

	return { data, isFetching, isLoading }
}
