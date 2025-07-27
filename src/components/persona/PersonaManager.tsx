"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, Text, Flex, Heading, Button, Dialog, TextField, Avatar } from "@radix-ui/themes"
import { Plus, Edit, Trash2 } from "lucide-react"
import { createAvatar } from "@dicebear/core"
import { initials } from "@dicebear/collection"

interface Persona {
    id: string
    userId: string 
    pseudonym: string
    avatarSeed: string
    isDefault: boolean
    createdAt: string
    updatedAt: string
}

export default function PersonaManager() {
    const { data: session } = useSession()
    const [personas, setPersonas] = useState<Persona[]>([])
    const [loading, setLoading] = useState(true)
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [editingPersona, setEditingPersona] = useState<Persona | null>(null)
    const [newPseudonym, setNewPseudonym] = useState("")
    const [error, setError] = useState("")

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
            }
        } catch(error) {
            console.error('Error fetching persona:', error)
        } finally {
            setLoading(false)
        }
    }

    const createPersona = async () => {
        if (!newPseudonym.trim()) {
            setError("Pseudonym is required")
            return
        }

        try {
            const response = await fetch(`/api/personas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pseudonym: newPseudonym.trim(),
                    avatarSeed: `${session?.user?.id}_${Date.now()}`
                }),
            })

            if (response.ok) {
                setNewPseudonym("")
                setShowCreateDialog(false)
                setError("")
                fetchPersonas()
            } else {
                const data = await response.json()
                setError(data.error || "Failed to create persona")
            }
        } catch (error) {
            setError("Failed to create persona")
        }
    }

    const updatePersona = async () => {
        if (!editingPersona || !newPseudonym.trim()) {
            setError("Pseudonym is required")
            return
        }

        try {
            const response = await fetch(`/api/personas/${editingPersona.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pseudonym: newPseudonym.trim()
                }),
            })

            if (response.ok) {
                setNewPseudonym("")
                setShowEditDialog(false)
                setEditingPersona(null)
                setError("")
                fetchPersonas()    
            } else {
                const data = await response.json()
                setError(data.error || "Failed to update persona")
            }
        } catch (error) {
            setError("Failed to update persona")
        }
    }

    const deletePersona = async (personaId: string) => {
        if (!confirm("Are you sure you want to delete this persona? This action cannot be undone.")) {
            return
        }

        try {
            const response = await fetch(`/api/personas/${personaId}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                fetchPersonas()
            } else {
                const data = await response.json()
                alert(data.error || "Failed to delete persona")
            }
        }catch(error) {
            alert("Failed to delete persona")
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

    const openEditDialog = (persona: Persona) => {
        setEditingPersona(persona)
        setNewPseudonym(persona.pseudonym)
        setError("")
        setShowEditDialog(true)
    }

    const openCreateDialog = () => {
        setNewPseudonym("")
        setError("")
        setShowCreateDialog(true)
    }

    if (loading) {
        return <Text>Loading...</Text>
    }

    if (!session?.user) {
        return <Text>Please sign in to manage persona</Text>
    }

    return (
    <div className="space-y-6">
      <Flex justify="between" align="center">
        <Heading size="4">Manage Your Personas</Heading>
        <Button onClick={openCreateDialog}>
          <Plus size={16} />
          Create New Persona
        </Button>
      </Flex>

      <Text size="2" color="gray">
        Personas allow you to share different aspects of your life under separate identities whilst keeping your Google account private.
      </Text>

      <div className="grid gap-4">
        {personas.map((persona) => (
          <Card key={persona.id} className="p-4">
            <Flex justify="between" align="center">
              <Flex align="center" gap="3">
                <Avatar
                  src={getPersonaAvatar(persona)}
                  fallback={persona.pseudonym?.[0] || "P"}
                  size="3"
                />
                <div>
                  <Text size="3" weight="medium">
                    {persona.pseudonym}
                  </Text>
                  <Text size="2" color="gray" className="block">
                    {persona.isDefault ? "Default persona" : "Custom persona"}
                  </Text>
                  <Text size="1" color="gray">
                    Created {new Date(persona.createdAt).toLocaleDateString()}
                  </Text>
                </div>
              </Flex>

              <Flex gap="2">
                <Button
                  variant="ghost"
                  size="2"
                  onClick={() => openEditDialog(persona)}
                >
                  <Edit size={16} />
                </Button>
                {!persona.isDefault && (
                  <Button
                    variant="ghost"
                    size="2"
                    color="red"
                    onClick={() => deletePersona(persona.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </Flex>
            </Flex>
          </Card>
        ))}
      </div>

      {/* Create Persona Dialog */}
      <Dialog.Root open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Create New Persona</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Create a new identity to use when sharing stories.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Pseudonym
              </Text>
              <TextField.Root
                value={newPseudonym}
                onChange={(e: any) => setNewPseudonym(e.target.value)}
                placeholder="Enter pseudonym"
              />
            </label>

            {error && (
              <Text size="2" color="red">
                {error}
              </Text>
            )}
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button onClick={createPersona}>
              Create Persona
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      {/* Edit Persona Dialog */}
      <Dialog.Root open={showEditDialog} onOpenChange={setShowEditDialog}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Edit Persona</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Update your persona&apos;s information.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Pseudonym
              </Text>
              <TextField.Root
                value={newPseudonym}
                onChange={(e: any) => setNewPseudonym(e.target.value)}
                placeholder="Enter pseudonym"
              />
            </label>

            {error && (
              <Text size="2" color="red">
                {error}
              </Text>
            )}
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button onClick={updatePersona}>
              Update Persona
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}