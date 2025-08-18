import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getPersonaById, getUserDefaultPersona, createDefaultPersona } from "@/lib/personas"
import fs from 'fs'
import path from 'path'

  export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const session = await getServerSession(authOptions)

      if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const { id: storyId } = await params
      const body = await req.json()
      const { content, personaId } = body

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
      const usersFile = path.join(dataDir, 'users.json')
      const storiesFile = path.join(dataDir, 'stories.json')

      // Read existing comments
      let comments = []
      if (fs.existsSync(commentsFile)) {
        const commentsData = fs.readFileSync(commentsFile, 'utf-8')
        try {
          comments = JSON.parse(commentsData)
        } catch (e) {
          comments = []
        }
      }

      // Read existing users to get author info
      let users = []
      if (fs.existsSync(usersFile)) {
        const usersData = fs.readFileSync(usersFile, 'utf-8')
        try {
          users = JSON.parse(usersData)
        } catch (e) {
          users = []
        }
      }

      // Read stories to verify story exists
      let stories = []
      if (fs.existsSync(storiesFile)) {
        const storiesData = fs.readFileSync(storiesFile, 'utf-8')
        try {
          stories = JSON.parse(storiesData)
        } catch (e) {
          stories = []
        }
      }

      // Verify story exists
      const story = stories.find(s => s.id === storyId)
      if (!story) {
        return NextResponse.json({ error: "Story not found" }, { status: 404 })
      }

      // Check if user has access to this story
      const now = new Date()
      const publishAt = story.publishAt ? new Date(story.publishAt) : null
      const expiresAt = story.expiresAt ? new Date(story.expiresAt) : null

      let hasAccess = false

      if (story.authorId === session.user.id) {
        // User owns the story
        hasAccess = true
      } else if (story.visibility === "anonymous_public" && 
                (!publishAt || publishAt <= now) && 
                (!expiresAt || expiresAt > now)) {
        // Public story that's published and not expired
        hasAccess = true
      } else if (story.visibility === "trusted_circle" && 
                story.selectedUserIds && 
                story.selectedUserIds.includes(session.user.id) &&
                (!publishAt || publishAt <= now) && 
                (!expiresAt || expiresAt > now)) {
        // Trusted circle story and user is in the circle
        hasAccess = true
      }

      if (!hasAccess) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 })
      }

      // Get persona for the comment
      let persona
      if (personaId) {
        persona = getPersonaById(personaId)
        if (!persona || persona.userId !== session.user.id) {
          return NextResponse.json({ error: "Invalid persona" }, { status: 400 })
        }
      } else {
        // Use default persona if none specified
        persona = getPersonaById(session.user.id)
        if (!persona) {
          // Create default persona if it doesn't exist
          persona = createDefaultPersona(
            session.user.id,
            session.user.name || 'User',
            session.user.id
          )
        }
      }

      // Create the comment
      const timestamp = now.toISOString()

      const comment = {
        id: Date.now().toString(),
        storyId,
        content: content.trim(),
        authorId: session.user.id,
        personaId: persona.id,
        createdAt: timestamp,
        updatedAt: timestamp,
        author: {
          pseudonym: persona.pseudonym,
          avatarSeed: persona.avatarSeed,
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
      console.error("Error creating comment:", error)
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
      const { id: storyId } = await params

      // Create data directory if it doesn't exist
      const dataDir = path.join(process.cwd(), 'data')
      if (!fs.existsSync(dataDir)) {
        return NextResponse.json([])
      }

      const commentsFile = path.join(dataDir, 'comments.json')
      const storiesFile = path.join(dataDir, 'stories.json')

      // Read stories to verify access
      let stories = []
      if (fs.existsSync(storiesFile)) {
        const storiesData = fs.readFileSync(storiesFile, 'utf-8')
        try {
          stories = JSON.parse(storiesData)
        } catch (e) {
          stories = []
        }
      }

      // Find the story
      const story = stories.find(s => s.id === storyId)
      if (!story) {
        return NextResponse.json({ error: "Story not found" }, { status: 404 })
      }

      // Check if user has access to view comments
      const now = new Date()
      const publishAt = story.publishAt ? new Date(story.publishAt) : null
      const expiresAt = story.expiresAt ? new Date(story.expiresAt) : null

      let hasAccess = false

      if (story.visibility === "anonymous_public" && 
          (!publishAt || publishAt <= now) && 
          (!expiresAt || expiresAt > now)) {
        // Public story - anyone can view comments
        hasAccess = true
      } else if (session?.user?.id) {
        if (story.authorId === session.user.id) {
          // User owns the story
          hasAccess = true
        } else if (story.visibility === "trusted_circle" && 
                  story.selectedUserIds && 
                  story.selectedUserIds.includes(session.user.id) &&
                  (!publishAt || publishAt <= now) && 
                  (!expiresAt || expiresAt > now)) {
          // Trusted circle story and user is in the circle
          hasAccess = true
        }
      }

      if (!hasAccess) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 })
      }

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

      // Filter comments for this story
      const storyComments = comments.filter(comment => comment.storyId === storyId)

      // Sort by creation date (newest first)
      storyComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      return NextResponse.json(storyComments)
    } catch (error) {
      console.error("Error fetching comments:", error)
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      )
    }
  }

  export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const session = await getServerSession(authOptions)

      if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const { id: storyId } = await params
      const { searchParams } = new URL(req.url)
      const commentId = searchParams.get('commentId')

      if (!commentId) {
        return NextResponse.json({ error: "Comment ID is required" }, { status: 400 })
      }

      // Create data directory if it doesn't exist
      const dataDir = path.join(process.cwd(), 'data')
      if (!fs.existsSync(dataDir)) {
        return NextResponse.json({ error: "No comments found" }, { status: 404 })
      }

      const commentsFile = path.join(dataDir, 'comments.json')
      const storiesFile = path.join(dataDir, 'stories.json')

      // Read existing comments
      let comments = []
      if (fs.existsSync(commentsFile)) {
        const commentsData = fs.readFileSync(commentsFile, 'utf-8')
        try {
          comments = JSON.parse(commentsData)
        } catch (e) {
          comments = []
        }
      }

      // Find the comment to delete
      const commentIndex = comments.findIndex(comment => comment.id === commentId)

      if (commentIndex === -1) {
        return NextResponse.json({ error: "Comment not found" }, { status: 404 })
      }

      const comment = comments[commentIndex]

      // Check if the user owns this comment
      if (comment.authorId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden - You can only delete your own comments" }, {
  status: 403 })
      }

      // Remove the comment from the array
      comments.splice(commentIndex, 1)

      // Save the updated comments back to file
      fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2))

      // Update story comment count
      if (fs.existsSync(storiesFile)) {
        const storiesData = fs.readFileSync(storiesFile, 'utf-8')
        try {
          const stories = JSON.parse(storiesData)
          const storyIndex = stories.findIndex(s => s.id === storyId)
          if (storyIndex !== -1) {
            stories[storyIndex]._count = stories[storyIndex]._count || { comments: 0 }
            stories[storyIndex]._count.comments = comments.filter(c => c.storyId === storyId).length
            fs.writeFileSync(storiesFile, JSON.stringify(stories, null, 2))
          }
        } catch (e) {
          console.error("Error updating story comment count:", e)
        }
      }

      return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 })
    } catch (error) {
      console.error("Error deleting comment:", error)
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      )
    }
  }