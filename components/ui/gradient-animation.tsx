"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

// Constants for animation smoothing
const ANIMATION_SMOOTHING_FACTOR = 20

// Safari detection regex
const SAFARI_REGEX = /^((?!chrome|android).)*safari/i

export const GradientAnimation = ({
  gradientBackgroundStart = "rgb(15, 23, 42)",
  gradientBackgroundEnd = "rgb(0, 0, 0)",
  firstColor = "192, 46, 26",
  secondColor = "192, 46, 26",
  thirdColor = "255, 255, 255",
  fourthColor = "192, 46, 26",
  fifthColor = "192, 46, 26",
  pointerColor = "192, 46, 26",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string
  gradientBackgroundEnd?: string
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
  children?: React.ReactNode
  className?: string
  interactive?: boolean
  containerClassName?: string
}) => {
  const interactiveRef = useRef<HTMLButtonElement>(null)
  // Use refs instead of state to avoid re-renders during animation
  const curPos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)
  const isSafariRef = useRef(false)

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(false)

  // Set CSS custom properties once on mount
  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart)
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd)
    document.body.style.setProperty("--first-color", firstColor)
    document.body.style.setProperty("--second-color", secondColor)
    document.body.style.setProperty("--third-color", thirdColor)
    document.body.style.setProperty("--fourth-color", fourthColor)
    document.body.style.setProperty("--fifth-color", fifthColor)
    document.body.style.setProperty("--pointer-color", pointerColor)
    document.body.style.setProperty("--size", size)
    document.body.style.setProperty("--blending-value", blendingValue)

    // Check Safari once
    isSafariRef.current = SAFARI_REGEX.test(navigator.userAgent)

    // Check for reduced motion preference
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ])

  // Animation loop using requestAnimationFrame instead of state updates
  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion.current) {
      return
    }

    function animate() {
      if (!interactiveRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      // Smooth interpolation using refs (no re-renders)
      curPos.current.x += (targetPos.current.x - curPos.current.x) / ANIMATION_SMOOTHING_FACTOR
      curPos.current.y += (targetPos.current.y - curPos.current.y) / ANIMATION_SMOOTHING_FACTOR

      // Direct DOM manipulation instead of state updates
      interactiveRef.current.style.transform = `translate(${Math.round(
        curPos.current.x,
      )}px, ${Math.round(curPos.current.y)}px)`

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect()
      targetPos.current.x = event.clientX - rect.left
      targetPos.current.y = event.clientY - rect.top
    }
  }

  return (
    <div
      className={cn(
        "relative top-0 left-0 h-screen w-screen overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName,
      )}
    >
      <svg className="hidden">
        <title>Gradient Animation Filters</title>
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              result="goo"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div
        className={cn(
          "absolute inset-0",
          isSafariRef.current ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]",
        )}
      >
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.8)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]",
            "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]",
            "[transform-origin:center_center]",
            "animate-first",
            "opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]",
            "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]",
            "[transform-origin:calc(50%-400px)]",
            "animate-second",
            "opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]",
            "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]",
            "[transform-origin:calc(50%+400px)]",
            "animate-third",
            "opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]",
            "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]",
            "[transform-origin:calc(50%-200px)]",
            "animate-fourth",
            "opacity-70",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]",
            "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] [mix-blend-mode:var(--blending-value)]",
            "[transform-origin:calc(50%-800px)_calc(50%+800px)]",
            "animate-fifth",
            "opacity-100",
          )}
        />
        {interactive && (
          <button
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]",
              "-left-1/2 -top-1/2 h-full w-full [mix-blend-mode:var(--blending-value)]",
              "opacity-70",
            )}
            onMouseMove={handleMouseMove}
            ref={interactiveRef}
            type="button"
          />
        )}
      </div>
    </div>
  )
}
