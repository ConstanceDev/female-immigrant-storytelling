import fs from 'fs'
import path from 'path'

export interface Persona {
      id: string
      userId: string // Google account ID
      pseudonym: string
      avatarSeed: string
      isDefault: boolean
      createdAt: string
      updatedAt: string
  }

    const personasFile = path.join(process.cwd(), 'data', 'personas.json')

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

    export function getPersonaById(personaId: string): Persona | null {
      const personas = getPersonas()
      return personas.find(persona => persona.id === personaId) || null
  }

    export function createDefaultPersona(userId: string, pseudonym: string, avatarSeed: string): Persona {
      const personas = getPersonas()

      const existingDefault = personas.find(p => p.userId === userId && p.isDefault)
      if (existingDefault) {
          return existingDefault
      }

      const defaultPersona: Persona = {
          id: `persona_${Date.now()}_${Math.random().toString(36).substring(2)}`,
          userId,
          pseudonym,
          avatarSeed,
          isDefault: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
      }

      personas.push(defaultPersona)
      fs.writeFileSync(personasFile, JSON.stringify(personas, null, 2))

      return defaultPersona
  }

    export function createPersona(userId: string, pseudonym: string, avatarSeed?: string): Persona {    
    const personas = getPersonas()

    const finalAvatarSeed = avatarSeed || `${userId}_${Date.now()}`

    const newPersona: Persona = {
        id: `persona_${Date.now()}_${Math.random().toString(36).substring(2)}`,
        userId,
        pseudonym,
        avatarSeed: finalAvatarSeed,
        isDefault: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      personas.push(newPersona)
      fs.writeFileSync(personasFile, JSON.stringify(personas, null, 2))

      return newPersona
  }

    export function updatePersona(personaId: string, updates: Partial<Pick<Persona, 'pseudonym' | 'avatarSeed'>>): 
  Persona | null {
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

      if (!persona || persona.isDefault) {
          return false
      }

      const filteredPersonas = personas.filter(p => p.id !== personaId)
      fs.writeFileSync(personasFile, JSON.stringify(filteredPersonas, null, 2))

      return true
  }

  export function getUserDefaultPersona(userId: string): Persona | null {
      const personas = getUserPersonas(userId)
      return personas.find(p => p.isDefault) || null
  }