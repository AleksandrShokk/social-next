import { useProfile } from '@/hooks/useProfile'
import { IUser } from '@/types/user.types'
import cn from 'clsx'
import Image from 'next/image'
import { getImageUrl } from '../config/get-image-url.config'

export interface IUserList {
	user: IUser
}
export function FilteredFriends({ user }: IUserList) {
	const { data: authUser } = useProfile()

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
				<div className='mt-3 text-xl font-medium'>{user.username}</div>
				<button className='border-b border-white transition-colors hover:border-primary hover:text-primary cursor-pointer mt-2'>
					Add to friends
				</button>
			</div>
		)
	)
}
