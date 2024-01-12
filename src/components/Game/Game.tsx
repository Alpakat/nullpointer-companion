'use client'

import classNames from 'classnames'
import styles from './Game.module.css'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useKey } from 'react-use'

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

	const [matchWin, setMatchWin] = useState<number | undefined>(undefined)
	const [matchDisplay, setMatchDisplay] = useState<boolean>(false)

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

	const playingPlayers = players.filter((player) => player != undefined && player != '')

	const currentlyPlayingPlayer = playingPlayers[currentRound % playingPlayers.length]
	const currentlyPlayingPlayerIndex = players.indexOf(currentlyPlayingPlayer)

	const match = (player: number) => {
		//select random player of the player that is playing and the player that is in propertys
		const playersToConsider = [currentlyPlayingPlayerIndex, player]
		const randomPlayer = playersToConsider[Math.floor(Math.random() * playersToConsider.length)]

		setMatchWin(randomPlayer)
		setMatchDisplay(true)
		setTimeout(() => {
			setMatchDisplay(false)
		}, 5000)
	}

	useKey(
		'ArrowLeft',
		() => {
			currentRound != 0 && setCurrentRound((e) => e - 1)
		},
		{},
		[currentRound]
	)

	useKey(
		'ArrowRight',
		() => {
			generateNewRound()
		},
		{},
		[]
	)

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

						//should only count players that are actually playing
						const actualIndex = players.slice(0, index).filter((player) => player != undefined && player != '').length

						return (
							<div className={styles.playerDisplay} key={index}>
								<div
									className={classNames(
										styles.playerColor,
										styles['playerColor' + index.toString()],
										currentRound % playingPlayers.length == actualIndex && styles.playerColorActive
									)}
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
			</div>
			<div className={classNames(styles.main, styles.matchContainer)}>
				<motion.div animate={{ filter: matchDisplay ? 'blur(8px) saturate(0.3) brightness(0.5)' : 'blur(0px) saturate(1) brightness(1)' }} className={styles.matchOverlay}>
					{players.map((player, index) => {
						if (player == undefined || player == '') return null
						return (
							<button
								className={classNames(styles.button, styles['button' + index.toString()], currentlyPlayingPlayerIndex == index && styles.disabledButton)}
								disabled={currentlyPlayingPlayerIndex == index || matchDisplay}
								key={index}
								onClick={() => match(index)}
							>
								<span style={{ margin: 0, fontWeight: 600 }}>
									<span style={{ fontWeight: 300 }}>Match gegen</span> {player}
								</span>
							</button>
						)
					})}
				</motion.div>
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: matchDisplay ? 1 : 0 }} className={styles.matchOverlay} style={{ zIndex: 5, pointerEvents: 'none' }}>
					<h1>
						<span style={{ fontWeight: 300 }}>Gewinner:</span> {players[matchWin ?? 0]}
					</h1>
				</motion.div>
			</div>
		</div>
	)
}
