"use client"

import { motion } from 'framer-motion'
import styles from './Background.module.css'
import { useEffect, useState } from 'react'
import Image from "next/legacy/image"

import vector1 from '@/images/Vector1.png'
import vector2 from '@/images/Vector2.png'
import vector3 from '@/images/Vector3.png'
import vector4 from '@/images/Vector4.png'

export default function Component({ delay = 3 }: { delay?: number }) {
	const [position1, setPosition1] = useState({ x: 2000, y: 0 })
	const [position2, setPosition2] = useState({ x: 0, y: 0 })
	const [position3, setPosition3] = useState({ x: 0, y: 2000 })
	const [position4, setPosition4] = useState({ x: 2000, y: 2000 })

	useEffect(() => {
		const update = () => {
			if (!window) return
			const width = window.innerWidth
			const height = window.innerHeight

			const positions: Array<{ x: number; y: number }> = []

			positions.push({ x: Math.random() * (width / 2), y: Math.random() * (height / 2) })
			positions.push({ x: Math.random() * (width / 2) + width / 2, y: Math.random() * (height / 2) })
			positions.push({ x: Math.random() * (width / 2), y: Math.random() * (height / 2) + height / 2 })
			positions.push({ x: Math.random() * (width / 2) + width / 2, y: Math.random() * (height / 2) + height / 2 })

			//random order
			positions.sort(() => Math.random() - 0.5)

			setPosition1(positions[0] ?? { x: 0, y: 0 })
			setPosition2(positions[1] ?? { x: 0, y: 0 })
			setPosition3(positions[2] ?? { x: 0, y: 0 })
			setPosition4(positions[3] ?? { x: 0, y: 0 })
		}

		update()

		const interval = setInterval(update, 15000)
		return () => clearInterval(interval)
	}, [])

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: 'easeOut', duration: 2, delay: delay }} className={styles.background}>
			<motion.div className={styles.vectorContainer} transition={{ duration: 20 }} initial={{ x: position1.x, y: position1.y }} animate={{ x: position1.x, y: position1.y }}>
				<Image src={vector1} layout={'fill'} alt=""></Image>
			</motion.div>
			<motion.div className={styles.vectorContainer} transition={{ duration: 20 }} initial={{ x: position2.x, y: position2.y }} animate={{ x: position2.x, y: position2.y }}>
				<Image src={vector2} layout={'fill'} alt=""></Image>
			</motion.div>
			<motion.div className={styles.vectorContainer} transition={{ duration: 20 }} initial={{ x: position3.x, y: position3.y }} animate={{ x: position3.x, y: position3.y }}>
				<Image src={vector3} layout={'fill'} alt=""></Image>
			</motion.div>
			<motion.div className={styles.vectorContainer} transition={{ duration: 20 }} initial={{ x: position4.x, y: position4.y }} animate={{ x: position4.x, y: position4.y }}>
				<Image src={vector4} layout={'fill'} alt=""></Image>
			</motion.div>

			<div className={styles.maaOverlay}></div>

			<svg className={styles.maa} viewBox="0 0 1038 802" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M40.7049 497.145C40.3278 559.553 28.7545 566.381 71.1858 669.688C95.8261 729.68 162.392 817.797 251.399 860.394C334.747 900.38 447.653 918.621 482.947 920.758C518.241 922.895 648.022 913.331 730.004 880.16C743.854 875.824 757.073 870.552 769.685 864.463C792.876 853.266 814.007 839.308 833.211 823.334C947.467 748.67 997.671 547.392 999.619 517.978C1001.57 488.565 1001.54 439.008 992.033 435.713M40.7049 497.145C42.5719 521.92 84.3535 514.331 119.314 515.842M40.7049 497.145C38.838 472.37 152.971 474.426 164.767 470.765V489.741M992.033 435.713C982.522 432.418 904.347 471.46 805.939 486.468M992.033 435.713C952.545 422.031 931.299 413.93 861.488 414.88M119.314 515.842C110.885 554.114 188.472 556.333 196.852 520.648M119.314 515.842C130.131 487.023 137.269 483.763 164.767 489.741M805.939 486.468C784.43 489.749 762.121 492.219 739.629 493.406M805.939 486.468C833.081 468.61 850.489 440.863 861.488 414.88M861.488 414.88C875.77 381.142 879.247 350.379 879.2 348.106C879.118 344.08 885.712 252.485 858.345 194.259C845.725 170.417 837.061 164.062 818.238 167.015C807.662 174.526 804.969 182.025 805.939 201.203C848.914 320.954 831.237 359.692 792.611 423.961M523.054 508.897C499.943 559.974 446.467 529.525 440.702 512.636M523.054 508.897C517.568 498.121 508.196 488.799 498.455 482.621C490.375 477.497 482.04 474.538 475.461 474.709C460.948 475.085 443.898 494.12 440.702 512.636M523.054 508.897L605.406 502.298C632.678 500.349 673.853 496.878 739.629 493.406M440.702 512.636C347.487 525.34 294.154 527.436 196.852 520.648M739.629 493.406C735.875 486.602 732.48 480.43 729.179 474.709M196.852 520.648C200.897 511.146 196.875 498.869 182.414 493.939M182.414 493.939C175.721 492.289 169.89 490.855 164.767 489.741M182.414 493.939C167.902 468.67 167.862 448.863 171.31 399.717M171.31 399.717C189.253 364.995 184.622 364.879 201.552 335.614C226.966 291.685 261.843 244.741 264.118 248.007C266.191 250.983 274.879 293.725 293.53 335.614C308.986 370.329 334.23 404.459 341.658 414.88C358.048 437.875 371.031 247.999 389.572 252.815C408.113 257.631 429.788 273.238 458.975 342.354C488.161 411.469 481.228 454.944 493.528 474.709C505.827 494.474 529.356 476.517 552.351 414.88C558.304 398.922 561.119 385.284 562.205 373.695C562.681 368.631 562.827 363.957 562.759 359.653C562.39 335.759 555.489 323.223 562.205 318.191C570.079 312.292 592.161 341.025 612.388 373.008C615.294 377.602 618.16 382.262 620.942 386.897C622.569 389.609 624.167 392.313 625.727 394.99C628.15 399.148 630.48 403.24 632.678 407.196C647.231 433.371 648.072 484.323 664.649 461.149C681.227 437.974 677.044 412.781 677.483 411.469M171.31 399.717L146.472 437.645C117.034 479.103 146.472 339.354 139.099 274.912C136.518 266.148 110.107 344.161 58.7703 362.324C50.9157 370.764 83.2927 301.96 88.1818 284.866C95.6684 258.691 110.222 232.186 103.805 208.682C88.1723 150.938 86.693 146.716 82.4149 121.609C78.1369 96.502 76.5318 56.4294 85.6226 51.6215C94.7134 46.8136 169.919 70.4091 243.912 107.186C344.45 83.4389 395.905 80.2723 470.113 110.925C527.829 86.2848 615.418 42.3475 632.678 51.6218C649.94 60.896 617.377 230.222 625.727 264.238C634.077 298.254 671.066 354.845 677.483 411.469M677.483 411.469C679.881 410.935 785.318 419.902 792.035 420.756C793.182 420.901 793.342 422.057 792.611 423.961M677.483 411.469C700.33 429.269 716.965 453.534 729.179 474.709M792.611 423.961C789.05 433.216 764.381 460.157 729.179 474.709"
					stroke="#888"
					strokeWidth="24.3662"
				/>
			</svg>
		</motion.div>
	)
}
