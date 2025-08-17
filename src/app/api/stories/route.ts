import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getPersonaById, getUserDefaultPersona, createDefaultPersona } from "@/lib/personas"
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
          personaId,
          tags = [],
          contentWarnings = [],
          visibility = "private",
          trustedCircleId,
          selectedUserIds = [],
          expiresAt,
          publishAt,
          geoRestrictions = [],
          searchIndexable = false,
          mediaFiles = []
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

        // Read existing stories
        let stories = []
        if (fs.existsSync(storiesFile)) {
          const storiesData = fs.readFileSync(storiesFile, 'utf-8')
          try {
            stories = JSON.parse(storiesData)
          } catch (e) {
            console.log("Invalid JSON in stories.json, initializing empty array")
            stories = []
          }
        }

        // Get persona for the story
        let persona
        if (personaId) {
          persona = getPersonaById(personaId)
          if (!persona || persona.userId !== session.user.id) {
            return NextResponse.json({ error: "Invalid persona" }, { status: 400 })
          }
        } else {
          // Use default persona if none specified
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

        // Create the story
        const story = {
          id: Date.now().toString(),
          title,
          content,
          contentType,
          mediaFiles: Array.isArray(mediaFiles) ? mediaFiles : [],
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
          personaId: persona.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          author: {
            pseudonym: persona.pseudonym,
            avatarSeed: persona.avatarSeed,
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
      const commentsFile = path.join(dataDir, 'comments.json')

      // Read existing stories
      let stories = []
      if (fs.existsSync(storiesFile)) {
        const storiesData = fs.readFileSync(storiesFile, 'utf-8')
        try {
          stories = JSON.parse(storiesData)
        } catch (e) {
          stories = []
        }
      }

      // Read existing comments to get accurate counts
      let comments = []
      if (fs.existsSync(commentsFile)) {
        const commentsData = fs.readFileSync(commentsFile, 'utf-8')
        try {
          comments = JSON.parse(commentsData)
        } catch (e) {
          comments = []
        }
      }

      // Update comment counts for all stories
      stories = stories.map(story => ({
        ...story,
        _count: {
          comments: comments.filter(comment => comment.storyId === story.id).length
        }
      }))

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
                    (!expiresAt || expiresAt > now)) ||
                   (story.visibility === "trusted_circle" && // Trusted circle stories
                    story.selectedUserIds && 
                    story.selectedUserIds.includes(session.user.id) &&
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
      filteredStories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      return NextResponse.json(filteredStories)
    } catch (error) {
      console.error("Error fetching stories:", error)
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      )
    }
  }