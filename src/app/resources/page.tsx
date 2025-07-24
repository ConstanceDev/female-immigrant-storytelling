"use client" 

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button, Card, Text, Flex, Heading } from "@radix-ui/themes"

interface Resource {
    id: string
    title: string
    description: string
    phone?: string
    website?: string
    category: string
    isEmergency: boolean
    hours: string
    languages?: string[]
}

const ukResources: Resource[] = [
      {
    id: "1",
    title: "Samaritans",
    description: "Free, confidential emotional support for anyone in distress or struggling to cope.",
    phone: "116 123",
    website: "https://www.samaritans.org",
    category: "mental_health",
    isEmergency: true,
    hours: "24/7",
    languages: ["English", "Welsh"]
  },
  {
    id: "2",
    title: "National Domestic Violence Helpline",
    description: "Free, confidential 24-hour helpline for women experiencing domestic violence.",
    phone: "0808 2000 247",
    website: "https://www.womensaid.org.uk",
    category: "domestic_violence",
    isEmergency: true,
    hours: "24/7",
    languages: ["English", "Many languages available"]
  },
  {
    id: "3",
    title: "Migrant Help",
    description: "Support for asylum seekers and migrants with housing, legal advice, and integration services.",
    phone: "0808 801 0503",
    website: "https://www.migranthelpuk.org",
    category: "immigration",
    isEmergency: false,
    hours: "9 AM - 5 PM (Mon-Fri)",
    languages: ["English", "Multiple languages"]
  },
  {
    id: "4",
    title: "NHS 111",
    description: "Free NHS health advice and information service available 24/7.",
    phone: "111",
    website: "https://www.nhs.uk/using-the-nhs/nhs-services/urgent-and-emergency-care/nhs-111/",
    category: "healthcare",
    isEmergency: false,
    hours: "24/7",
    languages: ["English", "Interpreter services available"]
  },
  {
    id: "5",
    title: "Citizens Advice",
    description: "Free, independent advice on legal, debt, employment, and housing issues.",
    phone: "03444 111 444",
    website: "https://www.citizensadvice.org.uk",
    category: "legal_aid",
    isEmergency: false,
    hours: "9 AM - 5 PM (Mon-Fri)",
    languages: ["English", "Translation services available"]
  },
  {
    id: "6",
    title: "RAMP (Refugee and Migrant Project)",
    description: "Mental health support specifically for refugees and migrants.",
    phone: "020 7704 2534",
    website: "https://www.rampnhs.org",
    category: "mental_health",
    isEmergency: false,
    hours: "9 AM - 5 PM (Mon-Fri)",
    languages: ["English", "Arabic", "Farsi", "Somali", "French"]
  },
  {
    id: "7",
    title: "Southall Black Sisters",
    description: "Support for Black and minority ethnic women experiencing domestic violence and abuse.",
    phone: "020 8571 9595",
    website: "https://www.southallblacksisters.org.uk",
    category: "domestic_violence",
    isEmergency: false,
    hours: "10 AM - 5 PM (Mon-Fri)",
    languages: ["English", "Hindi", "Punjabi", "Urdu", "Gujarati"]
  },
  {
    id: "8",
    title: "Rape Crisis England & Wales",
    description: "Support for women and girls who have experienced sexual violence.",
    phone: "0808 802 9999",
    website: "https://rapecrisis.org.uk",
    category: "sexual_violence",
    isEmergency: true,
    hours: "12 PM - 2:30 PM and 7 PM - 9:30 PM",
    languages: ["English", "Interpreter services available"]
  },
  {
    id: "9",
    title: "Mind",
    description: "Mental health support and advice for anyone experiencing mental health problems.",
    phone: "0300 123 3393",
    website: "https://www.mind.org.uk",
    category: "mental_health",
    isEmergency: false,
    hours: "9 AM - 6 PM (Mon-Fri)",
    languages: ["English", "Various local services available"]
  },
  {
    id: "10",
    title: "Refuge",
    description: "Support for women and children experiencing domestic violence.",
    phone: "0808 2000 247",
    website: "https://www.refuge.org.uk",
    category: "domestic_violence",
    isEmergency: true,
    hours: "24/7",
    languages: ["English", "Interpreter services available"]
  }
]

