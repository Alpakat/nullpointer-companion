'use client'

import classNames from 'classnames'
import styles from './Game.module.css'
import { useEffect, useState } from 'react'

const newNumberFunction = (difficulty: 'Schwach' | 'Schwer' | 'Schwierig') => {
	const optionsSchwach = [0, 1, 1, 3, 2, 2]
	const optionsSchwer = [0, 0, 1, 3, 2, 2]
	const optionsSchwierig = [0, 0, 0, 3, 2, 2]

	const options = difficulty == 'Schwach' ? optionsSchwach : difficulty == 'Schwer' ? optionsSchwer : optionsSchwierig

	return options[Math.floor(Math.random() * options.length)] ?? 42
}
const newColorFunction = () => {
	return Math.floor(Math.random() * 3)
}

export default function Game({ difficulty, players }: { difficulty: 'Schwach' | 'Schwer' | 'Schwierig'; players: (string | undefined)[] }) {
	const [currentRound, setCurrentRound] = useState(0)

	const [numbers, setNumbers] = useState<number[]>([])
	const [colors, setColors] = useState<number[]>([])

	useEffect(() => {
		const newNumber = newNumberFunction(difficulty)
		const newColor = newColorFunction()

		setNumbers([newNumber])
		setColors([newColor])
		setCurrentRound(0)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const generateNewRound = () => {
		if (currentRound + 1 > numbers.length - 1) {
			const newNumber = newNumberFunction(difficulty)
			const newColor = newColorFunction()

			const newNumbers = [...numbers]
			const newColors = [...colors]

			newNumbers.push(newNumber)
			newColors.push(newColor)

			setNumbers(newNumbers)
			setColors(newColors)
		}

		setCurrentRound((e) => e + 1)
	}

	return (
		<div>
			<div className={styles.main}>
				<h3 style={{ margin: 0 }}>
					{difficulty}es <span style={{ fontWeight: 300 }}>Spiel</span>
				</h3>
				<h3 style={{ margin: 0 }}>
					{currentRound + 1}. <span style={{ fontWeight: 300 }}>Runde</span>
				</h3>
			</div>
			<div className={styles.main}>
				<div className={styles.playerDisplayGroup}>
					{players.map((player, index) => {
						if (player == undefined || player == '') {
							return null
						}

						const playingPlayers = players.filter((player) => player != undefined && player != '').length
						//should only count players that are actually playing
						const actualIndex = players.slice(0, index).filter((player) => player != undefined && player != '').length

						return (
							<div className={styles.playerDisplay} key={index}>
								<div
									className={classNames(styles.playerColor, styles['playerColor' + index.toString()], currentRound % playingPlayers == actualIndex && styles.playerColorActive)}
								></div>
								<h2 style={{ margin: 0 }}>{player}</h2>
							</div>
						)
					})}
				</div>
			</div>
			<div className={styles.main}>
				<div className={styles.row}>
					<h2 style={{ margin: 0 }}>{numbers[currentRound]}</h2>
					<div className={classNames(styles.color, styles['color' + ((colors[currentRound] ?? 1) + 1)])}></div>
				</div>
			</div>
			<div className={styles.main}>
				<div className={styles.row}>
					<button
						className={classNames(styles.button, currentRound == 0 && styles.disabledButton)}
						disabled={currentRound == 0}
						onClick={() => {
							setCurrentRound((e) => e - 1)
						}}
					>
						Zurück
					</button>
					<button
						className={classNames(styles.button, styles.weiterButton)}
						onClick={() => {
							generateNewRound()
						}}
					>
						Weiter
					</button>
				</div>
				<button className={classNames(styles.button, styles.matchButton)}>Match</button>
			</div>
		</div>
	)
}
