import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getPersonaById, updatePersona, deletePersona } from "@/lib/personas"

// GET - Get a specific persona
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string}> }
) {
    try {
        const { id } = await params
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const persona = getPersonaById(id)

        if (!persona) {
            return NextResponse.json({ error: 'Persona not found' }, { status: 404 })
        }

        // Ensure user owns this persona
        if (persona.userId !== session.user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        return NextResponse.json(persona)
    } catch(error) {
        console.error('Error fetching persona:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

//PUT - Update a persona
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string}> }
) {
    try {
        const { id } = await params
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const persona = getPersonaById(id)

        if (!persona) {
            return NextResponse.json({ error: 'Persona not found' }, { status: 404 })
        }

        // Ensure user owns this persona
        if (persona.userId !== session.user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const body = await req.json()
        const { pseudonym, avatarSeed } = body

        if (pseudonym && pseudonym.trim().length === 0) {
            return NextResponse.json({ error: 'Pseudonym cannot be empty' }, { status: 400 }) 
        }

        if (pseudonym && pseudonym.trim().length > 50) {
            return NextResponse.json({ error: 'Pseudonym must be 50 characters or less' }, { status: 400 })
        }

        const updates: any = {}
        if (pseudonym) updates.pesudonym = pseudonym.trim()
        if (avatarSeed) updates.avatarSeed = avatarSeed

        const updatedPersona = updatePersona(id, updates)

        if (!updatedPersona) {
            return NextResponse.json({ error: 'Failed to update persona' }, { status: 500 })
        }

        return NextResponse.json(updatedPersona)
    } catch(error) {
        console.error('Error updating persona:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// DELETE - Delete a persona
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string}> }
) {
    try {
        const { id } = await params
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const persona = getPersonaById(id)

        if (!persona) {
            return NextResponse.json({ error: 'Persona not found' }, { status: 404 })
        }

        // Ensure user owns this persona
        if (persona.userId !== session.user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }
        
        // Cannot delete default persona
        if (persona.isDefault) {
            return NextResponse.json({ error: 'Cannot delete default persona' }, { status: 400 })
        }

        const success = deletePersona(id)

        if (!success) {
            return NextResponse.json({ error: 'Failed to delete persona' }, { status: 500 })
        }

        return NextResponse.json({ message: 'Persona deleted successfully' })
    } catch(error) {
        console.error('Error deleting persona:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}