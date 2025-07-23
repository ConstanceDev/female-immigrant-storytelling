"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Select, Button, Avatar, Text, Flex } from "@radix-ui/themes"
import { Plus } from "lucide-react"
import { createAvatar } from "@dicebear/core"
import { initials } from "@dicebear/collection"

export interface Persona {
    id: string
    userId: string 
    pesudonym: string
    avatarSeed: string
    isDefault: boolean
    createdAt: string
    updatedAt: string
}

interface PersonaSelectorProps {
    selectedPersonaId?: string
    onPersonaSelect: (personaId: string, persona: Persona) => void
    onCreatePersona?: () => void
    showCreateButton?: boolean
}

export default function PersonaSelector({
    selectedPersonaId,
    onPersonaSelect,
    onCreatePersona,
    showCreateButton = true
}: PersonaSelectorProps) {
    const { data: session } = useSession()
    const [personas, setPersonas] = useState<Persona[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (session?.user?.id) {
            fetchPersonas()
        }
    }, [session])

    const fetchPersonas = async () => {
        try {
            const response = await fetch('/api/personas')
            if (response.ok) {
                const data = await response.json()
                setPersonas(data)

                // Auto-select default persona if none selected
                if (!selectedPersonaId && data.length > 0) {
                    const defaultPersona = data.find((p: Persona) => p.isDefault) || data[0]
                    onPersonaSelect(defaultPersona.id, defaultPersona)
                }
            }
        } catch(error) {
            console.error('Error fetching persona:', error)
        } finally {
            setLoading(false)
        }
    }

    const getPersonaAvatar = (persona: Persona) => {
        const avatar = createAvatar(initials, {
            seed: persona.avatarSeed,
            backgroundColor: ['b6e3f4','c084fc','818cf8','fb7185','fbbf24'],
            backgroundType: ['solid'],
        })
        return avatar.toDataUri()
    }

    const selectedPersona = personas.find(p => p.id === selectedPersonaId)

    if (loading) {
        return <Text size="2">Loading personas...</Text>
    }

    if (!session?.user) {
        return <Text size="2">Please sign in to select a person</Text>
    }

    return (
        <Flex direction="column" gap="3">
            <Text size="2" weight="medium">Post as:</Text>

            <Flex align="center" gap="3">
                <Select.Root
                    value={selectedPersonaId || ''}
                    onValueChange={(value) => {
                        const persona = personas.find(p => p.id === value)
                        if (persona) {
                            onPersonaSelect(value, persona)
                        }
                    }}
                >
                    <Select.Trigger className="min-w-[200px]" />
                    <Select.Content>
                        {personas.map((persona) => (
                            <Select.Item key={persona.id} value={persona.id}>
                                <Flex align="center" gap="2">
                                    <Avatar
                                        src={getPersonaAvatar(persona)}
                                        fallback={persona.pesudonym?.[0] || "P"}
                                        size="1"
                                    />
                                    <Text size="2">
                                        {persona.pesudonym}
                                        {persona.isDefault && " (Default)"}
                                    </Text>
                                </Flex>
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Root>

                {showCreateButton && onCreatePersona && (
                    <Button
                        variant="outline"
                        size="2"
                        onClick={onCreatePersona}
                    >
                        <Plus size={16}/>
                        New Persona
                    </Button>
                )}
            </Flex>

            {selectedPersona && (
                <Flex align="center" gap="2" className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <Avatar 
                        src={getPersonaAvatar(selectedPersona)}
                        fallback={selectedPersona.pesudonym?.[0] || "P"}
                        size="2"
                    />
                    <Flex direction="column">
                        <Text size="2" weight="medium">
                            {selectedPersona.pesudonym}
                        </Text>
                        <Text size="1" color="gray">
                            {selectedPersona.isDefault ? "Your default identity" : "Persona"}
                        </Text>
                    </Flex>
                </Flex>
            )}
        </Flex>
    )
}