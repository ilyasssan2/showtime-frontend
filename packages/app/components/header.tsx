import { useState, useCallback, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Router from 'next/router'

import { useRouter } from 'app/navigation/use-router'
import { View, Pressable, Button, ButtonLabel } from 'design-system'
import { Showtime, Wallet, Plus } from 'design-system/icon'
import { tw } from 'design-system/tailwind'
import { useUser } from 'app/hooks/use-user'
import { NotificationsTabBarIcon } from 'app/navigation/tab-bar-icons'
import { HeaderDropdown } from 'app/components/header-dropdown'

const Header = () => {
	const router = useRouter()
	const { isLoading, isAuthenticated } = useUser()
	const [isSearchBarOpen, setSearchBarOpen] = useState(false)
	const { top: safeAreaTop } = useSafeAreaInsets()

	const openLogin = useCallback(() => {
		const as = `${router.pathname !== '/' ? router.pathname : ''}/login`

		const href = Router.router
			? {
					pathname: Router.pathname,
					query: { ...Router.query },
			  }
			: as

		router.push(href, as, { shallow: true })
	}, [router, Router])

	return (
		<View sx={{ paddingTop: safeAreaTop }} tw="bg-white dark:bg-black md:dark:bg-gray-900">
			<StatusBar style="auto" />
			<View tw="px-4 bg-white dark:bg-black md:dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-800 h-14">
				<View tw="flex-row items-center justify-between py-2">
					<View>
						<Pressable
							tw="w-10 h-10 p-2 rounded-full"
							onPress={() => {
								router.push('/')
							}}
							animate={useCallback(({ hovered }) => {
								'worklet'

								return hovered ? tw.style('bg-gray-100 dark:bg-gray-900 md:dark:bg-gray-800') : null
							}, [])}
						>
							<Showtime
								style={tw.style('rounded-lg overflow-hidden w-6 h-6')}
								color={tw.style('bg-black dark:bg-white')?.backgroundColor as string}
							/>
						</Pressable>
					</View>

					{!isLoading && (
						<View tw={`${isSearchBarOpen ? 'hidden' : ''} flex-row items-center`}>
							{isAuthenticated && (
								<View tw="hidden md:flex">
									<NotificationsTabBarIcon color="white" focused={false} />
								</View>
							)}
							{isAuthenticated ? (
								<>
									<View tw="mx-3">
										<Button
											onPress={() => {}}
											variant="primary"
											tw="p-2.5 md:px-3.5 md:py-1.5 rounded-full h-10 w-10 md:w-auto"
										>
											<ButtonLabel tw="hidden md:flex">Create</ButtonLabel>
											<Plus
												style={tw.style('md:hidden')}
												width={20}
												height={20}
												color={tw.style('bg-white dark:bg-black')?.backgroundColor as string}
											/>
										</Button>
									</View>

									<HeaderDropdown />
								</>
							) : (
								<Button
									onPress={() => {
										if (!router.pathname.includes('/login')) {
											openLogin()
										}
									}}
									variant="primary"
									tw="w-28 rounded-full"
								>
									<Wallet
										width={20}
										height={20}
										color={tw.style('bg-white dark:bg-black')?.backgroundColor as string}
									/>
									<ButtonLabel tw="pl-2">Sign&nbsp;in</ButtonLabel>
								</Button>
							)}
						</View>
					)}
				</View>
			</View>
		</View>
	)
}

export { Header }