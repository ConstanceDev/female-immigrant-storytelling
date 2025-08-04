"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button, Text, Flex, Heading } from "@radix-ui/themes"
import ThemeToolbar from "@/contexts/ThemeToolbar";

export default function Diversity() {
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
            <Heading size="8" className="text-brown-900 mb-12 font-bold">Diversity Statement</Heading>
            <div className="mb-3"></div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">

                {/* Welcome Statement */}
                <div className="mb-8">
                <Heading size="6" className="text-brown-900 mb-6 font-bold">You are welcome at Her DiasporaVoices.</Heading>
                <div className="mb-7"></div>

                <Text size="4" className="text-brown-700 leading-relaxed block mb-6">
                    No matter your country of origin, immigration status, language, religion, age, or circumstances: if you are a woman
                    navigating life between cultures, this platform is for you.
                </Text>
                <div className="mb-4"></div>

                <Text size="4" className="text-brown-700 leading-relaxed block mb-6">
                    This is a safe space for immigrant women&apos;s stories, built by researchers who understand the unique challenges we face.
                    Whether you&apos;re sharing your journey, seeking support, or simply reading others&apos; experiences, you&apos;re part of this community,
                    strengthening it through your presence and <Link href="/support" className="text-brown-700 underline hover:text-brown-900">your voice</Link>.
                </Text>
                <div className="mb-4"></div>

                <Text size="4" className="text-brown-700 leading-relaxed block mb-6">
                    We, <Link href="/about" className="text-brown-700 underline hover:text-brown-900">the platform team</Link>, recognise that supporting such a diverse community means we won't get everything right immediately,
                    and we won&apos;t be able to meet every need perfectly. But we are committed to listening, learning, and evolving. We promise to
                    respectfully consider your feedback, take your concerns seriously, and continuously improve our platform to better serve you.
                </Text>
                <div className="mb-4"></div>

                <Text size="4" className="text-brown-700 leading-relaxed block mb-6">
                    You are free to share your authentic experiences within the <Link href="/content-policy" className="text-brown-700 underline hover:text-brown-900">guidelines</Link> needed to keep this space safe for all users.
                    Her DiasporaVoices prioritises your privacy, safety, and agency; you can read about our commitments in our <Link href="/privacy" className="text-brown-700 underline hover:text-brown-900">Privacy Policy</Link> and <Link href="/terms" className="text-brown-700 underline hover:text-brown-900">Terms of Service</Link>.
                </Text>
                <div className="mb-4"></div>

                <Text size="4" className="text-brown-700 leading-relaxed block mb-6">
                    We acknowledge that there are still <Link href="/support" className="text-brown-700 underline hover:text-brown-900">features we're working to implement</Link>: expanded language support, enhanced accessibility options,
                    and more ways to connect safely with others who share your experiences. With your patience and feedback, we'll continue
                    building these essential capabilities.
                </Text>
                <div className="mb-4"></div>

                <Text size="4" className="text-brown-700 leading-relaxed block mb-6">
                    We created this platform because we believe immigrant women's voices deserve to be heard, respected, and protected.
                    We believe in the power of shared stories to heal, connect, and empower.
                </Text>
                <div className="mb-4"></div>

                <Text size="4" className="text-brown-700 leading-relaxed block mb-12 font-medium">
                    We are building this platform for you. Your story matters. Your voice belongs here.
                </Text>
                </div>

                {/* Attribution */}
                <div className="border-t border-brown-200 pt-8 mb-8">
                <Text size="3" className="text-brown-600 leading-relaxed block mb-4">
                    This statement draws inspiration from Archive of Our Own's commitment to inclusive community building whilst addressing
                    the specific needs and safety concerns of immigrant women.
                </Text>
                </div>

                {/* License */}
                <div className="border-t border-brown-200 pt-6">
                <div className="mb-4">
                    <a 
                    href="https://creativecommons.org/licenses/by-sa/4.0/" 
                    target="_blank" 
                    rel="license noopener noreferrer"
                    className="inline-block"
                    >
                    <img 
                        alt="Creative Commons License" 
                        style={{ borderWidth: 0 }} 
                        src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
                        className="hover:opacity-80 transition-opacity"
                    />
                    </a>
                </div>
                <Text size="3" className="text-brown-600 leading-relaxed block">
                    This work is licensed under a <a 
                    href="https://creativecommons.org/licenses/by-sa/4.0/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-brown-700 underline hover:text-brown-900"
                    >
                    Creative Commons Attribution-Share Alike 4.0 International License
                    </a>.
                </Text>
                </div>
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