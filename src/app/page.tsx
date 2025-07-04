  "use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Text, Flex, Heading, Card } from "@radix-ui/themes"

export default function Home() {
    const router = useRouter()

    const handleGetStarted = () => {
      router.push("/auth/signin")
    }

    const handleBrowsePublic = () => {
  router.push("/stories/public")
    }

    return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        {/* Hero Section */}
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <Flex direction="column" gap="8" align="center">
            <div className="space-y-4">
              <Heading size="9" className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Stories Matter
              </Heading>
              <Text size="5" className="text-gray-600 max-w-2xl">
                A safe, private space for female immigrants to share their journeys,
                connect with others, and access support resources in the UK.
              </Text>
            </div>

            <Flex gap="4" className="mt-8">
              <Button size="4" onClick={handleGetStarted} className="bg-purple-600 hover:bg-purple-700">
                Share Your Story
              </Button>
              <Button size="4" variant="outline" onClick={handleBrowsePublic}>
                Read Stories
              </Button>
            </Flex>
          </Flex>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Text size="8">🔒</Text>
              </div>
              <Heading size="4" className="mb-2">Privacy First</Heading>
              <Text size="2" className="text-gray-600">
                Complete control over who sees your content. Anonymous sharing options available.
              </Text>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Text size="8">🤝</Text>
              </div>
              <Heading size="4" className="mb-2">Safe Community</Heading>
              <Text size="2" className="text-gray-600">
                Connect with others who understand your journey in a supportive environment.
              </Text>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Text size="8">📚</Text>
              </div>
              <Heading size="4" className="mb-2">UK Resources</Heading>
              <Text size="2" className="text-gray-600">
                Access to mental health support, legal aid, and other services specific to the UK.
              </Text>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/50 backdrop-blur-sm border-t mt-20">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <Text size="2" className="text-gray-500">
              Built with privacy and safety in mind. Your data is never tracked or sold.
            </Text>
          </div>
        </footer>
      </div>
    )
}
