import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from 'fs'
import path from 'path'

export async function DELETE(
    req: NextRequest,
    { params } : { params : { id: string } } 
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const storyId = params.id

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
            return NextResponse.json({ error: "Forbidden - You can onlu delete your own stories" }, { status: 403 })
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
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)
        const storyId = params.id

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
            { error: "Interna; server error" },
            { status: 500 }
        )
    }
}