export default function Resources() {
    const router = useRouter()
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)

    const categories = [
    { id: "all", label: "All Resources", icon: "🆘" },
    { id: "mental_health", label: "Mental Health", icon: "🧠" },
    { id: "domestic_violence", label: "Domestic Violence", icon: "🛡️" },
    { id: "immigration", label: "Immigration", icon: "📋" },
    { id: "healthcare", label: "Healthcare", icon: "🏥" },
    { id: "legal_aid", label: "Legal Aid", icon: "⚖️" },
    { id: "sexual_violence", label: "Sexual Violence", icon: "💜" }
    ]

    const filteredResources = ukResources.filter(resource => {
    const categoryMatch = selectedCategory === "all" || resource.category === selectedCategory
    const emergencyMatch = !showEmergencyOnly || resource.isEmergency
    return categoryMatch && emergencyMatch
})
    const handleCall = (phone: string) => {
        window.location.href = `tel:${phone.replace(/\s/g, '')}`
    }

    const handleWebsite = (website: string) => {
        window.open(website, '_blank', 'noopener, noreferrer')
    }

    return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Flex justify="between" align="center" className="h-16">
            <Heading size="6">UK Support Resources</Heading>
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
            <div>
              <Text className="text-red-800 font-medium">
                Emergency: Call 999 for immediate danger
              </Text>
              <Text size="2" className="text-red-700">
                If you are in immediate danger, call emergency services (999) or text 55999
              </Text>
            </div>
          </Flex>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 mb-4">
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

          <Flex align="center" gap="2">
            <input
              type="checkbox"
              id="emergency"
              checked={showEmergencyOnly}
              onChange={(e) => setShowEmergencyOnly(e.target.checked)}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="emergency" className="text-sm text-gray-700">
              Show emergency services only
            </label>
          </Flex>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <Heading size="4" className="mb-1">
                      {resource.title}
                    </Heading>
                    {resource.isEmergency && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        🚨 Emergency Service
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <Text size="2" style={{ color: 'rgb(75 85 99)' }}>
                  {resource.description}
                </Text>

                {/* Contact Info */}
                <div className="space-y-2">
                  {resource.phone && (
                    <Flex align="center" gap="2">
                      <span className="text-lg">📞</span>
                      <Button
                        variant="ghost"
                        onClick={() => handleCall(resource.phone!)}
                        className="text-left p-0 h-auto font-mono text-blue-600 hover:text-blue-800"
                      >
                        {resource.phone}
                      </Button>
                    </Flex>
                  )}

                  {resource.website && (
                    <Flex align="center" gap="2">
                      <span className="text-lg">🌐</span>
                      <Button
                        variant="ghost"
                        onClick={() => handleWebsite(resource.website!)}
                        className="text-left p-0 h-auto text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Visit Website
                      </Button>
                    </Flex>
                  )}
                </div>

                {/* Additional Info */}
                <div className="space-y-1 text-sm text-gray-500">
                  {resource.hours && (
                    <div>⏰ {resource.hours}</div>
                  )}
                  {resource.languages && (
                    <div>🗣️ {resource.languages.join(", ")}</div>
                  )}
                </div>

                {/* Action Buttons */}
                <Flex gap="2" className="pt-2">
                  {resource.phone && (
                    <Button
                      size="2"
                      onClick={() => handleCall(resource.phone!)}
                      className="flex-1"
                      style={{ backgroundColor: resource.isEmergency ? '#dc2626' : '#7c3aed', color: 'white' }}
                    >
                      Call Now
                    </Button>
                  )}
                  {resource.website && (
                    <Button
                      size="2"
                      variant="outline"
                      onClick={() => handleWebsite(resource.website!)}
                      className="flex-1"
                    >
                      Visit Site
                    </Button>
                  )}
                </Flex>
              </div>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <Text style={{ color: 'rgb(107 114 128)' }}>
              No resources found for the selected criteria.
            </Text>
          </div>
        )}

        {/* Platform Support Section */}
        <div className="mt-12">
          <Card className="p-6 bg-purple-50 border-purple-200">
            <Flex align="start" gap="3">
              <span className="text-2xl">💬</span>
              <div className="flex-1">
                <Heading size="4" className="mb-2">Need Help with This Platform?</Heading>
                <Text  size="2" className="mb-4" style={{ color: 'rgb(75 85 99)' }}>
                  Having trouble with the website, need to report an issue, or want to share feedback?
                  Our support team is here to help make your experience better.
                </Text>
                <div>
                <Button
                  onClick={() => router.push("/support")}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Contact Support & Feedback
                </Button>
                </div>

              </div>
            </Flex>
          </Card>
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <Flex align="start" gap="3">
            <span className="text-2xl">🔒</span>
            <div>
              <Heading size="4" className="mb-2">Privacy & Safety Notice</Heading>
              <Text size="2" style={{ color: 'rgb(75 85 99)' }}>
                Your browsing of these resources is private and not tracked. Consider using incognito/private browsing mode for additional privacy. If you're concerned about someone monitoring your internet activity, you can access these services by calling from a safe phone or visiting a local library.
              </Text>
            </div>
          </Flex>
        </div>
      </main>
    </div>
    )
}