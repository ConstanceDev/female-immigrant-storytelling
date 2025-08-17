"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'
import { Heading } from "@radix-ui/themes"
import Comments from "@/components/stories/Comments"
import MediaViewer from "@/components/stories/MediaViewer"
import ContentWarning from "@/components/safety/ContentWarning"

interface Story {
  id: string
  title: string
  content: string
  tags: string[]
  contentWarnings: string[] | string
  createdAt: string
  mediaFiles?: string[]
  visibility: string
  selectedUserIds?: string[]
  author: {
    pseudonym: string
    avatarSeed: string
  }
  _count: {
    comments: number
  }
}

export default function TrustedCircle() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredStories, setFilteredStories] = useState<Story[]>([])

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/auth/signin")
    } else {
      fetchTrustedCircleStories()
    }
  }, [session, status, router])

  // Filter stories based on selected tags and search query
  useEffect(() => {
    let filtered = stories

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.author.pseudonym.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(story => 
          selectedTags.every(tag => story.tags.includes(tag))
      )
    }

    setFilteredStories(filtered)
  }, [stories, selectedTags, searchQuery])

  const fetchTrustedCircleStories = async () => {
    try {
      const response = await fetch("/api/stories")
      if (response.ok) {
        const data = await response.json()
        // Filter for trusted circle stories where current user has access
        const trustedCircleStories = data.filter((story: Story) => 
          story.visibility === "trusted_circle" && 
          story.selectedUserIds && 
          story.selectedUserIds.includes(session?.user?.id)
        )
        setStories(trustedCircleStories)
        setFilteredStories(trustedCircleStories)
      }
    } catch (error) {
      console.error("Error fetching trusted circle stories:", error)
    } finally {
      setLoading(false)
    }
  }

  // Function to refresh stories (can be called from child components)
  const refreshStories = () => {
    fetchTrustedCircleStories()
  }

  const generateAvatar = (seed: string) => {
    return createAvatar(initials, {
      seed,
      backgroundColor: ['b6e3f4','c084fc','818cf8','fb7185','fbbf24'],
      backgroundType: ['solid'],
    }).toDataUri()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  const hasContentWarnings = (warnings: string[] | string) => {
    if (!warnings) return false

    if (Array.isArray(warnings)) {
      return warnings.length > 0 && warnings.some(w => w && typeof w === 'string' && w.trim() !== '')
    }

    return typeof warnings === 'string' && warnings.trim() !== ''
  }

  const getContentWarningsText = (warnings: string[] | string) => {
    if (!warnings) return ""
    if (Array.isArray(warnings)) {
      return warnings.filter(w => w && w.trim() !== '').join(", ")
    }
    return typeof warnings === 'string' && warnings.trim() !== '' ? warnings : ""
  }

  // Get all unique tags from stories
  const getAllTags = () => {
    const tagSet = new Set<string>()
    stories.forEach(story => {
      story.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearAllFilters = () => {
    setSelectedTags([])
    setSearchQuery("")
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trusted circle stories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Heading size="5">My Trusted Circle</Heading>
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="text-gray-600 hover:text-gray-800"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => router.push("/stories/create")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Share Your Story
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Bar */}
      {stories.length > 0 && (
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search trusted circle stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Tags Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">Filter by tags:</h3>
                {(selectedTags.length > 0 || searchQuery) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {getAllTags().map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
                {getAllTags().length === 0 && (
                  <p className="text-sm text-gray-500">No tags available yet</p>
                )}
              </div>

              {/* Results count */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Showing {filteredStories.length} of {stories.length} stories
                  {selectedTags.length > 0 && (
                    <span> with tags: {selectedTags.join(', ')}</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {stories.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Trusted Circle Stories Yet</h2>
            <p className="text-gray-600 mb-8">
              You haven't been added to anyone's trusted circle, or no stories have been shared with you yet.
              When someone shares a story with their trusted circle and includes you, it will appear here.
            </p>
            <button
              onClick={() => router.push("/stories/create")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Share Your Own Story
            </button>
          </div>
        ) : filteredStories.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Stories Found</h2>
            <p className="text-gray-600 mb-4">
              No stories match your current filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear filters to see all stories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedStory(story)}
              >
                {/* Content Warnings */}
                {story.contentWarnings && story.contentWarnings.length > 0 && (
                  <div className="mb-3">
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      ⚠️ Content Warning
                    </div>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {story.title}
                </h3>

                {/* Content Preview */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {truncateContent(story.content)}
                </p>

                {/* Media Files Preview */}
                {story.mediaFiles && story.mediaFiles.length > 0 && (
                <div  className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Media</h4>
                  <MediaViewer
                    mediaFiles={story.mediaFiles}
                    showDownload={true}
                    className="space-y-4"
                  />
                </div>
                )}

                {/* Tags */}
                {story.tags && story.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.tags.slice(0, 3).map((tag, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleTag(tag)
                        }}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    {story.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{story.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Author and Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={generateAvatar(story.author.avatarSeed)}
                      alt="Author avatar"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-700">{story.author.pseudonym}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(story.createdAt)}
                  </div>
                </div>

                {/* Comments count */}
                <div className="mt-3 text-sm text-gray-500">
                  💬 {story._count.comments} {story._count.comments === 1 ? 'comment' : 'comments'}
                </div>

                {/* Trusted Circle Indicator */}
                <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  🔒 Trusted Circle
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  {hasContentWarnings(selectedStory.contentWarnings) && (
                    <div className="mb-3">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        ⚠️ Content Warning: {getContentWarningsText(selectedStory.contentWarnings)}
                      </div>
                    </div>
                  )}
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedStory.title}
                  </h2>
                  <div className="flex items-center">
                    <img
                      src={generateAvatar(selectedStory.author.avatarSeed)}
                      alt="Author avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{selectedStory.author.pseudonym}</p>
                      <p className="text-sm text-gray-500">{formatDate(selectedStory.createdAt)}</p>
                    </div>
                  </div>
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    🔒 Shared with Trusted Circle
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Story Content */}
              <div className="prose max-w-none mb-6">
                <ContentWarning warnings={selectedStory.contentWarnings || []}>
                  <div className="whitespace-pre-wrap text-gray-800 text-lg leading-relaxed">
                    {selectedStory.content}
                  </div>
                </ContentWarning>
              </div>

              {/* Media Files */}
              {selectedStory.mediaFiles && selectedStory.mediaFiles.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Media</h4>
                  <MediaViewer
                    mediaFiles={selectedStory.mediaFiles}
                    showDownload={true}
                    className="space-y-4"
                  />
                </div>
              )}

              {/* Tags */}
              {selectedStory.tags && selectedStory.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedStory.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Report Content */}
              <div className="pt-4 mt-6 mb-6">
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-3">
                    Found something inappropriate or concerning?
                  </p>
                  <button
                    onClick={() => {
                      const reportUrl = `/support?category=content-issue&subject=${encodeURIComponent(`Report Story: ${selectedStory.title} (ID: ${selectedStory.id})`)}&storyId=${selectedStory.id}`
                      router.push(reportUrl)
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                    title="Report inappropriate content"
                  >
                    🚨 Report Content
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <Comments storyId={selectedStory.id} onCommentChange={refreshStories} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}