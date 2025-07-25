"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button, Card, Text, Flex, Heading } from "@radix-ui/themes"

interface SafetyTip {
    id: string
    title: string
    description: string
    category: "digital" | "physical" | "emotional" | "legal" 
    priority: "high" | "medium" | "low"
}

const safetyTip: SafetyTip[] = [
  {
    id: "1",
    title: "Use Incognito/Private Browsing",
    description: "Use private browsing mode to prevent your browsing history from being saved on shared devices.",
    category: "digital",
    priority: "high"
  },
  {
    id: "2",
    title: "Create a Safety Plan",
    description: "Have a plan for quick exit if you're in danger. Know where to go and who to contact.",
    category: "physical",
    priority: "high"
  },
  {
    id: "3",
    title: "Trust Your Instincts",
    description: "If something feels wrong, trust your gut feeling. Your safety is more important than being polite.",
    category: "emotional",
    priority: "high"
  },
  {
    id: "4",
    title: "Keep Important Documents Safe",
    description: "Store copies of passport, visa, and other important documents in a secure location.",
    category: "legal",
    priority: "high"
  },
  {
    id: "5",
    title: "Clear Browser History",
    description: "Regularly clear your browser history and cookies if you're concerned about privacy.",
    category: "digital",
    priority: "medium"
  },
  {
    id: "6",
    title: "Know Your Rights",
    description: "Understand your legal rights as an immigrant in the UK. Seek legal advice if needed.",
    category: "legal",
    priority: "medium"
  }    
]

export default function Safety() {
    const router = useRouter()
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [showQuickExit, setShowQuickExit] = useState(false)

    const categories = [
        { id: "all", label: "All Tips", icon: "🛡️" }, 
        { id: "digital", label: "Digital Safety", icon: "💻" },
        { id: "physical", label: "Physical Safety", icon: "🏠" },
        { id: "emotional", label: "Emotional Safety", icon: "💙" },
        { id: "legal", label: "Legal Safety", icon: "⚖️" } 
    ]

    const filteredTips = safetyTip.filter(tip => 
        selectedCategory === "all" || tip.category === selectedCategory
    )

    const handleQuickExit = () => {
        //Clear current page from history and redirect to Google
        window.location.replace("https://www.google.com")
    }

    const handleEmergencyCall = (number: string) => {
        window.location.href = `tel:${number}`
    }

    return (
    <div className="min-h-screen bg-gray-50">
      {/* Quick Exit Button - Always Visible */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleQuickExit}
          style={{ backgroundColor: '#dc2626', color: 'white' }}
          className="shadow-lg"
        >
          🚨 Quick Exit
        </Button>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Flex justify="between" align="center" className="h-16">
            <Heading size="6">Safety & Support</Heading>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </Flex>
        </div>
      </header>

      {/* Emergency Banner */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="max-w-6xl mx-auto">
          <Flex align="center" gap="3">
            <Text size="6">🚨</Text>
            <div className="flex-1">
              <Text className="text-red-800 font-medium">
                Emergency: If you&apos;re in immediate danger, call 999
              </Text>
              <Text size="2" className="text-red-700">
                For silent emergency help, text 55999
              </Text>
            </div>
            <Button
              onClick={() => handleEmergencyCall("999")}
              style={{ backgroundColor: '#dc2626', color: 'white' }}
            >
              Call 999
            </Button>
          </Flex>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Crisis Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-l-4 border-red-400 bg-red-50">
            <Flex direction="column" gap="3">
              <Text size="6">🆘</Text>
              <Heading size="4">Crisis Support</Heading>
              <Text size="2">
                If you&apos;re having thoughts of self-harm or suicide
              </Text>
              <Button
                onClick={() => handleEmergencyCall("116123")}
                style={{ backgroundColor: '#dc2626', color: 'white' }}
              >
                Call Samaritans: 116 123
              </Button>
            </Flex>
          </Card>

          <Card className="p-6 border-l-4 border-purple-400 bg-purple-50">
            <Flex direction="column" gap="3">
              <Text size="6">🛡️</Text>
              <Heading size="4">Domestic Violence</Heading>
              <Text size="2">
                Free, confidential support available 24/7
              </Text>
              <div></div>
              <div />
              <Button
                onClick={() => handleEmergencyCall("08082000247")}
                style={{ backgroundColor: '#7c3aed', color: 'white' }}
              >
                Call: 0808 2000 247
              </Button>
            </Flex>
          </Card>

          <Card className="p-6 border-l-4 border-blue-400 bg-blue-50">
            <Flex direction="column" gap="3">
              <Text size="6">🏥</Text>
              <Heading size="4">Medical Help</Heading>
              <Text size="2">
                Non-emergency medical advice and support
              </Text>
              <Button
                onClick={() => handleEmergencyCall("111")}
                style={{ backgroundColor: '#2563eb', color: 'white' }}
              >
                Call NHS: 111
              </Button>
            </Flex>
          </Card>
        </div>

        {/* Safety Tips Section */}
        <div className="mb-8">
          <Heading size="5" className="mb-6">Safety Tips</Heading>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "solid" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <span>{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>

          {/* Safety Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTips.map((tip) => (
              <Card key={tip.id} className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Heading size="4">{tip.title}</Heading>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tip.priority === 'high' ? 'bg-red-100 text-red-800' :
                      tip.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {tip.priority === 'high' ? '🔴 High' :
                       tip.priority === 'medium' ? '🟡 Medium' : '🟢 Low'}
                    </span>
                  </div>
                  <Text size="2" style={{ color: 'rgb(75 85 99)' }}>
                    {tip.description}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Digital Safety Tools */}
        <Card className="p-6 mb-8">
          <Heading size="4" className="mb-6">Digital Safety Tools</Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Heading size="3" className="mb-3">Browser Safety</Heading>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => alert("Clear browsing data: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)")}
                  className="w-full justify-start"
                >
                  🗑️ Clear Browser Data
                </Button>
                <Button
                  variant="outline"
                  onClick={() => alert("Use Ctrl+Shift+N (Windows) or Cmd+Shift+N (Mac) for incognito mode")}
                  className="w-full justify-start"
                >
                  🕵️ Open Incognito Mode
                </Button>
              </div>
            </div>

            <div>
              <Heading size="3" className="mb-3">Privacy Settings</Heading>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => router.push("/profile")}
                  className="w-full justify-start"
                >
                  ⚙️ Privacy Settings
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/resources")}
                  className="w-full justify-start"
                >
                  📞 Support Resources
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Safety Plan Template */}
        <Card className="p-6">
          <Heading size="4" className="mb-6">Create Your Safety Plan</Heading>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Heading size="3" className="mb-3">Emergency Contacts</Heading>
                <div className="space-y-2 text-sm">
                  <div>• Police: 999</div>
                  <div>• Domestic Violence Helpline: 0808 2000 247</div>
                  <div>• Samaritans: 116 123</div>
                  <div>• NHS: 111</div>
                </div>
              </div>

              <div>
                <Heading size="3" className="mb-3">Safe Places</Heading>
                <Text size="2" style={{ color: 'rgb(75 85 99)' }}>
                  • Local police station<br/>
                  • Hospital or medical centre<br/>
                  • Community centre or library<br/>
                  • Friend or family member's home<br/>
                  • Women's refuge or shelter
                </Text>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <Text size="2" style={{ color: 'rgb(146 64 14)' }}>
                <strong>Important:</strong> Keep this safety plan private and accessible. Consider keeping a copy in a safe place away from home.
              </Text>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}