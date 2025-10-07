import { motion } from "motion/react"
import type React from "react"
import { cn } from "@/lib/utils"

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  animate?: boolean
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  }
  return (
    <div className={cn("group relative p-[4px]", containerClassName)}>
      <motion.div
        animate={animate ? "animate" : undefined}
        className={cn(
          "absolute inset-0 z-[1] rounded-3xl opacity-60 blur-xl transition duration-500 will-change-transform group-hover:opacity-100",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#e7000b,transparent),radial-gradient(circle_farthest-side_at_100%_0,#ff0000,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffffff,transparent),radial-gradient(circle_farthest-side_at_0_0,#ffffff,#0a0a0a)]",
        )}
        initial={animate ? "initial" : undefined}
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }
            : undefined
        }
        variants={animate ? variants : undefined}
      />
      <motion.div
        animate={animate ? "animate" : undefined}
        className={cn(
          "absolute inset-0 z-[1] rounded-3xl will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#e7000b,transparent),radial-gradient(circle_farthest-side_at_100%_0,#ff0000,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffffff,transparent),radial-gradient(circle_farthest-side_at_0_0,#ffffff,#0a0a0a)]",
        )}
        initial={animate ? "initial" : undefined}
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }
            : undefined
        }
        variants={animate ? variants : undefined}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  )
}
