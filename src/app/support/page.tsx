"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation" 
import {
    Card,
    Text,
    Flex,
    Heading,
    Button,
    TextArea,
    TextField,
    Select,
    Badge,
    Separator
} from "@radix-ui/themes"
import {
    MessageCircle,
    Mail,
    FileText,
    Bug,
    Lightbulb,
    AlertCircle,
    CheckCircle,
    ExternalLink
} from "lucide-react"

const feedbackCategories = [
    { value: "bug", label: "Bug Report", icon: Bug, color: "red" as const },
    { value: "feature", label: "Feature Request", icon: Lightbulb, color: "blue" as const },
    { value: "content", label: "Content Issue", icon: FileText, color: "orange" as const },
    { value: "account", label: "Account Help", icon: AlertCircle, color: "yellow" as const },
    { value: "general", label: "General Feedback", icon: MessageCircle, color: "green" as const }
]

export default function SupportPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [formData, setFormData] = useState({
        category: "",
        subject: "",
        message: "",
        email: session?.user?.email || ""
    })
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.category || !formData.subject || !formData.message) {
            setError("Please fill in all required fields")
            return
        }

        setSubmitting(true)
        setError("")

        try {
            const response = await fetch(`/api/support/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userId: session?.user?.id,
                    userAgent: navigator.userAgent,
                    url: window.location.href
                })
            })

            if (response.ok) {
                setSubmitted(true)
                setFormData({
                    category: "",
                    subject: "",
                    message: "",
                    email: session?.user?.email || ""
                })
            } else {
                const data = await response.json()
                setError(data.error || "Failed to submit feedback. Please try again.")
            }
        } catch(error) {
            setError("Failed to submit feedback. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (error) setError("")
    }

    return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Flex justify="between" align="center" className="h-16">
            <Heading size="5">Support & Feedback</Heading>
            <Button 
                variant="outline" 
                onClick={() => router.push("/dashboard")}
            >
                Back to Dashboard
            </Button>
            </Flex>
        </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Introduction */}
        <div className="text-center mb-12">
            <Heading size="6" className="mb-4">How can we help you?</Heading>
            <Text size="3" className="text-gray-600 max-w-2xl mx-auto">
            Whether you need technical help, want to report an issue, or have suggestions for improvement,
            we&apos;re here to listen and assist you.
            </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Quick Actions Sidebar */}
            <div className="lg:col-span-1 space-y-6">
            {/* FAQ Quick Access */}
            <Card className="p-4">
                <Heading size="3" className="mb-3">Quick Answers</Heading>
                <div className="space-y-2">
                <Button variant="ghost" size="1" className="justify-start w-full text-left p-2">
                    <Text size="2">📝 How to create personas?</Text>
                </Button>
                <Button variant="ghost" size="1" className="justify-start w-full text-left p-2">
                    <Text size="2">👁️ Story visibility controls</Text>
                </Button>
                <Button variant="ghost" size="1" className="justify-start w-full text-left p-2">
                    <Text size="2">🗑️ Delete account</Text>
                </Button>
                <Button variant="ghost" size="1" className="justify-start w-full text-left p-2">
                    <Text size="2">🚨 Report content</Text>
                </Button>
                </div>
            </Card>

            {/* Emergency Support */}
            <Card className="p-4 bg-red-50 border-red-200">
                <Heading size="3" className="mb-2 text-red-800">Emergency?</Heading>
                <Text size="2" className="mb-3 text-red-700">
                In crisis or immediate danger?
                </Text>
                <Button 
                color="red" 
                size="2"
                onClick={() => router.push("/safety")}
                className="w-full"
                >
                <AlertCircle size={16} />
                Safety Resources
                </Button>
            </Card>

            {/* Contact Info */}
            <Card className="p-4">
                <Heading size="3" className="mb-3">Contact Info</Heading>
                <div className="space-y-2">
                <Flex align="center" gap="2">
                    <Mail size={14} />
                    <Text size="2">support@femalestories.uk</Text>
                </Flex>
                <Text size="1" className="text-gray-500">
                    Response: 24-48 hours
                </Text>
                </div>
            </Card>
            </div>

            {/* Feedback Form */}
            <div className="lg:col-span-3">
            <Card className="p-8">
                <Heading size="5" className="mb-6">Send us your feedback</Heading>

                {submitted ? (
                <div className="text-center py-12">
                    <CheckCircle size={48} className="mx-auto text-green-600 mb-4" />
                    <Heading size="3" className="mb-2">Thank you for your feedback!</Heading>
                    <Text size="2" className="text-gray-600 mb-4">
                    We've received your message and will get back to you soon.
                    </Text>
                    <Button onClick={() => setSubmitted(false)}>
                    Send Another Message
                    </Button>
                </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Category Selection */}
                    <div>
                    <Text as="label" size="4" weight="medium" className="block mb-4">
                        What can we help you with? *
                    </Text>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {feedbackCategories.map(({ value, label, icon: Icon, color }) => (
                        <div key={value}>
                            <label className="cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                value={value}
                                checked={formData.category === value}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className="sr-only"
                            />
                            <div className={`p-4 border rounded-lg transition-all text-center ${
                                formData.category === value 
                                ? 'border-blue-500 bg-blue-50 shadow-sm' 
                                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                            }`}>
                                <Icon size={20} className="mx-auto mb-2" />
                                <Text size="2" weight="medium">{label}</Text>
                            </div>
                            </label>
                        </div>
                        ))}
                    </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                        <Text as="label" size="3" weight="medium" className="block mb-3">
                        Email Address *
                        </Text>
                        <TextField.Root
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        size="3"
                        />
                        <Text size="1" className="text-gray-500 mt-2">
                        We'll use this to respond to your message
                        </Text>
                    </div>

                    {/* Subject */}
                    <div>
                        <Text as="label" size="3" weight="medium" className="block mb-3">
                        Subject *
                        </Text>
                        <TextField.Root
                        placeholder="Brief description of your issue or feedback"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                        size="3"
                        />
                    </div>
                    </div>

                    {/* Message */}
                    <div>
                    <Text as="label" size="3" weight="medium" className="block mb-3">
                        Message *
                    </Text>
                    <TextArea
                        placeholder="Please provide as much detail as possible. If reporting a bug, include steps to reproduce the issue."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={8}
                        required
                        className="resize-none"
                    />
                    </div>

                    {/* Error Message */}
                    {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <Text size="2" color="red">{error}</Text>
                    </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-gray-100">
                    <Flex justify="end" gap="4">
                        <Button
                        type="button"
                        variant="outline"
                        size="3"
                        onClick={() => router.push("/dashboard")}
                        disabled={submitting}
                        >
                        Cancel
                        </Button>
                        <Button
                        type="submit"
                        size="3"
                        disabled={submitting || !formData.category || !formData.subject || !formData.message}
                        className="px-8"
                        >
                        {submitting ? 'Sending...' : 'Send Feedback'}
                        </Button>
                    </Flex>
                    </div>
                </form>
                )}
            </Card>
            </div>
        </div>
        </main>
    </div>
    )
}