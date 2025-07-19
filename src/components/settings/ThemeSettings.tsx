"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { Card, Text, Flex, Heading, Button, Select } from "@radix-ui/themes"
import { Sun, Moon, Type, Palette } from "lucide-react"

export default function ThemeSettings() {
    const { theme, fontSize, colorScheme, setTheme, setFontSize, setColorScheme } = useTheme()

   return (
    <div className="space-y-6">
        <Heading size="4">Appearance Settings</Heading>

        {/* Theme Toggle */} 
        <Card className="p-4">
            <Flex direction="column" gap="3">
                <Flex align="center" gap="2">
                    {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
                    <Text size="3" weight="medium">Theme</Text>
                </Flex>
                <Text size="2" className="text-gray-600">
                    Choose between light and dark mode
                </Text>
                <Flex gap="2">
                    <Button
                        variant={theme === "light" ? "solid" : "outline"}
                        onClick={() => setTheme("light")}
                        size="2"
                    >
                        <Sun size={16}/>
                        Light
                    </Button>
                    <Button
                        variant={theme === "dark" ? "solid" : "outline"}
                        onClick={() => setTheme("dark")}
                        size="2"
                    >
                        <Moon size={16}/>
                        Dark
                    </Button>
                </Flex>
            </Flex>
        </Card>

        {/* Font Size */} 
        <Card className="p-4">
            <Flex direction="column" gap="3">
                <Flex align="center" gap="2">
                    <Type size={20} />
                    <Text size="3" weight="medium">Font Size</Text>
                </Flex>
                <Text size="2" className="text-gray-600">
                    Adjust text size for better readability 
                </Text>
                <Select.Root value={fontSize} onValueChange={(value: any) => setFontSize(value)}>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.Item value="small">Small</Select.Item>
                        <Select.Item value="medium">Medium</Select.Item>
                        <Select.Item value="large">Large</Select.Item>
                    </Select.Content>
                </Select.Root>
            </Flex>
        </Card>

        {/* Color Scheme */} 
        <Card className="p-4">
            <Flex direction="column" gap="3">
                <Flex align="center" gap="2">
                    <Palette size={20} />
                    <Text size="3" weight="medium">Color Scheme</Text>
                </Flex>
                <Text size="2" className="text-gray-600">
                    Choose a color theme that works best for you
                </Text>
                <Select.Root value={colorScheme} onValueChange={(value: any) => setColorScheme(value)}>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.Item value="default">Default</Select.Item>
                        <Select.Item value="high-contrast">High Contrast (Accessibility)</Select.Item>
                        <Select.Item value="warm">Warm Tones</Select.Item>
                        <Select.Item value="cool">Cool Tones</Select.Item>
                    </Select.Content>
                </Select.Root>

                {/* Color scheme preview */} 
                <div className="grid grid-cols-4 gap-2 mt-2">
                    <div
                        className={`h-8 rounded ${colorScheme === 'default' ? 'ring-2 ring-blue-500' : ''}`}
                        style={{ backgroundColor: 'var(--primary)' }}
                    />
                    <div
                        className="h-8 rounded"
                        style={{ backgroundColor: 'var(--card)' }}
                    />
                    <div
                        className="h-8 rounded"
                        style={{ backgroundColor: 'var(--muted)' }}
                    />
                    <div
                        className="h-8 rounded border"
                        style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                    />
                </div>  
            </Flex>
        </Card>

        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
            <Flex direction="column" gap="2">
                <Text size="2" weight="medium">💡 Accessibility Tip</Text>
                <Text size="2" className="text-gray-600">
                    The &quot;High Contrast&quot; color scheme is specifically designed for users with visual impairments.
                    It provides maximum contrast between text and background for better readability.
                </Text>
            </Flex>
        </Card>
    </div>
   )
}