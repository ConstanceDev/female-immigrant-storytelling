 "use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button, Card, Text, Flex, Heading, Avatar, TextArea } from "@radix-ui/themes"
import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'

interface Comment {
    id: string,
    storyId: string,
    content: string,
    authorId: string
    createdAt: string,
    author: {
        pseudonym: string,
        avatarSeed: string
    }
}

interface CommentsProps {
    storyId: string
}

export default function Comments({ storyId }: CommentsProps) {
    const { data: session } = useSession()
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        fetchComments()
}, [storyId])

const fetchComments = async () => {
    try {
        const response = await fetch(`/api/stories/${storyId}/comments`)
        if (response.ok) {
            const data = await response.json()
            setComments(data)
        }
    } catch (error) {
        console.error("Error fetching comments:", error)
    } finally {
        setLoading(false)
    }
}

const submitComment = async () => {
    if (!newComment.trim() || !session) return

    setSubmitting(true)
    try {
        const response = await fetch(`/api/stories/${storyId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: newComment.trim()
            })
        })

        if (response.ok) {
            const comment = await response.json()
            setComments([comment, ...comments])
            setNewComment('')
        } else {
            alert('Failed to post comment. Please try again.')
        }
    } catch (error) {
        console.error("Error posting comment:", error)
        alert("Failed to post comment. Please try again")
    } finally {
        setSubmitting(false)
    }
}

    const generateAvatar = (seed: string) => {
        return createAvatar(initials, {
            seed,
            backgroundColor: ['b6e3f4','c084fc','818cf8','fb7185','fbbf24'],
            backgroundType: ['solid'],
        }).toDataUri()
    }

    const formatDate = (dataString: string) => {
        return new Date(dataString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
    <div className="mt-8 border-t pt-6">
      <Heading size="4" className="mb-4">
        Comments ({comments.length})
      </Heading>

      {/* Comment Form */}
      {session ? (
        <Card className="p-4 mb-6">
          <Flex direction="column" gap="3">
            <TextArea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <Flex justify="end" gap="2">
              <Button
                variant="outline"
                onClick={() => setNewComment('')}
                disabled={submitting || !newComment.trim()}
              >
                Cancel
              </Button>
              <Button
                onClick={submitComment}
                disabled={submitting || !newComment.trim()}
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </Flex>
          </Flex>
        </Card>
      ) : (
        <Card className="p-4 mb-6">
          <Text className="text-gray-500 text-center">
            <a href="/auth/signin" className="text-blue-600 hover:underline">
              Sign in
            </a> to leave a comment
          </Text>
        </Card>
      )}

      {/* Comments List */}
      {loading ? (
        <Card className="p-4">
          <Text className="text-gray-500 text-center">Loading comments...</Text>
        </Card>
      ) : comments.length === 0 ? (
        <Card className="p-4">
          <Text className="text-gray-500 text-center">
            No comments yet. Be the first to share your thoughts!
          </Text>
        </Card>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id} className="p-4">
              <Flex gap="3">
                <Avatar
                  src={generateAvatar(comment.author.avatarSeed)}
                  fallback={comment.author.pseudonym[0]}
                  size="2"
                />
                <div className="flex-1">
                  <Flex justify="between" align="start" className="mb-2">
                    <Text size="2" weight="medium">
                      {comment.author.pseudonym}
                    </Text>
                    <Text size="1" className="text-gray-500">
                      {formatDate(comment.createdAt)}
                    </Text>
                  </Flex>
                  <Text size="2" className="whitespace-pre-wrap">
                    {comment.content}
                  </Text>
                </div>
              </Flex>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
