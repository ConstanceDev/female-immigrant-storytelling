"use client"

  import { useSession } from "next-auth/react";
  import { useRouter } from "next/navigation";
  import { useEffect, useState } from "react";
  import { Button, Card, Text, Flex, Heading, Avatar, Badge } from "@radix-ui/themes";
  import { createAvatar } from '@dicebear/core';
  import { initials } from '@dicebear/collection'
  import ThemeToolbar from "@/contexts/ThemeToolbar";
  import MediaViewer from "@/components/stories/MediaViewer";

  interface Story {
      id: string
      title: string
      content: string
      tags: string[]
      contentWarnings: string[] | string
      visibility: string
      createdAt: string
      updatedAt: string
      personaId: string
      mediaFiles?: string[]
      author: {
          pseudonym: string
          avatarSeed: string
      }
      _count: {
          comments: number
      }
  }

  export default function Dashboard() {
      const { data: session, status } = useSession()
      const router = useRouter()
      const [stories, setStories] = useState<Story[]>([])
      const [loading, setLoading] = useState(true)

      useEffect(() => {
          if(status === "loading") return
          if (!session) {
              router.push("/auth/signin")
          } else {
              fetchUserStories()
          }
      }, [session, status, router])

      const fetchUserStories = async () => {
          try {
              if (!session?.user?.id) return

              const response = await fetch(`/api/stories?userId=${session.user.id}`)
              if (response.ok) {
                  const data = await response.json()
                  setStories(data)
              }
          } catch (error) {
              console.error("Error fetching user stories:", error)
          } finally {
              setLoading(false)
          }
      }

      const deleteStory = async (storyId: string) => {
          if (!confirm("Are you sure you want to delete this story? This action cannot be undone.")) {
              return
          }

          try {
              const response = await fetch(`/api/stories/${storyId}`,{
                  method: 'DELETE'
              })

              if (response.ok) {
                  // Remove the story from local state
                  setStories(stories.filter(story => story.id !== storyId))
              } else {
                  alert("Failed to delete story. Please try again.")
              }
          } catch (error) {
              console.error("Error deleting story:", error)
              alert("Failed to delete story. Please try again.")
          }
      }

      const formatDate = (dateString: string) => {
          return new Date(dateString).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
          })
      }

      const getVisibilityBadge = (visibility: string) => {
          switch (visibility) {
              case 'anonymous_public':
                  return <Badge color="green" size="1">Public</Badge>
              case 'private':
                  return <Badge color="gray" size="1">Private</Badge>
              case 'trusted_circle':
                  return <Badge color="blue" size="1">Trusted Circle</Badge>
              case 'selected_users':
                  return <Badge color="purple" size="1">Selected Users</Badge>
              default:
                  return <Badge color="gray" size="1">{visibility}</Badge>
          }
      }

      const truncateContent = (content: string, maxLength: number = 150) => {
          if (content.length <= maxLength) return content
          return content.substring(0, maxLength) + "..."
      }

      const getPersonaAvatar = (story: Story) => {
          const avatar = createAvatar(initials, {
              seed: story.author.avatarSeed || story.id,
              backgroundColor: ['b6e3f4','c084fc','818cf8','fb7185','fbbf24'],
              backgroundType: ['solid']
          })
          return avatar.toDataUri()
      }

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
                  <ThemeToolbar />
                  <Button 
                    variant="ghost" 
                    onClick={() => router.push("/profile")}
                    className="flex items-center gap-2"
                  >
                    <Avatar
                      src={avatarUrl}
                      fallback={(session.user?.pseudonym || session.user?.name).charAt(0)?.toUpperCase() ||"U"}
                      size="2"
                    />
                    <Text size="2">{session.user?.pseudonym || session.user?.name}</Text>
                  </Button>
                </Flex>
              </Flex>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 max-w-none">
              {/* Create New Story Card */}
              <Card 
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push("/stories/create")}
              >
                <Flex direction="column" gap="4" align="center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
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
                    <Text size="6">📚</Text>
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

              {/* Trusted Circle Card */}
              <Card 
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push("/trusted-circle")}
              >
                <Flex direction="column" gap="4" align="center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Text size="6">🔒</Text>
                  </div>
                  <Heading size="4">My Trusted Circle</Heading>
                  <Text size="2" className="text-center text-gray-600">
                    Stories shared privately with you
                  </Text>
                  <Button size="2" variant="outline" className="mt-2">
                    View Circle
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
                  <Heading size="4">Community Resources</Heading>
                  <Text size="2" className="text-center text-gray-600">
                    UK services, housing, healthcare & legal aid
                  </Text>
                  <Button size="2" variant="outline" className="mt-2">
                    Browse Resources
                  </Button>
                </Flex>
              </Card>

              {/* Support & Feedback Card */}
            <Card
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/support")}
            >
              <Flex direction="column" gap="4" align="center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Text size="6">💬</Text>
                </div>
                <Heading size="4">Help & Feedback</Heading>
                <Text size="2" className="text-center text-gray-600">
                  Report issues, request features & contact us
                </Text>
                <Button size="2" variant="outline" className="mt-2">
                  Contact Us
                </Button>
              </Flex>
            </Card>

              {/* Safety & Support Card */}
              <Card 
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-red-200"
                onClick={() => router.push("/safety")}
              >
                <Flex direction="column" gap="4" align="center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Text size="6">🚨</Text>
                  </div>
                  <Heading size="4">Crisis Support</Heading>
                  <Text size="2" className="text-center text-gray-600">
                    Emergency helplines & mental health resources
                  </Text>
                  <Button size="2" variant="outline" className="mt-2 text-red-600 border-red-300 hover:bg-red-50">
                    Emergency Help
                  </Button>
                </Flex>
              </Card>
            </div>

            {/* Your Stories Section */}
            <div className="mt-12">
              <Flex justify="between" align="center" className="mb-6">
                <Heading size="4">Your Recent Stories</Heading>
                <Text size="2" className="text-gray-500">
                  {stories.length} {stories.length === 1 ? 'story' : 'stories'}
                </Text>
              </Flex>

              {loading ? (
                <Card className="p-6">
                  <Text className="text-gray-500 text-center">Loading your stories...</Text>
                </Card>
              ) : stories.length === 0 ? (
                <Card className="p-6">
                  <Text className="text-gray-500 text-center">
                    You haven&apos;t created any stories yet. Start sharing your journey!
                  </Text>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stories.map((story) => (
                    <Card key={story.id} className="p-6 hover:shadow-md transition-shadow">
                      <Flex direction="column" gap="3">
                        {/* Header with visibility badge */}
                        <Flex justify="between" align="start">
                          <div className="flex-1">
                            <Heading size="3" className="mb-2 line-clamp-2">
                              {story.title}
                            </Heading>
                          </div>
                          {getVisibilityBadge(story.visibility)}
                        </Flex>

                        {/* Persona Info */}
                        <Flex align="center" gap="2" className="pb-2 border-b border-gray-100">
                          <Avatar
                            src={getPersonaAvatar(story)}
                            fallback={story.author?.pseudonym?.charAt(0)?.toUpperCase() || "P"}
                            size="1"
                          />
                          <Text size="1" className="text-gray-500">
                            Posted as {story.author.pseudonym}
                          </Text>
                        </Flex>

                        {/* Content Preview */}
                        <Text size="2" className="text-gray-600 line-clamp-3">
                          {truncateContent(story.content)}
                        </Text>

                        {/* Media Files Preview */}
                        {story.mediaFiles && story.mediaFiles.length > 0 && (
                          <div  className="mt-2">
                            <MediaViewer
                              mediaFiles={story.mediaFiles.slice(0, 2)}
                              showDownload={false}
                              className="space-y-2"
                            />
                            {story.mediaFiles.length > 2 && (
                              <Text size="1" className="text-gray-400 mt-1">
                                +{story.mediaFiles.length - 2} more files
                              </Text>
                            )}
                          </div>
                        )}

                        {/* Tags */}
                        {story.tags && story.tags.length > 0 && (
                          <Flex gap="1" wrap="wrap">
                            {story.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} color="purple" size="1">
                                {tag}
                              </Badge>
                            ))}
                            {story.tags.length > 2 && (
                              <Text size="1" className="text-gray-400">
                                +{story.tags.length - 2} more
                              </Text>
                            )}
                          </Flex>
                        )}

                        {/* Footer */}
                        <Flex justify="between" align="center" className="pt-2 border-t">
                          <div>
                            <Text size="1" className="text-gray-500">
                              {formatDate(story.createdAt)}
                            </Text>
                            <Text size="1" className="text-gray-400 block">
                              💬 {story._count.comments} comments
                            </Text>
                          </div>

                          <Flex gap="2">
                            <Button 
                              size="1" 
                              variant="outline"
                              onClick={() => router.push(`/stories/edit/${story.id}`)}
                            >
                              Edit
                            </Button>
                            <Button 
                              size="1" 
                              color="red" 
                              variant="outline"
                              onClick={() => deleteStory(story.id)}
                            >
                              Delete
                            </Button>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      )
  }