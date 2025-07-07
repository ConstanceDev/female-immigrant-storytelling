 "use client"
import { useSession } from "next-auth/react";
import { useRouter  } from "next/navigation";
import { useEffect } from "react";
import { Button, Card, Text, Flex, Heading, Avatar } from "@radix-ui/themes";
import { createAvatar  } from '@dicebear/core';
import { initials } from '@dicebear/collection'

export default function Dashboard() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if(status === "loading") return
        if (!session) {
            router.push("/auth/signin")
        }
    }, [session, status, router])

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Text>Loading...</Text>
            </div>
        )
    }

    if(!session) {
        return null
    }

    //Generate avatar using DiceBear
    const avatar = createAvatar(initials, {
        seed: session.user?.avatarSeed || session.user?.name || 'default',
        backgroundColor: ['b6e3f4','c084fc','818cf8','fb7185','fbbf24'],
        backgroundType: ['solid']
    })

    const avatarUrl = avatar.toDataUri()

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Flex justify="between" align="center" className="h-16">
                        <Heading size="5">Your Stories</Heading>
                        <Flex align="center" gap="3">
                            <Avatar 
                                src={avatarUrl}
                                fallback={session.user?.pseudonym?.[0] || "U"}
                                size="2"
                            />
                            <Text size="2">{session.user?.pseudonym || session.user?.name}</Text>
                        </Flex>
                    </Flex>
                </div>
            </header>

             {/* Main Content */}
             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Create New Story Card */}
                    <Card 
                        className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => router.push("/stories/create")} 
                        >
                        <Flex direction="column" gap="4" align="center">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flx items-center justify-center">
                                <Text size="6">✍️</Text>
                            </div>
                            <Heading size="4">Share Your Story</Heading>
                            <Text size="2" className="text-center text-gray-600">
                                Create a new story with full privacy controls
                            </Text>
                            <Button size="2" className="mt-2">
                                Start Writing
                            </Button>
                        </Flex>
                    </Card>

                    {/* Browse Stories Card */} 
                    <Card 
                        className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => router.push("/stories/public")}
                        >
                        <Flex direction="column" gap="4" align="center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Text size="4">📚</Text>
                            </div>
                            <Heading size="4">Discover Stories</Heading>
                            <Text size="2" className="text-center text-gray-600">
                                Read inspiring stories from the community
                            </Text>
                            <Button size="2" variant="outline" className="mt-2">
                                Explore
                            </Button>
                        </Flex>
                    </Card>

                    {/* Community Resources Card */}  
                    <Card 
                        className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => router.push("/resources")} 
                        >
                        <Flex direction="column" gap="4" align="center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Text size="6">🤝</Text>
                            </div>
                            <Heading size="4">Get Support</Heading>
                            <Text size="2" className="text-center text-gray-600">
                                Access UK resources and support services
                            </Text>
                            <Button size="2" variant="outline" className="mt-2">
                                Find Help
                            </Button>
                        </Flex>
                    </Card>
                </div>

                {/* Recent Activity */}
                <div className="mt-12">
                    <Heading size="4" className="mb-6">Your Recent Stories</Heading>
                    <Card className="p-6">
                        <Text className="text-gray-500 text-center">
                            You haven&apos;t created any stories yet. Start sharing your journey!
                        </Text>
                    </Card>
                </div>
             </main>
        </div>
    )
}