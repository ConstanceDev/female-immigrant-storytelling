import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import fs from 'fs'
import path from 'path'

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { avatarSeed, avatarStyle } = await req.json()

        if (!avatarSeed) {
            return NextResponse.json({ error: "Avatar seed is required" }, { status: 400 })
        }

        // Load users database
        const dataDir = path.join(process.cwd(), 'data')
        const usersDbPath = path.join(dataDir, 'users.json')

        let users = []
        if (fs.existsSync(usersDbPath)) {
            const usersData = fs.readFileSync(usersDbPath, 'utf-8')
            try {
                users = JSON.parse(usersData)
            } catch (e) {
                users = []
            }
        }

        // Find and update user
        const userIndex = users.findIndex((user: any) => user.id === session.user.id)
        
        if (userIndex !== -1) {
            // Update existing user
            users[userIndex] = {
                ...users[userIndex],
                avatarSeed,
                avatarStyle: avatarStyle || 'initials',
                updatedAt: new Date().toISOString()
            }
        } else {
            // Create new user record
            users.push({
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                avatarSeed,
                avatarStyle: avatarStyle || 'initials',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })
        }

        // Ensure data directory exists
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
        }

        // Save updated users
        fs.writeFileSync(usersDbPath, JSON.stringify(users, null, 2))

        return NextResponse.json({ 
            success: true, 
            message: "Avatar updated successfully",
            avatarSeed,
            avatarStyle 
        })

    } catch (error) {
        console.error("Error updating avatar:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Load users database
        const dataDir = path.join(process.cwd(), 'data')
        const usersDbPath = path.join(dataDir, 'users.json')

        if (!fs.existsSync(usersDbPath)) {
            return NextResponse.json({ 
                avatarSeed: session.user.name || 'default',
                avatarStyle: 'initials' 
            })
        }

        const usersData = fs.readFileSync(usersDbPath, 'utf-8')
        let users = []
        try {
            users = JSON.parse(usersData)
        } catch (e) {
            return NextResponse.json({ 
                avatarSeed: session.user.name || 'default',
                avatarStyle: 'initials' 
            })
        }

        // Find user
        const user = users.find((user: any) => user.id === session.user.id)
        
        return NextResponse.json({
            avatarSeed: user?.avatarSeed || session.user.name || 'default',
            avatarStyle: user?.avatarStyle || 'initials'
        })

    } catch (error) {
        console.error("Error fetching avatar:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}