'use client'

import Realistic from 'react-canvas-confetti/dist/presets/realistic'

const Confetti = () => {
	return (
		<Realistic
			autorun={{ speed: 0.3, duration: 1 }}
			className='fixed inset-0 h-full w-full pointer-events-none z-[1]'
		/>
	)
}

export default Confetti
