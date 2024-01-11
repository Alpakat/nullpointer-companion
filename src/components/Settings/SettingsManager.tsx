'use client'

import { useState } from 'react'
import styles from './SettingsManager.module.css'
import classNames from 'classnames'
import Link from 'next/link'
import { useKey } from 'react-use'
import { useRouter } from 'next/navigation'

export default function SettingsManager() {
	const [selectedOption, setSelectedOption] = useState('Schwer')
	const [playerNames, setPlayerNames] = useState({ player1: '', player2: '', player3: '' })

	const router = useRouter()

	const handleInputChange = (event: { target: { name: string; value: string } }) => {
		setPlayerNames({ ...playerNames, [event.target.name]: event.target.value })
	}

	const url = new URL('https://maainc.de/game')
	url.searchParams.set('difficulty', selectedOption)
	url.searchParams.set('player1', playerNames.player1)
	url.searchParams.set('player2', playerNames.player2)
	url.searchParams.set('player3', playerNames.player3)

	const canChange = playerNames.player1 != '' || playerNames.player2 != '' || playerNames.player3 != ''

	useKey('Enter', () => canChange && router.push(url.toString().split('https://maainc.de')[1] ?? '/game'), {}, [canChange, url])

	return (
		<>
			<div className={styles.main}>
				<h3 style={{ margin: 0 }}>Schwierigkeit</h3>

				<div className={styles.mutliSelector}>
					<button className={styles.mutliSelectorButton} onClick={() => setSelectedOption('Schwach')}>
						<span>Schwach</span>
						<div className={classNames(styles.mutliSelectorButtonBackground, selectedOption == 'Schwach' && styles.mutliSelectorButtonBackgroundSelected)}></div>
					</button>
					<button className={styles.mutliSelectorButton} onClick={() => setSelectedOption('Schwer')}>
						<span>Schwer</span>
						<div className={classNames(styles.mutliSelectorButtonBackground, selectedOption == 'Schwer' && styles.mutliSelectorButtonBackgroundSelected)}></div>
					</button>
					<button className={styles.mutliSelectorButton} onClick={() => setSelectedOption('Schwierig')}>
						<span>Schwierig</span>
						<div className={classNames(styles.mutliSelectorButtonBackground, selectedOption == 'Schwierig' && styles.mutliSelectorButtonBackgroundSelected)}></div>
					</button>
				</div>

				{/* <div className={styles.divider}></div> */}
			</div>
			<div className={styles.main}>
				<h3 style={{ margin: 0 }}>Spieler (1-3)</h3>

				<input className={styles.input} type="text" name="player1" value={playerNames.player1} onChange={handleInputChange} />
				<input className={styles.input} type="text" name="player2" value={playerNames.player2} onChange={handleInputChange} />
				<input className={styles.input} type="text" name="player3" value={playerNames.player3} onChange={handleInputChange} />
			</div>
			<div className={styles.main}>
				{canChange ? (
					<Link href={url.toString().split('https://maainc.de')[1] ?? '/game'} style={{ width: '100%' }}>
						<button className={styles.button}>Spiel starten</button>
					</Link>
				) : (
					<button className={classNames(styles.button, styles.buttonDisabled)}>Spiel starten</button>
				)}
			</div>
		</>
	)
}
