import Image from "next/image";
import logo from "@/../public/logo.png"

export default function Page() {
	return (
		// <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}}>Kleinen Moment noch...</motion.h1>
		<div style={{ width: '100vw', height: '100svh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "#000" }}>
			{/* <h1>Kleinen Moment noch...</h1> */}
			<Image src={logo} alt={"Logo"} style={{animation: 'blink 1s infinite'}} width={150} height={150}></Image>
		</div>
	)
}
