"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import PersonaSelector, { Persona } from "@/components/persona/PersonaSelector"

export default function CreateStory() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        contentType: "text",
        tags: "",
        contentWarnings: "",
        visibility: "private",
        expiresAt: "",
        publishAt: "",
        searchIndexable: false
    })

    if (status === "loading") {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    if (!session) {
        router.push("/auth/signin")
        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/stories", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    ...formData,
                    personaId: selectedPersona?.id,
                    tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
                    contentWarnins: formData.contentWarnings.split(",").map(warning => warning.trim()).filter(Boolean),
                    expiresAt: formData.expiresAt ? new Date(formData.expiresAt).toISOString() : null,
                    publishAt: formData.publishAt ? new Date(formData.publishAt).toISOString() : null,
                })
            })

            if (response.ok) {
                router.push("/dashboard")
            } else {
                alert("Failed to create story, Please try again")
            }
        } catch (error) {
            console.error("Error creating story:", error)
            alert("An error occurred. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-semibold">Share Your Story</h1>
              <button
                onClick={() => router.push("/dashboard")}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Persona Selection */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <PersonaSelector
                selectedPersonaId={selectedPersona?.id}
                onPersonaSelect={(personId, persona) => setSelectedPersona(persona)}
                onCreatePersona={() => router.push('/profile#personas')}
              />
            </div>

            {/* Story Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Story Title *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Give your story a meaningful title..."
              />
            </div>

            {/* Story Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 
mb-2">
                Your Story *
              </label>
              <textarea
                id="content"
                required
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Share your journey, experiences, challenges, or victories..."
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags (optional)
              </label>
              <input
                type="text"
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="immigration, work, family, education, healthcare (separate with commas)"
              />
            </div>

            {/* Content Warnings */}
            <div>
              <label htmlFor="contentWarnings" className="block text-sm font-medium text-gray-700 mb-2">
                Content Warnings (optional)
              </label>
              <input
                type="text"
                id="contentWarnings"
                value={formData.contentWarnings}
                onChange={(e) => setFormData({...formData, contentWarnings: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="discrimination, mental health, violence (separate with commas)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Help others prepare for potentially triggering content
              </p>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>

              <div className="space-y-4">
                {/* Visibility */}
                <div>
                  <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-2">
                    Who can see this story?
                  </label>
                  <select
                    id="visibility"
                    value={formData.visibility}
                    onChange={(e) => setFormData({...formData, visibility: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="private">Only me (Private)</option>
                    <option value="trusted_circle">My trusted circle</option>
                    <option value="anonymous_public">Anonymous public sharing</option>
                  </select>
                </div>

                {/* Auto-delete */}
                <div>
                  <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 mb-2">
                    Auto-delete after (optional)
                  </label>
                  <input
                    type="datetime-local"
                    id="expiresAt"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({...formData, expiresAt: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Your story will be automatically deleted at this time
                  </p>
                </div>

                {/* Schedule Publishing */}
                <div>
                  <label htmlFor="publishAt" className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule for later (optional)
                  </label>
                  <input
                    type="datetime-local"
                    id="publishAt"
                    value={formData.publishAt}
                    onChange={(e) => setFormData({...formData, publishAt: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Search Engine Indexing */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="searchIndexable"
                    checked={formData.searchIndexable}
                    onChange={(e) => setFormData({...formData, searchIndexable: e.target.checked})}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="searchIndexable" className="ml-2 block text-sm text-gray-700">
                    Allow search engines to find this story (only for public stories)
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                {isSubmitting ? "Publishing..." : "Publish Story"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </main>
      </div>
    )
}