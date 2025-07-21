"use client"

  import { useTheme } from "@/contexts/ThemeContext"
  import { Button, Flex, Text } from "@radix-ui/themes"
  import { Sun, Moon, Type, Palette } from "lucide-react"

  export default function ThemeToolbar() {
    const { theme, fontSize, colorScheme, setTheme, setFontSize, setColorScheme } = useTheme()

    return (
      <Flex align="center" gap="2">
        {/* Theme Toggle */}
        <div className="relative group">
          <Button
            variant="ghost"
            size="2"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </Button>
          <div className="theme-dropdown absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border 
  border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-2 px-3 opacity-0 group-hover:opacity-100 
  transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50 min-w-[120px]">
            <Text size="2" className="font-medium block mb-2 text-gray-900 dark:text-gray-100">Theme</Text>
            <div className="space-y-1">
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center gap-2 w-full px-2 py-1 text-left text-sm rounded
  hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 ${theme === "light" ?
  "bg-gray-100 dark:bg-gray-600" : ""}`}
              >
                <Sun size={14} />
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-2 w-full px-2 py-1 text-left text-sm rounded
  hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 ${theme === "dark" ? "bg-gray-100 dark:bg-gray-600" : ""}`}
              >
                <Moon size={14} />
                Dark
              </button>
            </div>
          </div>
        </div>

        {/* Font Size */}
        <div className="relative group">
          <Button
            variant="ghost"
            size="2"
          >
            <Type size={16} />
          </Button>
          <div className="theme-dropdown absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border 
  border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-2 px-3 opacity-0 group-hover:opacity-100 
  transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50 min-w-[120px]">
            <Text size="2" className="font-medium block mb-2 text-gray-900 dark:text-gray-100">Font
  Size</Text>
            <div className="space-y-1">
              <button
                onClick={() => setFontSize("small")}
                className={`flex items-center gap-2 w-full px-2 py-1 text-left text-sm rounded
  hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 ${fontSize === "small" ?
  "bg-gray-100 dark:bg-gray-600" : ""}`}
              >
                <span className="text-xs">A</span>
                Small
              </button>
              <button
                onClick={() => setFontSize("medium")}
                className={`flex items-center gap-2 w-full px-2 py-1 text-left text-sm rounded
  hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 ${fontSize === "medium" ?
  "bg-gray-100 dark:bg-gray-600" : ""}`}
              >
                <span className="text-sm">A</span>
                Medium
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`flex items-center gap-2 w-full px-2 py-1 text-left text-sm rounded
  hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 ${fontSize === "large" ?
  "bg-gray-100 dark:bg-gray-600" : ""}`}
              >
                <span className="text-base">A</span>
                Large
              </button>
            </div>
          </div>
        </div>

        {/* Color Scheme */}
        <div className="relative group">
          <Button
            variant="ghost"
            size="2"
          >
            <Palette size={16} />
          </Button>
          <div className="theme-dropdown absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border 
  border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-2 px-3 opacity-0 group-hover:opacity-100 
  transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50 min-w-[180px]">
            <Text size="2" className="font-medium block mb-2 text-gray-900 dark:text-gray-100">Color
  Scheme</Text>
            <div className="space-y-1">
              <button
                onClick={() => setColorScheme("default")}
                className={`flex items-center gap-3 w-full px-2 py-2 text-left text-sm rounded
  hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 ${colorScheme === "default" ?
  "bg-gray-100 dark:bg-gray-600" : ""}`}
              >
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded bg-purple-500"></div>
                  <div className="w-3 h-3 rounded bg-gray-100 border"></div>
                </div>
                Default
              </button>
              <button
                onClick={() => setColorScheme("high-contrast")}
                className={`flex items-center gap-3 w-full px-2 py-2 text-left text-sm rounded
  hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 ${colorScheme === "high-contrast"
   ? "bg-gray-100 dark:bg-gray-600" : ""}`}
              >
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded bg-black"></div>
                  <div className="w-3 h-3 rounded bg-white border border-black"></div>
                </div>
                High Contrast
              </button>
              <button
                onClick={() => setColorScheme("warm")}
                className={`flex items-center gap-3 w-full px-2 py-2 text-left text-sm rounded
  hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 ${colorScheme === "warm" ?
  "bg-gray-100 dark:bg-gray-600" : ""}`}
              >
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded bg-orange-500"></div>
                  <div className="w-3 h-3 rounded bg-orange-50 border"></div>
                </div>
                Warm Tones
              </button>
              <button
                onClick={() => setColorScheme("cool")}
                className={`flex items-center gap-3 w-full px-2 py-2 text-left text-sm rounded
  hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 ${colorScheme === "cool" ?
  "bg-gray-100 dark:bg-gray-600" : ""}`}
              >
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded bg-blue-500"></div>
                  <div className="w-3 h-3 rounded bg-blue-50 border"></div>
                </div>
                Cool Tones
              </button>
            </div>
          </div>
        </div>
      </Flex>
    )
  }