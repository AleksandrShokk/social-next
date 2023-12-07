import cn from 'clsx'
import { InputHTMLAttributes } from 'react'
import { Loader } from '../loader/Loader'
import styles from './Button.module.scss'
interface IButton extends InputHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean
}

export function Button({ isLoading, children, className }: IButton) {
	return (
		<button className={cn(styles.button, className)}>
			{isLoading ? <Loader /> : children}
		</button>
	)
}
