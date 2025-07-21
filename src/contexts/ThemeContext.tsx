"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type FontSize = "small" | "medium" | "large"
type ColorScheme = "default" | "high-contrast" | "warm" | "cool"

interface ThemeContextType {
    theme: Theme
    fontSize: FontSize
    colorScheme: ColorScheme
    setTheme: (theme: Theme) => void
    setFontSize: (size: FontSize) => void
    setColorScheme: (scheme: ColorScheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light")
    const [fontSize, setFontSize] = useState<FontSize>("medium")
    const [colorScheme, setColorScheme] = useState<ColorScheme>("default")

    useEffect(() => {
        // Load saved preference from loalStorage
        const savedTheme = localStorage.getItem("theme") as Theme
        const savedFontSize = localStorage.getItem("fontSize") as FontSize
        const savedColorScheme = localStorage.getItem("colorScheme") as ColorScheme

        if (savedTheme) setTheme(savedTheme)
        if (savedFontSize) setFontSize(savedFontSize)
        if (savedColorScheme) setColorScheme(savedColorScheme)
    }, [])

    useEffect(() => {
        // Apply theme to document
        document.documentElement.classList.remove("light", "dark")
        document.body.classList.remove("light", "dark")
        document.documentElement.classList.add(theme)
        document.body.classList.add(theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    useEffect(() => {
        // Apply font size to document
        document.documentElement.classList.remove("text-sm", "text-base", "text-lg")
        document.body.classList.remove("text-sm", "text-base", "text-lg")
        const fontSizeClass = fontSize === "small" ? "text-sm" : fontSize === "large" ? "text-lg" : "text-base"
        document.documentElement.classList.add(fontSizeClass)
        document.body.classList.add(fontSizeClass)
        localStorage.setItem("fontSize", fontSize)
    }, [fontSize])

    useEffect(() => {
        // Apply color scheme to document
        document.documentElement.classList.remove("scheme-default", "scheme-high-contrast", "scheme-warm", "scheme-cool")
        document.body.classList.remove("scheme-default", "scheme-high-contrast", "scheme-warm", "scheme-cool")
        document.body.classList.add(`scheme-${colorScheme}`)
        document.documentElement.classList.add(`scheme-${colorScheme}`)
        localStorage.setItem("colorScheme", colorScheme)
    }, [colorScheme])

    const handleSetTheme = (newTheme: Theme) => {
        setTheme(newTheme)
    }

    const handleSetFontSize = (size: FontSize) => {
        setFontSize(size)
    }

    const handleSetColorScheme = (scheme: ColorScheme) => {
        setColorScheme(scheme)
    }

    return (
        <ThemeContext.Provider value={{
            theme,
            fontSize,
            colorScheme,
            setTheme: handleSetTheme,
            setFontSize: handleSetFontSize,
            setColorScheme: handleSetColorScheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}