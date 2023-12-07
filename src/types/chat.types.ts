import { IUser } from './user.types'

export interface IMessage {
	id: number
	text: string
	createdAt: string
	sender: IUser
	updatedAt: string
}

export interface IChat {
	id: number
	messages: IMessage[]
	participants: IUser[]
}
