  "use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Button, Text, Flex, Heading, Card } from "@radix-ui/themes"
import ThemeToolbar from "@/contexts/ThemeToolbar";


export default function Home() {
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

return (
      <div className="min-h-screen bg-white">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Flex justify="between" align="center" className="h-16">
              {/* Logo */}
              <Flex align="center">
                <Flex align="center" className="flex-shrink-0">
                    <img
                      src="/images/Logo.png"
                      alt="Her DiasporaVoices Logo"
                      className="w-8 h-8 mr-3"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling.style.display = 'flex'
                      }}
                    />
                  <Heading size="5" className="text-brown-800">Her DiasporaVoices</Heading>
                </Flex>
              </Flex>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <Flex align="center" gap="6">
                  <Link href="/about">
                    <Text size="3" className="text-brown-700 hover:text-brown-900 px-3 py-2 font-medium">
                      About
                    </Text>
                  </Link>
                  <Link href="/stories/public">
                    <Text size="3" className="text-brown-700 hover:text-brown-900 px-3 py-2 font-medium">
                      Stories
                    </Text>
                  </Link>
                  <Link href="/resources">
                    <Text size="3" className="text-brown-700 hover:text-brown-900 px-3 py-2 font-medium">
                      Resources
                    </Text>
                  </Link>
                  <ThemeToolbar />
                  <Button
                    onClick={() => router.push("/auth/signin")}
                    className="text-black"
                    style={{ backgroundColor: '#f3cbcb'}}
                    size="3"
                  >
                    Sign Up
                  </Button>
                </Flex>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Flex align="center" gap="2">
                  <ThemeToolbar />
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-brown-700 hover:text-brown-900 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                  >
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                  </button>
                </Flex>
              </div>
            </Flex>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link href="/about">
                    <Text size="3" className="text-brown-700 hover:text-brown-900 block px-3 py-2 font-medium">
                      About
                    </Text>
                  </Link>
                  <Link href="/stories/public">
                    <Text size="3" className="text-brown-700 hover:text-brown-900 block px-3 py-2 font-medium">
                      Stories
                    </Text>
                  </Link>
                  <Link href="/resources">
                    <Text size="3" className="text-brown-700 hover:text-brown-900 block px-3 py-2 font-medium">
                      Resources
                    </Text>
                  </Link>
                  <Button
                    onClick={() => router.push("/auth/signin")}
                    className="bg-amber-200 hover:bg-amber-300 text-brown-900 w-full mt-2"
                    size="3"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-4 lg:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Image */}
            <div className="mb-12 rounded-2xl overflow-hidden" style={{ backgroundColor: '#F5E6D3' }}>
              <div className="h-80 lg:h-96 relative">
                <img
                  src="/images/Header.jpg"
                  alt="Hero header image"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling.style.display = 'flex'
                  }}
                />
                <div className="h-full flex items-center justify-center" style={{ display: 'none'}}>
                  <div className="text-center">
                    <div className="text-6xl mb-4">👥</div>
                    <Text size="2" className="text-brown-600">Hero image not found - Please check /src/assets/images/Header.jpg</Text>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <img
                  src="/images/Logo-transparent.png"
                  alt="Her DiasporaVoices Logo"
                  className="w-25 h-25"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <Heading size="8" >
                Your story · Your control · Our platform
              </Heading>
              <div className="flex justify-center mb-12">
                <Text size="5" className="text-brown-700 max-w-2xl">
                  &quot;Empowering Female Immigrant Voices – Safely and Anonymously.&quot;
                </Text>
              </div>
              <Button
                onClick={() => router.push("/stories/public")}
                className="text-gray-900 hover:opacity-30 shadow-2xl"
                size="4"
                style={{ backgroundColor: '#f4c2c2' }}
              >
                Explore Stories
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Voices Section */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Heading size="6" className="text-brown-900 mb-16 font-bold">
              Featured Voices
            </Heading>
            <div className="mb-5"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Voice Card 1 */}
              <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 relative" style={{ backgroundColor: '#F5E6D3' }}>
                  <img
                    src="/images/Aisha.jpg"
                    alt="Aisha's portrait"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling.style.display = 'flex'
                    }}
                  />
                  <div className="h-full flex items-center justify-center" style={{ display: 'none' }}>
                    <div className="text-center">
                      <div className="text-4xl mb-2">👤</div>
                      <Text size="1" className="text-brown-500">Portrait placeholder</Text>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <Heading size="4" className="text-brown-900 mb-2">Aisha&apos;s Collection</Heading>
                  <Text size="3" className="text-brown-700">Stories from Aisha. A glimpse into her life as an immigrant.</Text>
                </div>
              </Card>

              {/* Voice Card 2 */}
              <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 relative" style={{ backgroundColor: '#F5E6D3' }}>
                  <img
                    src="/images/Fatima.jpg"
                    alt="Fatima's portrait"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling.style.display = 'flex'
                    }}
                  />
                  <div className="h-full flex items-center justify-center" style={{ display: 
  'none' }}>
                    <div className="text-center">
                      <div className="text-4xl mb-2">👤</div>
                      <Text size="1" className="text-brown-500">Portrait placeholder</Text>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <Heading size="4" className="text-brown-900 mb-2">Fatima&apos;s Collection</Heading>
                  <Text size="3" className="text-brown-700">Stories from Fatima. Her experiences and challenges.</Text>
                </div>
              </Card>

              {/* Voice Card 3 */}
              <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 relative" style={{ backgroundColor: '#F5E6D3' }}>
                  <img
                    src="/images/Sofia.jpg"
                    alt="Sofia's portrait"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling.style.display = 'flex'
                    }}
                  />
                  <div className="h-full flex items-center justify-center" style={{ display: 'none' }}>
                    <div className="text-center">
                      <div className="text-4xl mb-2">👤</div>
                      <Text size="1" className="text-brown-500">Portrait placeholder</Text>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <Heading size="4" className="text-brown-900 mb-2">Sofia&apos;s Collection</Heading>
                  <Text size="3" className="text-brown-700">Stories from Sofia. A journey of resilience and hope.</Text>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Heading size="6" className="text-brown-900 mb-16 font-bold">
              Your Home Across Border
            </Heading>
            <div className="mb-5"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Privacy First */}
              <Card className="p-8 border border-brown-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#fcd5ce' }}>
                  <div className="text-2xl">🔒</div>
                </div>
                <Heading size="5" className="text-brown-900 mb-4 font-bold">Privacy First</Heading>
                <Text size="3" className="text-brown-700 leading-relaxed">
                  Complete control over who sees your content. Anonymous sharing options available.
                </Text>
              </Card>

              {/* Safe Community */}
              <Card className="p-8 border border-brown-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#e9edc9' }}>
                  <div className="text-2xl">🤝</div>
                </div>
                <Heading size="5" className="text-brown-900 mb-4 font-bold">Safe Community</Heading>
                <Text size="3" className="text-brown-700 leading-relaxed">
                  Connect with others who understand your journey in a supportive environment.
                </Text>
              </Card>

              {/* UK Resources */}
              <Card className="p-8 border border-brown-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#cce6f4' }}>
                  <div className="text-2xl">📚</div>
                </div>
                <Heading size="5" className="text-brown-900 mb-4 font-bold">
                  UK Resources
                </Heading>
                <Text size="3" className="text-brown-700 leading-relaxed">
                  Access to mental health support, legal aid, and other services specific to the UK.
                </Text>
              </Card>
            </div>
          </div>
        </section>

        {/* Privacy Promise Section */}
        <section className="py-5 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Heading size="7" className="text-brown-900 mb-8 font-bold">
              Our Privacy Promise
            </Heading>
            <div className="mb-5"></div>
            <Text size="4" className="text-brown-700 mb-12 leading-relaxed block">
              We never collect identifying data — you decide what to share, how to share, and when. 
              We prioritize your privacy. Stories are shared with your consent, and personal details are protected.
              Learn more about our commitment to secure storytelling.
            </Text>
            <div className="mb-5"></div>
            <Button
              onClick={() => router.push("/auth/signin")}
              className="text-gray-900 hover:opacity-30 shadow-2xl"
              size="4"
              style={{ backgroundColor: '#f4c2c2' }}
            >
              Share Your Story
            </Button>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="p-8 text-center" style={{ backgroundColor: '#F5E6D3' }}>
                <Text size="2" className="text-brown-600 mb-2 font-medium block">
                  Stories Shared
                </Text>
                <Heading size="8" className="text-brown-900 font-bold">1,200+</Heading>
              </Card>
              <Card className="p-8 text-center" style={{ backgroundColor: '#E8D5C4' }}>
                <Text size="2" className="text-brown-600 mb-2 font-medium block">
                  Languages Represented
                </Text>
                <Heading size="8" className="text-brown-900 font-bold">45+</Heading>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-white" style={{ backgroundColor: '#f7cad0' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Column 1 */}
              <div>
                <Heading size="4" className="text-white mb-4 font-semibold">About</Heading>
                <ul className="space-y-3">
                  <li><Link href="/about"><Text size="2" className="text-white hover:underline">About Her DiasporaVoices</Text></Link></li>
                  <li><Link href="/sitemap"><Text size="2" className="text-white hover:underline">Site Map</Text></Link></li>
                  <li><Link href="/diversity"><Text size="2" className="text-white hover:underline">Diversity Statement</Text></Link></li>
                  <li><Link href="/terms"><Text size="2" className="text-white hover:underline">Terms of Service</Text></Link></li>
                  <li><Link href="/content-policy"><Text size="2" className="text-white hover:underline">Content Policy</Text></Link></li>
                  <li><Link href="/privacy"><Text size="2" className="text-white hover:underline">Privacy Policy</Text></Link></li>
                </ul>
              </div>

              {/* Column 2 */}
              <div>
                <Heading size="4" className="text-white mb-4 font-semibold">Support</Heading>
                <ul className="space-y-3">
                  <li><Link href="/support"><Text size="2" className="text-white hover:underline">Contact Us</Text></Link></li>
                  <li><Link href="/support"><Text size="2" className="text-white hover:underline">Technical Support & Feedback</Text></Link></li>
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <Heading size="4" className="text-white mb-4 font-semibold">Connect</Heading>
                <Text size="2" className="text-white mb-4 block">Join our community and share your voice safely.</Text>
                <div className="mb-3"></div>
                <Button
                  onClick={() => router.push("/auth/signin")}
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  size="2"
                >
                  Get Started
                </Button>
              </div>
            </div>

            <div className="border-t mt-8 pt-8 text-center" style={{ borderTopColor: '#fb6f92' }}>
              <Text size="2" className="text-white">© 2025 Her DiasporaVoices. All rights reserved.</Text>
            </div>
          </div>
        </footer>
      </div>
    )
}
