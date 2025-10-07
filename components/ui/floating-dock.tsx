"use client"

import { PanelTopClose } from "lucide-react"
import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

// Animation constants
const ANIMATION_DELAY_STEP = 0.05
const MOUSE_DISTANCE_RANGE = 150
const CONTAINER_SIZE_MIN = 40
const CONTAINER_SIZE_MAX = 80
const ICON_SIZE_MIN = 20
const ICON_SIZE_MAX = 40
const SPRING_MASS = 0.1
const SPRING_STIFFNESS = 150
const SPRING_DAMPING = 12

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[]
  desktopClassName?: string
  mobileClassName?: string
}) => {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex justify-center md:right-0 md:left-0">
      <FloatingDockDesktop className={desktopClassName} items={items} />
      <FloatingDockMobile className={mobileClassName} items={items} />
    </div>
  )
}

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[]
  className?: string
}) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute inset-x-0 right-6 bottom-full mb-2 flex flex-col gap-2"
            layoutId="nav"
          >
            {items.map((item, idx) => (
              <motion.div
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * ANIMATION_DELAY_STEP,
                  },
                }}
                initial={{ opacity: 0, y: 10 }}
                key={item.title}
                transition={{ delay: (items.length - 1 - idx) * ANIMATION_DELAY_STEP }}
              >
                {item.onClick ? (
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                    key={item.title}
                    onClick={item.onClick}
                    type="button"
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </button>
                ) : (
                  <a
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                    href={item.href}
                    key={item.title}
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <PanelTopClose className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  )
}

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[]
  className?: string
}) => {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)
  return (
    <motion.div
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50/50 px-4 pb-3 backdrop-blur-md md:flex dark:bg-neutral-900/50",
        className,
      )}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      onMouseMove={(e) => mouseX.set(e.pageX)}
    >
      {items.map((item) => (
        <IconContainer key={item.title} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  )
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
}: {
  mouseX: MotionValue
  title: string
  icon: React.ReactNode
  href: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

    return val - bounds.x - bounds.width / 2
  })

  const widthTransform = useTransform(
    distance,
    [-MOUSE_DISTANCE_RANGE, 0, MOUSE_DISTANCE_RANGE],
    [CONTAINER_SIZE_MIN, CONTAINER_SIZE_MAX, CONTAINER_SIZE_MIN],
  )
  const heightTransform = useTransform(
    distance,
    [-MOUSE_DISTANCE_RANGE, 0, MOUSE_DISTANCE_RANGE],
    [CONTAINER_SIZE_MIN, CONTAINER_SIZE_MAX, CONTAINER_SIZE_MIN],
  )

  const widthTransformIcon = useTransform(
    distance,
    [-MOUSE_DISTANCE_RANGE, 0, MOUSE_DISTANCE_RANGE],
    [ICON_SIZE_MIN, ICON_SIZE_MAX, ICON_SIZE_MIN],
  )
  const heightTransformIcon = useTransform(
    distance,
    [-MOUSE_DISTANCE_RANGE, 0, MOUSE_DISTANCE_RANGE],
    [ICON_SIZE_MIN, ICON_SIZE_MAX, ICON_SIZE_MIN],
  )

  const width = useSpring(widthTransform, {
    mass: SPRING_MASS,
    stiffness: SPRING_STIFFNESS,
    damping: SPRING_DAMPING,
  })
  const height = useSpring(heightTransform, {
    mass: SPRING_MASS,
    stiffness: SPRING_STIFFNESS,
    damping: SPRING_DAMPING,
  })

  const widthIcon = useSpring(widthTransformIcon, {
    mass: SPRING_MASS,
    stiffness: SPRING_STIFFNESS,
    damping: SPRING_DAMPING,
  })
  const heightIcon = useSpring(heightTransformIcon, {
    mass: SPRING_MASS,
    stiffness: SPRING_STIFFNESS,
    damping: SPRING_DAMPING,
  })

  const [hovered, setHovered] = useState(false)

  return onClick ? (
    <button onClick={onClick} type="button">
      <motion.div
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        ref={ref}
        style={{ width, height }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              className="-top-8 absolute left-1/2 w-fit whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-neutral-700 text-xs dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              initial={{ opacity: 0, y: 10, x: "-50%" }}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="flex items-center justify-center"
          style={{ width: widthIcon, height: heightIcon }}
        >
          {icon}
        </motion.div>
      </motion.div>
    </button>
  ) : (
    <a href={href}>
      <motion.div
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        ref={ref}
        style={{ width, height }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              className="-top-8 absolute left-1/2 w-fit whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-neutral-700 text-xs dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              initial={{ opacity: 0, y: 10, x: "-50%" }}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="flex items-center justify-center"
          style={{ width: widthIcon, height: heightIcon }}
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  )
}
