import SettingsManager from '@/components/Settings/SettingsManager'
import styles from './index.module.css'
import Header from '@/components/Header'
import Background from '@/components/Background'

export default async function Home() {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	return (
		<main className={styles.main}>
			<Header></Header>
			{/* <SettingsManager></SettingsManager> */}
			<Background delay={0}></Background>
		</main>
	)
}
