import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getUserPersonas, createPersona, createDefaultPersona } from "@/lib/personas"

// Get Get all personas for the authenticated user
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }
        
        const personas = getUserPersonas(session.user.id)

        // If user has no persons, create default from their profile
        if (personas.length === 0) {
            const defaultPersona = createDefaultPersona(
                session.user.id,
                session.user.pesudonym || session.user.name || 'User',
                session.user.avatarSeed || session.user.id
            )
            return NextResponse.json([defaultPersona])
        }

        return NextResponse.json(personas)
    } catch(error) {
        console.error('Error fetching personas:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// POST - Create a new persona
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await req.json()
        console.log('Request body:', body)
        const { pseudonym, avatarSeed } = body

        if (!pseudonym || pseudonym.trim().length === 0) {
            return NextResponse.json({ error: 'Pseudonym is required' }, { status: 400 })
        }

        if (pseudonym.trim().length > 50) {
            return NextResponse.json({ error: 'Pseudonym must be 50 characters or less' }, { status: 400 })
        }

        const newPersona = createPersona(session.user.id, pseudonym.trim(), avatarSeed)
        console.log('Created persona:', newPersona) 

        return NextResponse.json(newPersona, { status: 201 })
    } catch(error) {
        console.error('Error creating persona:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}