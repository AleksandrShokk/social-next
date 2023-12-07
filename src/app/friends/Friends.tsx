'use client'
import Field from '@/components/ui/field/Field'
import { Loader } from '@/components/ui/loader/Loader'
import { useAuth } from '@/hooks/useAuth'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetAllUsers } from '@/hooks/useGetAllUsers'
import { useGetFriends } from '@/hooks/useGetFriends'
import { useProfile } from '@/hooks/useProfile'
import { IUser } from '@/types/user.types'
import cn from 'clsx'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { getImageUrl } from '../config/get-image-url.config'
import { FilteredFriends } from './FilteredFriends'

export function Friends() {
	const { isLoggedIn } = useAuth()

	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearchTerm = useDebounce(searchTerm)
	const { data: users } = useGetAllUsers(
		`/users?sort=createdAt:desc
	&populate=avatar
	&filters[username][$contains]=${debouncedSearchTerm}`,
		debouncedSearchTerm,
		isLoggedIn
	)

	const { data: authUser } = useProfile()

	const { data, isFetching, isLoading } = useGetFriends(
		authUser?.friends.id,
		isLoggedIn
	)

	return (
		<div className=''>
			<h1 className='p-layout border-r border-b border-border'>Friends</h1>
			{isLoading || isFetching ? (
				<div className='p-layout'>
					<Loader />
				</div>
			) : (
				<div>
					{!data?.list.length && (
						<h2 className='text-2xl p-layout'>Friends doesn`t exist</h2>
					)}
					<div className='grid grid-cols-9'>
						{data?.list.map(user => {
							const isMe = user.id === authUser?.id
							return (
								!isMe && (
									<div
										key={user.id}
										className={cn(
											'text-center border border-l-0 border-t-0 border-border p-layout'
										)}
									>
										<Image
											width={100}
											height={100}
											alt={user.username}
											src={getImageUrl(user.avatar?.url) || '/no-avatar.png'}
											priority
											className='mx-auto'
										/>
										<div className='mt-3 text-xl font-medium'>
											{user.username}
										</div>
										<button className='border-b border-white transition-colors hover:border-primary hover:text-primary cursor-pointer mt-2'>
											Remove from friends
										</button>
									</div>
								)
							)
						})}
					</div>
					<>
						<div>
							<div className='flex m-5 items-center'>
								<Search />
								<Field
									placeholder='Find friends...'
									className='ml-3 border border-border p-layout rounded-xl'
									value={searchTerm}
									onChange={e => setSearchTerm(e.target.value)}
								/>
							</div>
							{users?.length ? (
								<div className='grid grid-cols-10'>
									{users?.map((user: IUser) => (
										<FilteredFriends user={user} />
									))}
								</div>
							) : (
								<h2 className='p-layout text-2xl'>Not found</h2>
							)}
						</div>
					</>
				</div>
			)}
		</div>
	)
}
