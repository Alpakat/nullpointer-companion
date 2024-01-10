import SettingsManager from '@/components/Settings/SettingsManager'
import styles from './index.module.css'
import Header from '@/components/Header'

export default function Home() {
	return (
		<main className={styles.main}>
			<Header></Header>
			<SettingsManager></SettingsManager>
		</main>
	)
}
