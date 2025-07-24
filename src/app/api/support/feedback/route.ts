import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import fs from 'fs'
import path from 'path'
import { userInfo } from "os"

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        const body = await req.json()

        const {
            category,
            subject,
            message,
            email,
            userId,
            userAgent,
            url
        } = body

        // Validate required fields
        if (!category || !subject || !message || !email) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Please enter a valid email address" },
                { status: 400 }
            )
        }

        // Create data directory if it doesn't exist
        const dataDir = path.join(process.cwd(), 'data')
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
        }

        const feedbackFile = path.join(dataDir, 'feedback.json')

        // Read existing feedback
        let feedbackList = []
        if (fs.existsSync(feedbackFile)) {
            const feedbackData = fs.readFileSync(feedbackFile, 'utf-8')
            try {
                feedbackList = JSON.parse(feedbackData)
            } catch(e) {
                feedbackList = []
            }
        }

        // Create feedback entry
        const timestamp = new Date().toISOString()
        const feedback = {
            id: `feedback_${Date.now()}_${Math.random().toString(36).substring(2)}`,
            category,
            subject: subject.trim(),
            message: message.trim(),
            email: email.trim(),
            userId: userId || null,
            userInfo: {
                userAgent: userAgent || null,
                url: url || null,
                sessionExists: !!session
            },
            status: 'open',
            priority: category === 'bug' ? 'high' : 'normal',
            createdAt: timestamp,
            updatedAt: timestamp
        }

        feedbackList.push(feedback)

        // Save feedback to file
        fs.writeFileSync(feedbackFile, JSON.stringify(feedbackList, null, 2))

        // In a real application, you would also:
        // - Send email notification to support team
        // - Create ticket in support system
        // - Send confirmation email to user

        return NextResponse.json(
            {
                message: "Feedback submitted successfully",
                id: feedback.id 
            },
            { status: 201 }
        )
    } catch(error) {
        console.error("Error submitting feedback:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        // Only allow authenticated users to view feedback (could be admin-only in production)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')

        const dataDir = path.join(process.cwd(), 'data')
        const feedbackFile = path.join(dataDir, 'feedback.json')

        let feedbackList = []
        if (fs.existsSync(feedbackFile)) {
            const feedbackData = fs.readFileSync(feedbackFile, 'utf-8')
            try {
                feedbackList = JSON.parse(feedbackData)
            } catch(e) {
                feedbackList = []
            }
        }

        // Filter to only show user's own feedback if userId provided
        if (userId && userId === session.user.id) {
            feedbackList = feedbackList.filter(feedback => feedback.userId === userId)
        } else {
            // In production, you might want to restrict this to admin users only 
            // For now, users can only see their own feedback
            feedbackList = feedbackList.filter(feedback => feedback.userId === userId) 
        }

        // Sort by creation date (newest first)
        feedbackList.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        return NextResponse.json(feedbackList)
    } catch(error) {
        console.error("Error fetching feedback:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}