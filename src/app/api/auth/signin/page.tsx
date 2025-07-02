import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Text, Flex, Heading } from "@radix-ui/themes"

export default function SignIn() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.push("/dashboard")
            }
        })
    }, [router])

    const handleGoogleSignIn = async () => {
        setIsLoading(true)
        try {
            await signIn("google", { callbackUrl: "/dashboard" })
        } catch (error) {
            console.error("Sign in error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleAnonymousAccess = () => {
        // For anonymous browsing,redirect to public stories
        router.push("/stories/public")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br
        from-purple-50 to-pink-50 p-4">
            <Card className="w-full max-w-md p-6">
                <Flex direction="column" gap="6" align="center">
                    <Heading size="6" className="text-center">
                        Welcome to your Safe Space!
                    </Heading>

                    <Text size="3" className="text-center text-gray-600">
                        A privacy first platform for sharing your story
                    </Text>

                    <Flex direction="column" gap="4" className="w-full">
                        <Button
                            size="3"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                            {isLoading ? "Signing in..." : "Continue with Google"}
                        </Button>

                        <Button
                            size="3"
                            variant="outline"
                            onClick={handleAnonymousAccess}
                            className="w-full"
                        >
                            Browse Anonymously
                        </Button>
                    </Flex>

                    <div className="text-xs text-gray-500 text-center">
                        <Text size="1">
                            Your privacy is our priority. we never track or store unnecessary data.
                            <br />
                        </Text>
                    </div>
                </Flex>
            </Card>
        </div>
    )
}