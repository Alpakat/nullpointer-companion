import '@/styles/globals.css'

import { Nunito } from 'next/font/google'

const nunito = Nunito({
	subsets: ['latin'],
})

export const metadata = {
	title: 'Nullpointer-Companion',
	description: 'Die App zum Spiel',
	icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="de">
			<body className={nunito.className}>{children}</body>
		</html>
	)
}

