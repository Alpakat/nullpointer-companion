import SettingsManager from '@/components/Settings/SettingsManager'
import styles from './index.module.css'
import Header from '@/components/Header'
import Background from '@/components/Background'

type Props = {
	params: { id: string }
	searchParams: Record<string, string | string[] | undefined>
}

export default async function Home({ searchParams }: Props) {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	if (searchParams.pw !== process.env.PW)
		return (
			<main className={styles.main}>
				<h1>Wrong password</h1>{' '}
			</main>
		)

	return (
		<main className={styles.main}>
			<Header></Header>
			<SettingsManager></SettingsManager>
			<Background delay={0}></Background>
		</main>
	)
}

