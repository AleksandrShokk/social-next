import Field from '@/components/ui/field/Field'
import { useAuth } from '@/hooks/useAuth'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetChat } from '@/hooks/useGetChat'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import dayjs from 'dayjs'
import { Search } from 'lucide-react'
import { useState } from 'react'

interface IFiltersMessage {
	updatedAt: string
	text: string
	senderName: string
}
export function SearchMessage() {
	const { isLoggedIn } = useAuth()

	const chatId = window.location.pathname.split('/').at(-1)
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearchTerm = useDebounce(searchTerm)

	const { data } = useGetChat(
		chatId,
		`/chats/${chatId}?populate[messages][populate][text]=*
				&populate[messages][populate][sender]=*
 			`,
		debouncedSearchTerm,
		isLoggedIn
	)
	const filtersMessage: IFiltersMessage[] = []
	data?.messages?.map(message => {
		!message.text.indexOf(debouncedSearchTerm) &&
			filtersMessage.push({
				updatedAt: message.updatedAt,
				text: message.text,
				senderName: message.sender.username,
			})
	})
	const { ref, isActive, setIsActive } = useOnClickOutside(false)
	return (
		<div className='relative'>
			<button className='text-[#7C7275] hover:text-white transition-colors ease-linear flex'>
				<Search
					onClick={() => {
						setIsActive(true)
					}}
					className='mr-3'
				/>
				{isActive && (
					<Field
						ref={ref}
						placeholder='Search message'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				)}
			</button>
			{isActive &&
				(filtersMessage.length && debouncedSearchTerm.length ? (
					<div className='absolute w-[17rem]  mt-9 bg-background border-border rounded-xl'>
						{filtersMessage?.map((item, index) => (
							<div key={index} className='px-layout pb-layout first:mt-4'>
								<div className='flex justify-between items-center'>
									<h3 className='text-lg'>{item.senderName}</h3>
									{dayjs().get('y').toString() ==
									dayjs(item.updatedAt).format('YYYY') ? (
										<p className='text-xs opacity-30'>
											{dayjs(item.updatedAt).format('MMM D')}
										</p>
									) : (
										<p className='text-xs opacity-30'>
											{dayjs(item.updatedAt).format('DD/MM/YYYY')}
										</p>
									)}
								</div>

								<p className='text-base opacity-30'>{item.text}</p>
							</div>
						))}
					</div>
				) : !filtersMessage.length && debouncedSearchTerm.length ? (
					<div className='absolute w-[17rem] mt-9 bg-background border-border rounded-xl'>
						<p className='p-layout'>Not found!</p>
					</div>
				) : null)}
		</div>
	)
}
