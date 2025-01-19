'use client'

import Wave from 'react-wavify'

export const AnimatedWave = () => {
    return (
        <div className="relative h-[28px] w-24 overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
            <Wave
                fill="#f79902"
                paused={false}
                className="absolute left-0 top-0 h-full w-full"
                options={{
                    height: 3,
                    amplitude: 8,
                    speed: 0.3,
                    points: 6,
                }}
                style={{ transform: 'translateY(50%)' }}
            />
        </div>
    )
}
