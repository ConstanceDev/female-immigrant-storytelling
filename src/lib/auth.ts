import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../lib/prisma"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                try {
                    // Check if user already has a pseudonym
                    const existingUser = await prisma.user.findUnique({
                        where: { email: user.email! },
                        select: { pseudonym: true }
                    })
                    if (!existingUser?.pseudonym) {
                        const pseudonym = await generateUniquePseudonym()
                        await prisma.user.update({
                            where: { email: user.email! },
                            data: { pseudonym }
                        })
                    }
                } catch (error) {
                    console.error("Error in signIn callback:", error)
                }
            }
            return true
        },
        async session({ session, user }) {
            if(session.user) {
                session.user.id = user.id
                try {
                // Get user's pseudonym from database
                const dbUser = await prisma.user.findUnique({
                    where: { id: user.id },
                    select: { pseudonym: true, avatarSeed: true }
                })
                if (dbUser) {
                    session.user.pseudonym = dbUser.pseudonym
                    session.user.avatarSeed = dbUser.avatarSeed
                }
            } catch (error) {
                console.error("Error in session callback:", error)
            }
        }
            return session
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: "database",
    },
    debug: process.env.NODE_ENV === "development",
}

async function generateUniquePseudonym(): Promise<string> {
    const adjectives = [
     "Brave", "Strong", "Wise", "Kind", "Gentle", "Bold", "Calm", "Free",
     "Bright", "Hope", "Grace", "Joy", "Peace", "Dream", "Star", "Moon"  
    ]
    
    const nouns = [
    "Warrior", "Spirit", "Heart", "Soul", "Voice", "Story", "Journey", "Path",
    "Bridge", "Light", "Dawn", "Bloom", "River", "Mountain", "Ocean", "Sky"
    ]

    let attempts = 0
    while (attempts < 10) {
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
        const noun = nouns[Math.floor(Math.random() * nouns.length)]
        const number = Math.floor(Math.random() * 999) + 1
        const pseudonym = `${adjective}${noun}${number}`

        const existing = await prisma.user.findUnique({
            where: { pseudonym }
        })

        if (!existing) {
            return pseudonym
        }
        attempts++
    }
    //Fallback to timestamp-based pseudonym
    return `Anonymous${Date.now()}`
}