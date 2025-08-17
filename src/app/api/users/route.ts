import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import fs from 'fs'
import path from 'path'

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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
                console.error("Error parsing users.json:", e)
                users = []
            }
        }

        // Return users with limited information for privacy
        const publicUsers = users.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            pseudonym: user.pseudonym,
            avatarSeed: user.avatarSeed
        }))

        return NextResponse.json(publicUsers)

    } catch (error) {
        console.error("Error fetching users:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}