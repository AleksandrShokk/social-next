'use client'

import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { MENU } from './sidebar.data'

import { useAuth } from '@/hooks/useAuth'
import styles from './Sidebar.module.scss'

export function Sidebar() {
	const pathname = usePathname()
	const { isLoggedIn } = useAuth()

	return (
		isLoggedIn && (
			<aside className={styles.sidebar}>
				<Image src='/logo.svg' priority alt='' width={45} height={45} />
				<div>
					{MENU.map(item => (
						<Link
							href={item.url}
							key={item.url}
							className={cn({
								[styles.active]: pathname === item.url,
							})}
						>
							<item.icon size={27} />
						</Link>
					))}
				</div>
			</aside>
		)
	)
}
