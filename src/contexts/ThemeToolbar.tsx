"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { Button, Flex } from "@radix-ui/themes"
import { Sun, Moon, Type, Palette } from "lucide-react"

export default function ThemeToolbar() {
    const { theme, fontSize, colorScheme, setTheme, setFontSize, setColorScheme } = useTheme()

    const cycleFontSize = () => {
        const sizes = ["small", "medium", "large"] as const
        const currentIndex = sizes.indexOf(fontSize)
        const nextIndex = (currentIndex + 1) % sizes.length
        setFontSize(sizes[nextIndex])
        
    }

    const cycleColorScheme = () => {
        const schemes = ["default", "high-contrast", "warm", "cool"] as const
        const currentIndex = schemes.indexOf(colorScheme)
        const nextIndex = (currentIndex + 1) % schemes.length
        setColorScheme(schemes[nextIndex])
    }

    return (
        <Flex align="center" gap="2">
        {/* Theme Toggle */}
        <Button
            variant="ghost"
            size="2"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </Button>

        {/* Font Size Cycle */}
        <Button
            variant="ghost"
            size="2"
            onClick={cycleFontSize}
            title={`Font size: ${fontSize}`}       
        >
            <Type size={16} />
            <span className="text-xs ml-1">
                {fontSize === "small" ? "S" : fontSize === "large" ? "L" : "M"}
            </span>
        </Button>

        {/* Color Scheme Cycle */}
        <Button
            variant="ghost"
            size="2"
            onClick={cycleColorScheme}
            title={`Coclr scheme: ${colorScheme}`}       
        >
            <Palette size={16} />
            <span className="text-xs ml-1">
                {colorScheme === "default" ? "D" :
                 colorScheme === "high-contrast" ? "H" :
                 colorScheme === "warm" ? "W" : "C"
                }
            </span>
        </Button>
        </Flex>
    )
}