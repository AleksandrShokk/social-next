'use client'
import { Loader } from '@/components/ui/loader/Loader'
import { useAuth } from '@/hooks/useAuth'
import { useGetChat } from '@/hooks/useGetChat'
import { ChatHeader } from './ChatHeader'
import { Message } from './Message'
import { MessageField } from './MessageField'

export function Chat({ id }: { id: string }) {
	const { user } = useAuth()

	const { data, isLoading } = useGetChat(
		id,
		`/chats/${id}
				?populate[messages][populate][sender][populate][avatar]=*
				&populate[participants][populate][avatar]=*`,
		'',
		!!id
	)

	const correspondent = data?.participants.find(u => u.email !== user?.email)

	return (
		<div
			className='w-8/12 border-r border-border h-full grid'
			style={{
				gridTemplateRows: isLoading ? '1fr .089fr' : '.6fr 6fr .6fr',
			}}
		>
			{isLoading ? (
				<div className='flex items-center justify-center'>
					<Loader />
				</div>
			) : (
				<>
					<ChatHeader correspondent={correspondent} />
					<div className='p-layout border-t border-border'>
						{data?.messages.map(message => (
							<Message key={message.id} message={message} />
						))}
					</div>
				</>
			)}
			<MessageField />
		</div>
	)
}
