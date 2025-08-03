"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button, Text, Flex, Heading } from "@radix-ui/themes"
import ThemeToolbar from "@/contexts/ThemeToolbar";

export default function Sitemap() {
    const router = useRouter()

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
                        e.currentTarget.src = '/images/Logo-transparent.png'
                        e.currentTarget.onerror = () => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling.style.display = 'flex'
                        }
                    }}
                    />
                    <div className="w-8 h-8 bg-black rounded-full items-center justify-center mr-3" style={{ display: 'none' }}>
                    <Text size="2" className="text-white font-bold">H</Text>
                    </div>
                    <Link href="/">
                    <Heading size="5" className="text-brown-800">Her DiasporaVoices</Heading>
                    </Link>
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
                        style={{ backgroundColor: '#f3cbcb' }}
                        size="3"
                    >
                    Share Your Story
                    </Button>
                </Flex>
                </div>
            </Flex>
            </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Page Title */}
            <Heading size="8" className="text-brown-900 mb-12 font-bold">Site Map</Heading>
            <div className="mb-3"></div>

            {/* Explore Section */}
            <section className="mb-12">
            <div className="border-b-2 border-brown-900 pb-2 mb-6">
                <Heading size="5" className="text-brown-900 font-bold">Explore</Heading>
            </div>
            <ul className="space-y-3 ml-4">
                <li>
                <Link href="/" className="text-brown-700 hover:text-brown-900 underline">
                    Homepage
                </Link>
                </li>
                <li>
                <Link href="/stories/public" className="text-brown-700 hover:text-brown-900 underline">
                    Community Stories
                </Link>
                </li>
                <li>
                <Link href="/dashboard" className="text-brown-700 hover:text-brown-900 underline">
                    User Dashboard
                </Link>
                </li>
                <li>
                <Link href="/stories/create" className="text-brown-700 hover:text-brown-900 underline">
                    Share Your Story
                </Link>
                </li>
                <li>
                <Link href="/profile" className="text-brown-700 hover:text-brown-900 underline">
                    User Profile
                </Link>
                </li>
                <li>
                <Link href="/resources" className="text-brown-700 hover:text-brown-900 underline">
                    UK Resources & Support
                </Link>
                </li>
                <li>
                <Link href="/safety" className="text-brown-700 hover:text-brown-900 underline">
                    Safety & Crisis Support
                </Link>
                </li>
            </ul>
            </section>

            {/* About Section */}
            <section className="mb-12">
            <div className="border-b-2 border-brown-900 pb-2 mb-6">
                <Heading size="5" className="text-brown-900 font-bold">About Her DiasporaVoices</Heading>
            </div>
            <ul className="space-y-3 ml-4">
                <li>
                <Link href="/about" className="text-brown-700 hover:text-brown-900 underline">
                    About the Platform
                </Link>
                </li>
                <li>
                <Link href="/terms" className="text-brown-700 hover:text-brown-900 underline">
                    Terms of Service
                </Link>
                </li>
                <li>
                <Link href="/content-policy" className="text-brown-700 hover:text-brown-900 underline">
                    Content Policy
                </Link>
                </li>
                <li>
                <Link href="/privacy" className="text-brown-700 hover:text-brown-900 underline">
                    Privacy Policy
                </Link>
                </li>
                <li>
                <Link href="/diversity" className="text-brown-700 hover:text-brown-900 underline">
                    Diversity Statement
                </Link>
                </li>
                <li>
                <Link href="/dmca" className="text-brown-700 hover:text-brown-900 underline">
                    DMCA Policy
                </Link>
                </li>
                <li>
                <Text size="3" className="text-brown-600">
                    Her DiasporaVoices is a project dedicated to amplifying female immigrant voices
                </Text>
                </li>
            </ul>
            </section>

            {/* Contact Section */}
            <section className="mb-12">
            <div className="border-b-2 border-brown-900 pb-2 mb-6">
                <Heading size="5" className="text-brown-900 font-bold">Contact Us</Heading>
            </div>
            <ul className="space-y-3 ml-4">
                <li>
                <Link href="/support" className="text-brown-700 hover:text-brown-900 underline">
                    Technical Support & Feedback
                </Link>
                </li>
                <li>
                <Link href="/policy-abuse" className="text-brown-700 hover:text-brown-900 underline">
                    Policy Questions & Abuse Reports
                </Link>
                </li>
                <li>
                <Link href="/contact" className="text-brown-700 hover:text-brown-900 underline">
                    General Contact
                </Link>
                </li>
            </ul>
            </section>

            {/* Authentication Section */}
            <section className="mb-12">
            <div className="border-b-2 border-brown-900 pb-2 mb-6">
                <Heading size="5" className="text-brown-900 font-bold">Account</Heading>
            </div>
            <ul className="space-y-3 ml-4">
                <li>
                <Link href="/auth/signin" className="text-brown-700 hover:text-brown-900 underline">
                    Sign In / Register
                </Link>
                </li>
                <li>
                <Link href="/profile" className="text-brown-700 hover:text-brown-900 underline">
                    Profile Settings
                </Link>
                </li>
                <li>
                <Text size="3" className="text-brown-600">
                    Manage your personas and privacy settings
                </Text>
                </li>
            </ul>
            </section>

            {/* Back to Top */}
            <div className="text-center pt-8 border-t border-brown-200">
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-brown-700 hover:text-brown-900 underline"
            >
                Back to Top
            </button>
            </div>
        </main>

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
                    <li><Link href="/dmca"><Text size="2" className="text-white hover:underline">GDPR Policy</Text></Link></li>
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