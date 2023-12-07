import { $fetch } from '@/$api/api.fetch'
import { IChat } from '@/types/chat.types'
import { useQuery } from '@tanstack/react-query'

export const useGetChats = (
	id: string,
	path: string,
	props = '',
	enabled: boolean
) => {
	const { data, isLoading, isFetching } = useQuery({
		queryKey: ['chat', id, props],
		queryFn: () => $fetch.get<{ data: IChat[] }>(`${path}`, true),
		select: data => data.data,
		enabled: enabled,
	})
	return { data, isLoading, isFetching }
}
