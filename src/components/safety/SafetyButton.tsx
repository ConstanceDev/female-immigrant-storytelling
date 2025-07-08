"use client"

import { useState } from "react"
import { Button } from "@radix-ui/themes"

export default function SafetyButton() {
    const [isHovered, setIsHovered] = useState(false)

    const handleQuickExit = () => {
        // Clear current page from history and redirect to Google  
        window.location.replace("https://www.google.com")
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Button
                onClick={handleQuickExit}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    backgroundColor: '#dc2626',
                    color: 'white',
                    transition: 'all 0.3s ease'
                }}
                className="shadow-lg hover:shadow-xl"
            >
                🚨 {isHovered ? 'Quick Exit' : 'Exit'}
            </Button>
        </div>
    )
}