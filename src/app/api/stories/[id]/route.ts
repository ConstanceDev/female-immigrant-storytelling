import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getPersonaById, getUserDefaultPersona, createDefaultPersona } from "@/lib/personas";
import fs from 'fs'
import path from 'path'

export async function DELETE(
    req: NextRequest,
    { params } : { params : Promise<{ id: string }> } 
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const resolvedParams = await params
        const storyId = resolvedParams.id

        // Create data directory if it doesn't exist
        const dataDir = path.join(process.cwd(), 'data')
        if (!fs.existsSync(dataDir)) {
            return NextResponse.json({ error: "No stories found" }, { status: 404 })
        }

        const storiesFile = path.join(dataDir, 'stories.json')

        // Read existing stories
        let stories = []
        if (fs.existsSync(storiesFile)) {
            const storiesData = fs.readFileSync(storiesFile, 'utf-8')
            try {
                stories = JSON.parse(storiesData)
            } catch(error) {
                return NextResponse.json({ error: "Error reading stories" }, {status: 500})
            }
        }

        // Find the story to delete
        const storyIndex = stories.findIndex(story => story.id === storyId)

        if (storyIndex === -1) {
            return NextResponse.json({ error: "Story not found" }, { status: 404 })
        }

        const story = stories[storyIndex]

        // Check if the user owns this story
        if (story.authorId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden - You can only delete your own stories" }, { status: 403 })
        }

        // Remove the story from the array
        stories.splice(storyIndex, 1)

        // Save the updated stories back to file
        fs.writeFileSync(storiesFile, JSON.stringify(stories, null, 2))

        return NextResponse.json({ message: "Story deleted successfully" }, { status: 200 })
    } catch(error) {
        console.error("Error deleting story:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions)
        const resolvedParams = await params
        const storyId = resolvedParams.id

        // Create data directory if it doesn't exist
        const dataDir = path.join(process.cwd(), 'data')
        if (!fs.existsSync(dataDir)) {
            return NextResponse.json({ error: "No stories found" }, { status: 404})
        }

        const storiesFile = path.join(dataDir, 'stories.json')

        // Read existing stories
        let stories = []
        if (fs.existsSync(storiesFile)) {
            const storiesData = fs.readFileSync(storiesFile, 'utf-8')
            try {
                stories = JSON.parse(storiesData)
            } catch(error) {
                return NextResponse.json({ error: "Error reading stories" }, { status: 500 })
            }
        }

        // Find the story
        const story = stories.find(story => story.id === storyId)

        if (!story) {
            return NextResponse.json({ error: "Story not found" }, { status: 404 })
        }

        // Check permissions - only allow access if:
        // 1. Story is public, OR
        // 2. User is the author, OR
        // 3. User has access based on visibility settings
        const hasAccess = 
        story.visibility === 'anonymous_public' || 
        (session?.user?.id && story.authorId === session.user.id)

        if (!hasAccess) {
            return NextResponse.json({ error: "Forbidden" },  { status: 403 })
        }

        return NextResponse.json(story)
    } catch(error) {
        console.error("Error fetching story:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }    
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

    const resolvedParams = await params
    const storyId = resolvedParams.id
    const body = await req.json()
    const {
        title,
        content,
        contentType,
        personaId,
        tags = [],
        contentWarnings = [],
        visibility = "private",
        trustedCircleId,
        selectedUserIds = [],
        expiresAt,
        publishAt,
        searchIndexable = false,
        mediaFiles = []
    } = body

    // Validate required field
    if (!title || !content) {
        return NextResponse.json(
            { error: "Title and content are required" },
            { status: 400 }
        )
    }

    // Ensure contentWarnings is always an array and filter out empty strings
    const processedContentWarnings = Array.isArray(contentWarnings)
        ? contentWarnings.filter(w => w && w.trim() !== '')
        : (contentWarnings && contentWarnings.trim() !== '' ? [contentWarnings] : [] )

        // Create data directory if it doesn't exist
        const dataDir = path.join(process.cwd(), 'data')
        if (!fs.existsSync(dataDir)) {
            return NextResponse.json({ error: "No stories found" }, { status: 404 })
        }

        const storiesFile = path.join(dataDir, 'stories.json')

        // Read existing stories
        let stories = []
        if (fs.existsSync(storiesFile)) {
            const storiesData = fs.readFileSync(storiesFile, 'utf-8')
            try {
                stories = JSON.parse(storiesData)
            } catch(e) {
                return NextResponse.json({ error: "Error reading stories" }, { status: 500 })
            }
        }

        // Find the story to update
        const storyIndex = stories.findIndex(story => story.id === storyId)

        if (storyIndex === -1) {
            return NextResponse.json({ error: "Story not found" }, { status: 404 })
        }

        const existingStory = stories[storyIndex]

        // Check if the user owns this story
        if (existingStory.authorId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden - You can only edit your own stories" }, { status: 403 })
        }

        // Get persona for the story
        let persona
        if (personaId) {
            persona = getPersonaById(personaId)
            if (!persona || persona.userId !== session.user.id) {
                return NextResponse.json({ error: "Invalid persona" }, { status: 400 })
            }
        } else {
            // Use existing persona or default persona if none specified
            if (existingStory.personaId) {
                persona = getPersonaById(existingStory.personaId)
            }
            if (!persona) {
                persona = getUserDefaultPersona(session.user.id)
                if (!persona) {
                    // Create default persona if it doesn't exist
                    persona = createDefaultPersona(
                        session.user.id,
                        session.user.name || 'User',
                        session.user.id
                    )
                }
            }
        }

        // Update the story
        const updatedStory = {
            ...existingStory,
            title,
            content,
            contentType,
            tags,
            contentWarnings: processedContentWarnings,
            visibility,
            trustedCircleId,
            selectedUserIds,
            expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
            publishAt: publishAt ? new Date(publishAt).toISOString() : null,
            searchIndexable: visibility === "anonymous_public" ? searchIndexable : false,
            mediaFiles: Array.isArray(mediaFiles) ? mediaFiles : [],
            personaId: persona.id,
            updatedAt: new Date().toISOString(),
            author: {
                pseudonym: persona.pseudonym,
                avatarSeed: persona.avatarSeed
            }
        }

        stories[storyIndex] = updatedStory

        // Save stories back to file
        fs.writeFileSync(storiesFile, JSON.stringify(stories, null, 2))

        return NextResponse.json(updatedStory)
    } catch (error) {
        console.error("Error updating story:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}