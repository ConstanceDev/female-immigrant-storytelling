import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401})
        }

        const body = await req.json()
        const {
            title,
            content,
            contentType = "text",
            tags = [],
            contentWarnings = [],
            visbility = "private",
            trustedCircleId,
            selectedUserIds = [],
            expiresAt,
            publishAt,
            geoRestrictions = [],
            searchIndexable = false
        } = body

        // Validate required fields
        if (!title || !content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { status: 400 }
            )
        }

        //Create the story
        const story = await prisma.story.create({
            data: {
                title,
                content,
                contentType,
                mediaFiles: [],
                tags,
                contentWarnings,
                visbility,
                trustedCircleId,
                selectedUserIds,
                expiresAt: expiresAt ? new Date(expiresAt) : null,
                publishAt: publishAt ? new Date(publishAt) : null,
                geoRestrictions,
                searchIndexable,
                authorId: session.user.id,
            },
            include: {
                author: {
                    select: {
                        pseudonym: true,
                        avatarSeed: true,
                    }
                }
            }
        })

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
        const visbility = searchParams.get("visibility")
        const userId = searchParams.get("userId")

        let whereClause: any = {}

        if (visbility === "public") {
            //public stories that are published and not expired
            whereClause = {
                visbility: "anonymous_public",
                OR: [
                    { publishAt: null },
                    { publishAt: { lte: new Date() } }
                ],
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } }
                ]
            }
        } else if (session?.user?.id) {
            if (userId && userId === session.user.id) {
                //User's own stories
                whereClause = { authorId: seesion.user.id} 
            } else {
                //Stories accessible to the user
                whereClause = {
                    OR: [
                        { authorId: session.user.id }, //Own stories
                        { visbility: "anonymous_public" }, //Public stories
                        // Add trusted circle logic here later
                    ]
                }
            }
        } else {
            // Anonymous browsing - only public stories
            whereClause = {
                visbility: "anonymous_public",
                OR: [
                    { publishAt: null },
                    { publishAt: { lte: new Date() } }
                ],
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } }
                ]
            }
        }

        const stories = await prisma.story.findMany({
            where: whereClause,
            include: {
                author: {
                    select: {
                        pseudonym: true,
                        avatarSeed: true,
                    }
                },
                _count: {
                    select: {
                        comments: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(stories)
    } catch (error) {
        console.error("Error fetching stories:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}