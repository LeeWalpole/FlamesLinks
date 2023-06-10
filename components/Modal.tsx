"use client"

import { KeyboardEvent, useCallback, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface ModalProps {
  children: React.ReactNode
}

export default function Modal({ children }: ModalProps) {
  const overlay = useRef<HTMLDivElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay, wrapper]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") onDismiss()
    },
    [onDismiss]
  )

  useEffect(() => {
    document.body.style.overflow = "hidden" // Prevent body from scrolling
    // document.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = "" // Revert body scrolling
      // document.removeEventListener("keydown", onKeyDown)
    }
  }, [onKeyDown])

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-50 mx-auto bg-black/80"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 p-6 sm:w-10/12 md:w-8/12 lg:w-1/2"
      >
        {children}
      </div>
    </div>
  )
}
