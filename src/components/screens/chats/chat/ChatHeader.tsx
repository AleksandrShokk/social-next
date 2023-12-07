'use client'

import { getImageUrl } from '@/app/config/get-image-url.config'
import { IUser } from '@/types/user.types'
import Image from 'next/image'
import { SearchMessage } from './SearchMessage'

export function ChatHeader({ correspondent }: { correspondent?: IUser }) {
	return (
		<div className='p-layout flex items-center justify-between py-[1.56rem]'>
			<div className='flex items-center'>
				<Image
					src={getImageUrl(correspondent?.avatar?.url) || '/no-avatar.png'}
					alt={''}
					width={40}
					height={40}
					className='mr-4'
					priority
				/>
				<div className='text-sm'>
					<div>{correspondent?.username}</div>
					<div className='opacity-30'>2 members</div>
				</div>
			</div>
			<SearchMessage />
		</div>
	)
}
