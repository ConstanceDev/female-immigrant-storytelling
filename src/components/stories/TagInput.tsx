"use client"

import { useState, useRef, KeyboardEvent } from "react"
import { X, Plus } from "lucide-react"
import { Button, Text, Flex, Badge } from "@radix-ui/themes"

interface TagInputProps {
    tags: string[]
    onChange: (tags: string[]) => void
    placeholder?: string
    maxTags?: number
    suggestions: string[]
}

const commonTags = [
    "immigration", "work", "family", "education", "healthcare", "mental-health",
    "culture", "language", "discrimination", "community", "integration", "visa",
    "employment", "housing", "legal", "support", "friendship", "identity",
    "motherhood", "career", "entrepreneurship", "student-life", "relationships",
    "food", "traditions", "celebration", "challenges", "success", "journey"
]

export default function TagInput({
    tags = [],
    onChange,
    placeholder = "Add tags to help categorize your story...",
    maxTags = 10,
    suggestions = commonTags,
}: TagInputProps) {
    const [inputValue, setInputValue] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const filteredSuggestions = suggestions.filter(
        suggestion => 
            suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
        !tags.includes(suggestion)
    ).slice(0, 8)

    const addTag = (tag: string) => {
        const trimmedTag = tag.trim().toLowerCase()
        if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
            onChange([...tags, trimmedTag])
            setInputValue("")
            setShowSuggestions(false)
        }
    }

    const removeTag = (tagToRemove: string) => {
        onChange(tags.filter(tag => tag !== tagToRemove))
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            if (inputValue.trim()) {
                addTag(inputValue)
            }
        } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
            removeTag(tags[tags.length - 1])
        }
    }

    const handleInputChange = (value: string) => {
        // Remove commas and limit length
        const cleanValue = value.replace(/,/g, "").slice(0, 30)
        setInputValue(cleanValue)
        setShowSuggestions(cleanValue.length > 0)
    }

    return (
        <div className="space-y-3">
        {/* Tag Display */}
        {tags.length > 0 && (
            <Flex wrap="wrap" gap="2">
            {tags.map((tag) => (
                <Badge
                key={tag}
                variant="soft"
                color="purple"
                className="flex items-center gap-1 px-2 py-1"
                >
                <Text size="2">{tag}</Text>
                <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                    aria-label={`Remove ${tag} tag`}
                >
                    <X size={12} />
                </button>
                </Badge>
            ))}
            </Flex>
        )}

        {/* Input Field */}
        <div className="relative">
            <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent bg-white">
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(inputValue.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder={tags.length >= maxTags ? `Maximum ${maxTags} tags reached` : placeholder}
                disabled={tags.length >= maxTags}
                className="flex-1 outline-none bg-transparent placeholder-gray-500 disabled:text-gray-400"
            />
            {inputValue && (
                <Button
                type="button"
                size="1"
                variant="ghost"
                onClick={() => addTag(inputValue)}
                className="p-1 hover:bg-purple-100"
                >
                <Plus size={14} />
                </Button>
            )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                <div className="p-2">
                <Text size="1" className="text-gray-500 font-medium mb-2 block">
                    Suggested tags:
                </Text>
                <div className="space-y-1">
                    {filteredSuggestions.map((suggestion) => (
                    <button
                        key={suggestion}
                        type="button"
                        onClick={() => addTag(suggestion)}
                        className="w-full text-left px-2 py-1.5 text-sm hover:bg-purple-50 rounded transition-colors"
                    >
                        {suggestion}
                    </button>
                    ))}
                </div>
                </div>
            </div>
            )}
        </div>

        {/* Help Text */}
        <div className="flex justify-between items-center">
            <Text size="1" className="text-gray-500">
            Press Enter or comma to add tags. {tags.length}/{maxTags} tags used.
            </Text>
            {inputValue && (
            <Text size="1" className="text-purple-600">
                Press Enter to add "{inputValue}"
            </Text>
            )}
        </div>

        {/* Quick Add Popular Tags */}
        {tags.length === 0 && (
            <div className="space-y-2">
            <Text size="2" weight="medium" className="text-gray-700">
                Popular tags:
            </Text>
            <Flex wrap="wrap" gap="2">
                {commonTags.slice(0, 8).map((tag) => (
                <Button
                    key={tag}
                    type="button"
                    variant="ghost"
                    size="1"
                    onClick={() => addTag(tag)}
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-700"
                >
                    + {tag}
                </Button>
                ))}
            </Flex>
            </div>
        )}
        </div>
    )
}