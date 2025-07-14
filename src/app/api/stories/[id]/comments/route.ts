import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from 'fs'
import path from 'path'

export async function POST(
    req: NextRequest,
    { params } : { params : { id: string } } 
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const storyId = params.id
        const body = await req.json()
        const { content } = body

        // Validate required fields
        if (!content || content.trim() === '') {
            return NextResponse.json(
                { error: "Comment content is required" },
                { status: 400 }
            )
        }

        // Create data directory if it doesn't exist
        const dataDir = path.join(process.cwd(), 'data')
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
        }

        const commentsFile = path.join(dataDir, 'comments.json')
        const userFile = path.join(dataDir, 'user.json')
        const storiesFile = path.join(dataDir, 'stories.json')

        // Read existing comments
        let comments = []
        if (fs.existsSync(commentsFile)) {
            const commentsData = fs.readFileSync(commentsFile, 'utf-8')
            try {
                comments = JSON.parse(commentsData)
            } catch(error) {
                comments = []
            }
        }

        // Read existing users to get author info
        let users = []
        if (fs.existsSync(userFile)) {
            const userData = fs.readFileSync(userFile, 'utf-8')
            try {
                users = JSON.parse(userData)
            } catch (error) {
                users = []
            }
        }

        // Read stories to verify story exists
        let stories = []
        if (fs.existsSync(storiesFile)) {
            const storiesData = fs.readFileSync(storiesFile, 'utf-8')
            try {
                stories = JSON.parse(storiesData)
            } catch (error) {
                stories = []
            }
        }

        // Verify story exists
        const story = stories.find(story => story.id === storyId)
        if (!story) {
            return NextResponse.json(
                { error: "Story not found" },
                { status: 404 }
            )
        }

        // Find the author
        const author = users.find(u => u.id === session.user.id)
        if (!author) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 400 }
            )
        }

        // Create the comment
        const comment = {
            id: Date.now().toString(),
            storyId,
            content: content.trim(),
            authorId: session.user.id,
            createdAt: new Date().toISOString,
            updatedAt: new Date().toISOString,
            author: {
                pseudonym: author.pseudonym,
                avatarSeed: author.avatarSeed,
            }
        }

        comments.push(comment)

        // Save comments back to file
        fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2))

        // Update story comment count
        const storyIndex = stories.findIndex(s => s.id === storyId)
        if (storyIndex !== -1) {
            stories[storyIndex]._count = stories[storyIndex]._count || { comments: 0 }
            stories[storyIndex]._count.comments = comments.filter(c => c.storyId === storyId).length
            fs.writeFileSync(storiesFile, JSON.stringify(stories, null, 2))
        }

        return NextResponse.json(comment, { status: 201 })
    } catch (error) {
        console.error("Error creating comment", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function GET(
     req: NextRequest,
    { params } : { params : { id: string } }    
) {
    try {
        const storyId = params.id

        // Create data directory if it doesn't exist
        const dataDir = path.join(process.cwd(), 'data')
        if (!fs.existsSync) {
            return NextResponse.json([])
        }

        const commentsFile = path.join(process.cwd(), 'data')
        
        // Read existing comments
        let comments = []
        if (fs.existsSync(commentsFile)) {
            const commentsData = fs.readFileSync(commentsFile, 'utf-8')
            try {
                comments = JSON.parse(commentsData)
            } catch (error) {
                comments = []
            }
        }

        // Filter comments for story
        const storyComments = comments.filter(comment => comment.storyId === storyId)

        // Sort by creation date (newest first)
        storyComments.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        return NextResponse.json(storyComments)
    } catch (error) {
        console.error("Error fetching comments:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}