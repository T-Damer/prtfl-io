import { useAutoAnimate } from '@formkit/auto-animate/react'
import hapticImpact from 'helpers/hapticImpact'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LongPressEventType, useLongPress } from 'use-long-press'
import RouteCard from './RouteCard'

const routes = [
  {
    href: '/',
    text: 'Main',
  },
  {
    href: '/work',
    text: 'Work',
  },
]

const coolBox = [
  <div
    className="noise-filter min-h-32 min-w-32 mix-blend-multiply"
    key="noisy-cool"
  />,
  <img
    src="./img/cool/love-death-robots.avif"
    alt="love-death-robots-gif"
    width="200px"
    height="200px"
    className="bg-black"
    key="love-death-robots"
    fetchPriority="low"
  />,
  <img
    src="./img/cool/sonic.avif"
    alt="sonic-gif"
    width="200px"
    height="200px"
    className="bg-white object-contain p-4"
    key="sonic"
    fetchPriority="low"
  />,
  <img
    src="./img/cool/cassette-covers.webp"
    alt="cassette-covers"
    width="200px"
    height="200px"
    key="cassette-covers"
    fetchPriority="low"
    className="grayscale-100"
  />,
  <img
    src="./img/cool/player.avif"
    alt="eva-player"
    width="200px"
    height="200px"
    key="player-cool"
    fetchPriority="low"
    className="object-cover grayscale-100"
  />,
  <img
    src="./img/cool/whatever-happens.jpeg"
    alt="whatever-happens"
    width="200px"
    height="200px"
    key="whatever-happens"
    fetchPriority="low"
    className="object-cover grayscale-100"
  />,
  <img
    src="./img/cool/girl.webp"
    alt="girl"
    width="200px"
    height="200px"
    key="girl-cool"
    fetchPriority="low"
  />,
  <img
    src="./img/cool/spheres.avif"
    alt="spheres"
    width="200px"
    height="200px"
    key="spheres"
    fetchPriority="low"
  />,
  <img
    src="./img/cool/berserk.jpg"
    alt="berserk"
    width="200px"
    height="200px"
    className="grayscale-100"
    key="berserk-cool"
    fetchPriority="low"
  />,
  <img
    src="./img/cool/sky-palm.webp"
    alt="keyboard-cool"
    width="200px"
    height="200px"
    className="grayscale-100"
    key="sky-palm"
    fetchPriority="low"
  />,
  <img
    src="./img/cool/yellow-skeleton.webp"
    alt="yellow-skeleton"
    width="200px"
    height="200px"
    className="grayscale-100"
    key="yellow-skeleton"
    fetchPriority="low"
  />,
  <img
    src="./img/cool/daft-punk.webp"
    alt="daft-punk"
    width="200px"
    height="200px"
    className="grayscale-100"
    key="daft-punk"
    fetchPriority="low"
  />,
  <img
    src="./img/cool/sea-mountain.webp"
    alt="sea-mountain"
    width="200px"
    height="200px"
    className="grayscale-100"
    key="sea-mountain"
    fetchPriority="low"
  />,
  <img
    src="./img/cool/initialD.webp"
    alt="initialD"
    width="200px"
    height="200px"
    className="grayscale-100"
    key="initialD"
    fetchPriority="low"
  />,
]

export default function Navigator() {
  const [parent] = useAutoAnimate()
  const [coolIndex, setCoolIndex] = useState(0)
  const intervalRef = useRef<number>(null)

  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCoolIndex((prev) => (prev + 1) % coolBox.length)
    }, 10000)
  }, [])

  const goNextCool = useCallback(() => {
    hapticImpact()
    setCoolIndex((prev) => (prev + 1) % coolBox.length)
    startInterval()
  }, [startInterval])

  const goPrevCool = useCallback(() => {
    hapticImpact()
    setCoolIndex((prev) => (prev - 1 + coolBox.length) % coolBox.length)
    startInterval()
    return false
  }, [startInterval])

  useEffect(() => {
    startInterval()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [startInterval])
  const handlers = useLongPress(
    () => {
      goPrevCool()
    },
    { detect: LongPressEventType.Touch }
  )

  return (
    <nav className="flex h-32 min-h-32 min-w-32 select-none flex-row items-center border-t-2 sm:h-full sm:flex-col sm:border-t-0 sm:border-r-2 dark:border-white-pale">
      {routes.map((props) => (
        <RouteCard key={props.text + props.href} {...props} />
      ))}
      <div
        className="after:content:'' relative flex max-h-32 min-h-32 min-w-32 max-w-32 flex-2 bg-stripes after:absolute after:inset-0 after:h-32 after:w-32 after:bg-accent after:opacity-0 after:transition-opacity after:duration-1000 hover:after:opacity-20 sm:w-full md:h-full md:flex-1"
        style={{ WebkitTouchCallout: 'none' }}
        {...handlers()}
        onClick={goNextCool}
        onContextMenu={(e) => {
          e.preventDefault()
        }}
        onMouseDown={(e) => {
          if (e.button === 2) {
            e.preventDefault()
            goPrevCool()
          }
        }}
        ref={parent}
      >
        {coolBox[coolIndex]}
      </div>
    </nav>
  )
}
