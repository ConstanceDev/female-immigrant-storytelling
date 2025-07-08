"use client"

import { useState } from "react"
import { Button, Card, Text, Flex, Heading } from "@radix-ui/themes"

interface ContentWarningProps {
    warnings: string[]
    children: React.ReactNode
}

export default function ContentWarning({ warnings, children }: ContentWarningProps) {
    const [showContent, setShowContent] = useState(false)

    if  (!warnings || warnings.length === 0) {
        return (
            <div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <Text size="2" style={{ color: 'rgb(146 64 14)' }}>
                        <strong>Content Warning:</strong> {warnings.join(", ")}
                    </Text>
                </div>
                {children}
            </div>
        )
    }

    return (
    <Card className="p-6 bg-yellow-50 border-2 border-yellow-200">
      <Flex direction="column" gap="4" align="center">
        <div className="text-center">
          <Text size="6" className="mb-2">⚠️</Text>
          <Heading size="4" className="mb-2">Content Warning</Heading>
          <Text size="2" style={{ color: 'rgb(146 64 14)' }}>
            This content may contain references to: <strong>{warnings.join(", ")}</strong>
          </Text>
        </div>

        <Text size="2" style={{ color: 'rgb(75 85 99)' }} className="text-center">
          Please proceed only if you feel comfortable reading this content.
        </Text>

        <Flex gap="3">
          <Button
            onClick={() => setShowContent(true)}
            variant="outline"
          >
            I understand, show content
          </Button>
          <Button
            onClick={() => window.history.back()}
            style={{ backgroundColor: '#dc2626', color: 'white' }}
          >
            Go back
          </Button>
        </Flex>

        <div className="text-center">
          <Text size="1" style={{ color: 'rgb(107 114 128)' }}>
            Need support? Visit our <a href="/resources" className="text-blue-600 hover:underline">resources page</a> or call Samaritans: 116 123
          </Text>
        </div>
      </Flex>
    </Card>
  )
}