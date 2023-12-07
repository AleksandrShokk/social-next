'use client'

import Field from '@/components/ui/field/Field'
import { Loader } from '@/components/ui/loader/Loader'
import { useAuth } from '@/hooks/useAuth'
import { useDebounce } from '@/hooks/useDebounce'

import { useGetChats } from '@/hooks/useGetChats'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { ChatListItem } from './ChatListItem'

export function ChatsList() {
	const { user, isLoggedIn } = useAuth()

	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearchTerm = useDebounce(searchTerm)
	const { data, isLoading, isFetching } = useGetChats(
		'',
		`/chats?sort=createdAt:desc
				&populate[messages]=*
				&populate[participants][populate][avatar]=*
				&filters[participants][email][$eq]=${user?.email}
				&filters[$or][0][participants][username][$contains]=${debouncedSearchTerm}
				&filters[$or][1][messages][text][$contains]=${debouncedSearchTerm}
				`,
		debouncedSearchTerm,
		isLoggedIn
	)

	return (
		<div>
			<div className='border-t border-b border-border p-layout'>
				<Field
					placeholder='Search chats'
					Icon={Search}
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</div>
			<div>
				{isLoading || isFetching ? (
					<div className='p-layout'>
						<Loader />
					</div>
				) : (
					data?.map(chat => {
						return <ChatListItem key={chat.id} chat={chat} />
					})
				)}
			</div>
		</div>
	)
}
