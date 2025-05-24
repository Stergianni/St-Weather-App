// ✅ 4. Theme Toggle (ModeToggle.jsx)
// Dark / Light mode support

'use client'

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const ModeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
  }

  return (
    <div className="w-full p-5" >
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <Sun
        className="h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0"
      />
      <Moon
        className="absolute h-[1.2rem] w-[1.2rem] transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
    </div>
  )
}

export default ModeToggle
