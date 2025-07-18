import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
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

      // Find the author
      let author = users.find(u => u.id === session.user.id)
      if (!author) {
        // Create a new user entry if not found
        author = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          pseudonym: session.user.name || `Anonymous_${Date.now()}`,
          avatarSeed: session.user.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        users.push(author)
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
      }

      // Create the comment
      const now = new Date()
      const timestamp = now.toISOString()

      const comment = {
        id: Date.now().toString(),
        storyId,
        content: content.trim(),
        authorId: session.user.id,
        createdAt: timestamp,
        updatedAt: timestamp,
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
      const { id: storyId } = await params

      // Create data directory if it doesn't exist
      const dataDir = path.join(process.cwd(), 'data')
      if (!fs.existsSync(dataDir)) {
        return NextResponse.json([])
      }

      const commentsFile = path.join(dataDir, 'comments.json')

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
      storyComments.sort((a, b) => new Date(b.createdAt).getTime() - new
  Date(a.createdAt).getTime())

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