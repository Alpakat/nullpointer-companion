'use client'

import { useState } from 'react'
import styles from './SettingsManager.module.css'
import classNames from 'classnames'

export default function SettingsManager() {
	const [selectedOption, setSelectedOption] = useState('Schwer')
	const [playerNames, setPlayerNames] = useState({ player1: 'Test', player2: '', player3: '' })

	const handleInputChange = (event: { target: { name: string; value: string } }) => {
		setPlayerNames({ ...playerNames, [event.target.name]: event.target.value })
	}

	return (
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

            <br />

			<h3 style={{ margin: 0 }}>Spieler (1-3)</h3>

			<input className={styles.input} type="text" name="player1" value={playerNames.player1} onChange={handleInputChange} />
			<input className={styles.input} type="text" name="player2" value={playerNames.player2} onChange={handleInputChange} />
			<input className={styles.input} type="text" name="player3" value={playerNames.player3} onChange={handleInputChange} />

			<div className={styles.divider}></div>

			<button className={styles.button}>Spiel starten</button>
		</div>
	)
}
