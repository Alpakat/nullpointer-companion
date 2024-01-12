import styles from './index.module.css'
import Header from '@/components/Header'
import Background from '@/components/Background'
import Game from '@/components/Game/Game'

type Props = {
	params: { id: string }
	searchParams: Record<string, string | string[] | undefined>
}

export default async function Home({ searchParams }: Props) {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	const difficulty = searchParams.difficulty as string | undefined
	const players = [searchParams.player1 as string | undefined, searchParams.player2 as string | undefined, searchParams.player3 as string | undefined]

	if (!(difficulty == 'Schwach' || difficulty == 'Schwer' || difficulty == 'Schwierig') || players[0] == undefined || players[1] == undefined || players[2] == undefined) {
		return (
			<main className={styles.main}>
				<h1>Ein Fehler ist aufgetreten</h1>
				<Background delay={0}></Background>
			</main>
		)
	}

	return (
		<main className={styles.main}>
			<Header></Header>
			<Game difficulty={difficulty} players={players}></Game>
			<Background delay={0}></Background>
		</main>
	)
}
