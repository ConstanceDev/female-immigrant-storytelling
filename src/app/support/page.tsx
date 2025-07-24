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
              variant="ghost"
              onClick={() => router.push("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </Flex>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Support Resources */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <Heading size="4" className="mb-4">Quick Help</Heading>

              <div className="space-y-4">
                <div>
                  <Text size="3" weight="medium" className="block mb-2">
                    Frequently Asked Questions
                  </Text>
                  <div className="space-y-2">
                    <Text size="2" className="block">
                      • How do I create multiple personas?
                    </Text>
                    <Text size="2" className="block">
                      • How do I control story visibility?
                    </Text>
                    <Text size="2" className="block">
                      • How do I delete my account?
                    </Text>
                    <Text size="2" className="block">
                      • How do I report inappropriate content?
                    </Text>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <Text size="3" weight="medium" className="block mb-2">
                    Community Guidelines
                  </Text>
                  <Text size="2" className="block mb-2">
                    Our platform is designed to be a safe space for sharing experiences. Please be respectful and supportive of others.
                  </Text>
                  <Button variant="outline" size="2">
                    <ExternalLink size={16} />
                    Read Full Guidelines
                  </Button>
                </div>

                <Separator className="my-4" />

                <div>
                  <Text size="3" weight="medium" className="block mb-2">
                    Emergency Support
                  </Text>
                  <Text size="2" className="block mb-2">
                    If you're in immediate danger or crisis, please contact emergency services or visit our Safety Resources page.
                  </Text>
                  <Button
                    color="red"
                    size="2"
                    onClick={() => router.push("/safety")}
                  >
                    <AlertCircle size={16} />
                    Safety Resources
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <Heading size="4" className="mb-4">Contact Information</Heading>
              <div className="space-y-3">
                <Flex align="center" gap="2">
                  <Mail size={16} />
                  <Text size="2">support@femalestories.uk</Text>
                </Flex>
                <Text size="2" className="text-gray-600">
                  We typically respond within 24-48 hours
                </Text>
              </div>
            </Card>
          </div>

          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Heading size="4" className="mb-4">Send us your feedback</Heading>

              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={48} className="mx-auto text-green-600 mb-4" />
                  <Heading size="3" className="mb-2">Thank you for your feedback!</Heading>
                  <Text size="2" className="text-gray-600 mb-4">
                    We&apos;ve received your message and will get back to you soon.
                  </Text>
                  <Button onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category Selection */}
                  <div>
                    <Text as="label" size="3" weight="medium" className="block mb-3">
                      What can we help you with? *
                    </Text>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            <div className={`p-3 border rounded-lg transition-all ${
                              formData.category === value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}>
                              <Flex align="center" gap="2">
                                <Icon size={16} />
                                <Text size="2">{label}</Text>
                              </Flex>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <Text as="label" size="3" weight="medium" className="block mb-2">
                      Email Address *
                    </Text>
                    <TextField.Root
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                    <Text size="1" className="text-gray-500 mt-1">
                      We&apos;ll use this to respond to your message
                    </Text>
                  </div>

                  {/* Subject */}
                  <div>
                    <Text as="label" size="3" weight="medium" className="block mb-2">
                      Subject *
                    </Text>
                    <TextField.Root
                      placeholder="Brief description of your issue or feedback"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Text as="label" size="3" weight="medium" className="block mb-2">
                      Message *
                    </Text>
                    <TextArea
                      placeholder="Please provide as much detail as possible. If reporting a bug, include steps to reproduce the issue."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      required
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <Text size="2" color="red">{error}</Text>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Flex justify="end" gap="3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/dashboard")}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting || !formData.category || !formData.subject || !formData.message}
                    >
                      {submitting ? 'Sending...' : 'Send Feedback'}
                    </Button>
                  </Flex>
                </form>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}