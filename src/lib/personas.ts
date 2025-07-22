
import { personas } from '@dicebear/collection'
import fs from 'fs'
import path from 'path'

export interface Persona {
    id: string
    userId: string // Google account ID
    pesudonym: string
    avatarSeed: string
    isDefault: boolean
    createdAt: string
    updatedAt: string
}

const personasFile = path.join(process.cwd(), 'data', 'personas.json')

// Ensure data directory and file exist
function ensurePersonasFile() {
    const dataDir = path.dirname(personasFile)
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
    }
    if (!fs.existsSync(personasFile)) {
        fs.writeFileSync(personasFile, JSON.stringify([], null, 2))
    }
}

export function getPersonas(): Persona[] {
    try {
        ensurePersonasFile()
        const data = fs.readFileSync(personasFile, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading personas file:', error)
        return []
    }
}

export function getUserPersonas(userId: string): Persona[] {
    const personas = getPersonas()
    return personas.filter(persona => persona.userId === userId)
}

export function getPersonasById(personaId: string): Persona | null {
    const personas = getPersonas()
    return personas.find(persona => persona.id === personaId) || null
}

export function createDefaultPersona(userId: string, pesudonym: string, avatarSeed: string): Persona {
    const personas = getPersonas()

    // Check if user already has a default persona
    const exitingDefault = personas.find(p => p.userId && p.isDefault)
    if (exitingDefault) {
        return exitingDefault
    }

    const defaultPersona: Persona = {
        id: `persona_${Date.now()}_${Math.random().toString(36).substring(2)}`,
        userId,
        pesudonym,
        avatarSeed,
        isDefault: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    personas.push(defaultPersona)
    fs.writeFileSync(personasFile, JSON.stringify(personas, null, 2))

    return defaultPersona
}

export function createPersona(userId: string, pesudonym: string, avatarSeed?: string): Persona {
    const personas = getPersonas()

    // Generate unique avatar seed if not provided
    const finalAvatarSeed = avatarSeed || `${userId}_${Date.now()}`

    const newPersona: Persona = {
        id: `persona_${Date.now()}_${Math.random().toString(36).substring(2)}`,
        userId,
        pesudonym,
        avatarSeed: finalAvatarSeed,
        isDefault: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
}

export function updatePersona(personaId: string, updates: Partial<Pick<Persona, 'pesudonym' | 'avatarSeed'>>): Persona | null {
    const personas = getPersonas()
    const index = personas.findIndex(p => p.id === personaId)

    if (index === -1) {
        return null
    }

    personas[index] = {
        ...personas[index],
        ...updates,
        updatedAt: new Date().toISOString()
    }

    fs.writeFileSync(personasFile, JSON.stringify(personas, null, 2))
    return personas[index]
}

export function deletePersona(personaId: string): boolean {
    const personas = getPersonas()
    const persona = personas.find(p => p.id === personaId)

    // Cannot delete default persona
    if (!persona || persona.isDefault) {
        return false
    }

    const filteredPersona = personas.filter(p => p.id !== personaId)
    fs.writeFileSync(personasFile, JSON.stringify(filteredPersona, null, 2))

    return true
}

export function getUserDefaultPersona(userId: string): Persona | null {
    const personas = getUserDefaultPersona(userId)
    return personas.find(p => p.isDefault) || null
}