import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import fs from 'fs'
import path from 'path'

  export async function POST(req: NextRequest) {
      try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const {
          title,
          content,
          contentType = "text",
          tags = [],
          contentWarnings = [],
          visibility = "private",
          trustedCircleId,
          selectedUserIds = [],
          expiresAt,
          publishAt,
          geoRestrictions = [],
          searchIndexable = false
        } = body

        // Ensure contentWarnings is always an array and filter out empty strings
        const processedContentWarnings = Array.isArray(contentWarnings)
            ? contentWarnings.filter(w => w && w.trim() !== '')
            : (contentWarnings && contentWarnings.trim() !== '' ? [contentWarnings] : [])

        // Validate required fields
        if (!title || !content) {
          return NextResponse.json(
            { error: "Title and content are required" },
            { status: 400 }
          )
        }

        // Create data directory if it doesn't exist
        const dataDir = path.join(process.cwd(), 'data')
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true })
        }

        const storiesFile = path.join(dataDir, 'stories.json')
        const usersFile = path.join(dataDir, 'users.json')

        // Read existing stories
        let stories = []
        if (fs.existsSync(storiesFile)) {
          const storiesData = fs.readFileSync(storiesFile, 'utf-8')
          stories = JSON.parse(storiesData)
        }

        // Read existing users to get author info
        let users = []
        if (fs.existsSync(usersFile)) {
          const usersData = fs.readFileSync(usersFile, 'utf-8')
          users = JSON.parse(usersData)
        }

        // Find or create the author
        let author = users.find(u => u.id === session.user.id)
        if (!author) {
          // Create a new user entry
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
          // Save the updated users file
          fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
        }

        // Create the story
        const story = {
          id: Date.now().toString(),
          title,
          content,
          contentType,
          mediaFiles: [], // Will be implemented later for file uploads
          tags,
          contentWarnings: processedContentWarnings,
          visibility,
          trustedCircleId,
          selectedUserIds,
          expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
          publishAt: publishAt ? new Date(publishAt).toISOString() : null,
          geoRestrictions,
          searchIndexable: visibility === "anonymous_public" ? searchIndexable : false,
          authorId: session.user.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          author: {
            pseudonym: author.pseudonym,
            avatarSeed: author.avatarSeed,
          },
          _count: {
            comments: 0
          }
        }

        stories.push(story)

        // Save stories back to file
        fs.writeFileSync(storiesFile, JSON.stringify(stories, null, 2))

        return NextResponse.json(story, { status: 201 })
      } catch (error) {
        console.error("Error creating story:", error)
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        )
      }
    }

    export async function GET(req: NextRequest) {
      try {
        const session = await getServerSession(authOptions)
        const { searchParams } = new URL(req.url)
        const visibility = searchParams.get("visibility")
        const userId = searchParams.get("userId")

        // Create data directory if it doesn't exist
        const dataDir = path.join(process.cwd(), 'data')
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true })
        }

        const storiesFile = path.join(dataDir, 'stories.json')

        // Read existing stories
        let stories = []
        if (fs.existsSync(storiesFile)) {
          const storiesData = fs.readFileSync(storiesFile, 'utf-8')
          stories = JSON.parse(storiesData)
        }

        // Filter stories based on visibility and user permissions
        let filteredStories = stories

        if (visibility === "public") {
          // Public stories that are published and not expired
          filteredStories = stories.filter(story => {
            const now = new Date()
            const publishAt = story.publishAt ? new Date(story.publishAt) : null
            const expiresAt = story.expiresAt ? new Date(story.expiresAt) : null

            return story.visibility === "anonymous_public" &&
                   (!publishAt || publishAt <= now) &&
                   (!expiresAt || expiresAt > now)
          })
        } else if (session?.user?.id) {
          if (userId && userId === session.user.id) {
            // User's own stories
            filteredStories = stories.filter(story => story.authorId === session.user.id)
          } else {
            // Stories accessible to the user
            filteredStories = stories.filter(story => {
              const now = new Date()
              const publishAt = story.publishAt ? new Date(story.publishAt) : null
              const expiresAt = story.expiresAt ? new Date(story.expiresAt) : null

              return story.authorId === session.user.id || // Own stories
                     (story.visibility === "anonymous_public" && // Public stories
                      (!publishAt || publishAt <= now) &&
                      (!expiresAt || expiresAt > now))
            })
          }
        } else {
          // Anonymous browsing - only public stories
          filteredStories = stories.filter(story => {
            const now = new Date()
            const publishAt = story.publishAt ? new Date(story.publishAt) : null
            const expiresAt = story.expiresAt ? new Date(story.expiresAt) : null

            return story.visibility === "anonymous_public" &&
                   (!publishAt || publishAt <= now) &&
                   (!expiresAt || expiresAt > now)
          })
        }

        // Sort by creation date (newest first)
        filteredStories.sort((a, b) => new Date(b.createdAt).getTime() - new
  Date(a.createdAt).getTime())

        return NextResponse.json(filteredStories)
      } catch (error) {
        console.error("Error fetching stories:", error)
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        )
      }
    }