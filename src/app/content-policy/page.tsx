"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button, Text, Flex, Heading } from "@radix-ui/themes"
import ThemeToolbar from "@/contexts/ThemeToolbar"

export default function ContentPolicy() {
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
                        <Text size="3" className="text-brown-900 px-3 py-2 font-medium">
                        About Us
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
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Page Header */}
            <div className="flex justify-between items-start mb-8">
            <Heading size="8" className="text-brown-900 font-bold">Content Policy</Heading>
            
            {/* Navigation Tabs */}
            <div className="flex gap-2">
                <Link href="/terms">
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200">
                    Terms of Service
                </button>
                </Link>
                <Link href="/content-policy">
                <button className="px-3 py-1 text-sm bg-brown-100 text-brown-900 border border-brown-300 rounded">
                    Content Policy
                </button>
                </Link>
                <Link href="/privacy">
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200">
                    Privacy Policy
                </button>
                </Link>
            </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <Text size="4" className="text-brown-700 leading-relaxed block mb-8">
                Her DiasporaVoices exists to provide a safe, private platform for female immigrants to share their authentic stories, experiences, and voices.
            </Text>
            <div className="mb-5"></div>

            <Text size="3" className="text-brown-700 leading-relaxed block mb-6">
                Our goal is maximum inclusiveness of immigrant women&apos;s stories whilst prioritising user safety and privacy. We want to provide a secure home for stories that might be at risk elsewhere due to cultural sensitivity, personal safety concerns, or potential retaliation. Users should always observe content warnings and respect others' privacy choices before accessing stories.
            </Text>
            <div className="mb-5"></div>

            <Text size="3" className="text-brown-700 leading-relaxed block mb-6">
                All content on Her DiasporaVoices must comply with this Content Policy. Please review this page carefully before posting. Answers to common questions can be found in our <Link href="/support" className="text-brown-700 underline hover:text-brown-900">Support & Feedback</Link>.
            </Text>
            <div className="mb-4"></div>

            <Text size="3" className="text-brown-700 leading-relaxed block mb-12">
                If you encounter content that violates this policy, you can report it through our <Link href="/support" className="text-brown-700 underline hover:text-brown-900">reporting system</Link>. We do not pre-screen content but respond to reports promptly.
            </Text>
            <div className="mb-7"></div>

            {/* Table of Contents */}
            <section className="mb-12">
                <div className="border-b-2 border-brown-900 pb-2 mb-6">
                <Heading size="5" className="text-brown-900 font-bold">Table of Contents</Heading>
                </div>
                
                <Text size="3" className="text-brown-900 font-semibold mb-4 block">II. Content Policy</Text>
                <div className="mb-5"></div>
                
                <div className="ml-4 space-y-2">
                <div><Link href="#offensive-content" className="text-brown-700 underline hover:text-brown-900 text-sm">A. Offensive Content</Link></div>
                <div><Link href="#personal-stories" className="text-brown-700 underline hover:text-brown-900 text-sm">B. Personal Stories and Experiences</Link></div>
                <div><Link href="#commercial-promotion" className="text-brown-700 underline hover:text-brown-900 text-sm">C. Commercial Promotion</Link></div>
                <div><Link href="#copyright-infringement" className="text-brown-700 underline hover:text-brown-900 text-sm">D. Copyright Infringement</Link></div>
                <div><Link href="#plagiarism" className="text-brown-700 underline hover:text-brown-900 text-sm">E. Plagiarism</Link></div>
                <div><Link href="#personal-information" className="text-brown-700 underline hover:text-brown-900 text-sm">F. Personal Information and Privacy Protection</Link></div>
                <div><Link href="#impersonation" className="text-brown-700 underline hover:text-brown-900 text-sm">G. Impersonation</Link></div>
                <div><Link href="#harassment-safety" className="text-brown-700 underline hover:text-brown-900 text-sm">H. Harassment and Safety</Link></div>
                <div><Link href="#profile-pictures" className="text-brown-700 underline hover:text-brown-900 text-sm">I. Profile Pictures and Media</Link></div>
                <div><Link href="#content-warnings" className="text-brown-700 underline hover:text-brown-900 text-sm">J. Content Warnings</Link></div>
                <div><Link href="#illegal-harmful" className="text-brown-700 underline hover:text-brown-900 text-sm">K. Illegal and Harmful Content</Link></div>
                </div>
            </section>

            {/* II. Content Policy */}
            <section className="mb-12">
                <div className="border-b-2 border-brown-900 pb-2 mb-8">
                <Heading size="5" className="text-brown-900 font-bold">II. Content Policy</Heading>
                </div>

                {/* II.A. Offensive Content */}
                <div id="offensive-content" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">II.A. Offensive Content</Heading>
                <div className="mb-5"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    Unless it violates another policy, we will not remove content for being offensive. We recognise that immigrant women's authentic experiences may include difficult, controversial, or culturally sensitive topics. We trust our community to use content warnings appropriately and respect others' boundaries.
                </Text>

                <Text size="3" className="text-brown-700 leading-relaxed">
                    Users are encouraged to use filtering, blocking, and privacy controls to curate their own experience.
                </Text>
                </div>

                {/* II.B. Personal Stories and Experiences */}
                <div id="personal-stories" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">II.B. Personal Stories and Experiences</Heading>
                <div className="mb-5"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    Stories must be personal narratives, experiences, or reflections related to immigration, cultural identity, or the immigrant experience. This includes:
                </Text>

                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><Text size="3" className="text-brown-700">Personal migration journeys</Text></li>
                    <li><Text size="3" className="text-brown-700">Cultural adaptation experiences</Text></li>
                    <li><Text size="3" className="text-brown-700">Family and relationship stories</Text></li>
                    <li><Text size="3" className="text-brown-700">Professional and educational experiences</Text></li>
                    <li><Text size="3" className="text-brown-700">Community and social experiences</Text></li>
                    <li><Text size="3" className="text-brown-700">Reflections on identity and belonging</Text></li>
                </ul>

                <Text size="3" className="text-brown-700 leading-relaxed">
                    Creative fiction inspired by immigrant experiences is welcome, but purely fictional works unrelated to immigration experiences are not appropriate for this platform.
                </Text>
                </div>

                {/* II.C. Commercial Promotion */}
                <div id="commercial-promotion" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">II.C. Commercial Promotion</Heading>
                <div className="mb-5"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    Promotion, solicitation, and advertisement of commercial products or services are not allowed. This includes:
                </Text>

                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><Text size="3" className="text-brown-700">Selling products or services</Text></li>
                    <li><Text size="3" className="text-brown-700">Multi-level marketing schemes</Text></li>
                    <li><Text size="3" className="text-brown-700">Crowdfunding campaigns (except for community-verified emergency situations)</Text></li>
                    <li><Text size="3" className="text-brown-700">Business promotion</Text></li>
                </ul>

                <Text size="3" className="text-brown-700 leading-relaxed">
                    Sharing information about community resources, support services, or non-profit organisations that serve immigrant communities is allowed and encouraged.
                </Text>
                </div>

                {/* II.D. Copyright Infringement */}
                <div id="copyright-infringement" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">II.D. Copyright Infringement</Heading>
                <div className="mb-5"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    Large reproductions of copyrighted works are not allowed without permission. This includes:
                </Text>

                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><Text size="3" className="text-brown-700">Copying substantial portions of books, articles, or other written works</Text></li>
                    <li><Text size="3" className="text-brown-700">Sharing copyrighted images, videos, or audio without permission</Text></li>
                    <li><Text size="3" className="text-brown-700">Reproducing someone else's creative work without attribution</Text></li>
                </ul>

                <Text size="3" className="text-brown-700 leading-relaxed">
                    Short quotations with proper attribution are allowed, as are personal reflections inspired by books, films, or other media.
                </Text>
                </div>

                {/* II.E. Plagiarism */}
                <div id="plagiarism" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">II.E. Plagiarism</Heading>
                <div className="mb-5"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    Plagiarism—using someone else's words or ideas without attribution—is not allowed. This is particularly important in storytelling communities where authentic voice matters.
                </Text>

                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><Text size="3" className="text-brown-700">Always credit sources when quoting or referencing others' work</Text></li>
                    <li><Text size="3" className="text-brown-700">Do not copy another user's story and present it as your own</Text></li>
                    <li><Text size="3" className="text-brown-700">Minor alterations do not make someone else's work your own</Text></li>
                </ul>

                <Text size="3" className="text-brown-700 leading-relaxed">
                    Sharing similar experiences or themes is not plagiarism—many immigrant women face similar challenges and may tell similar stories.
                </Text>
                </div>

                {/* II.F. Personal Information and Privacy Protection */}
                <div id="personal-information" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">II.F. Personal Information and Privacy Protection</Heading>
                <div className="mb-5"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>Your privacy and the privacy of others is paramount.</strong> You may not share:
                </Text>

                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><Text size="3" className="text-brown-700">Real names, addresses, phone numbers, or other identifying information about yourself or others without explicit consent</Text></li>
                    <li><Text size="3" className="text-brown-700">Immigration status details that could endanger someone</Text></li>
                    <li><Text size="3" className="text-brown-700">Workplace or school information that could lead to identification</Text></li>
                    <li><Text size="3" className="text-brown-700">Family members' personal information without their consent</Text></li>
                    <li><Text size="3" className="text-brown-700">Any information that could be used to identify, locate, or harm another person</Text></li>
                </ul>

                <Text size="3" className="text-brown-700 leading-relaxed">
                    <strong>Exception:</strong> You may share your own information in your own stories if you choose, but we strongly encourage using pseudonyms and avoiding specific identifying details for your safety.
                </Text>
                </div>

                {/* II.G. Impersonation */}
                <div id="impersonation" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">II.G. Impersonation</Heading>
                <div className="mb-5"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    You may not impersonate another person, organisation, or service. This includes:
                </Text>

                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><Text size="3" className="text-brown-700">Pretending to be someone else</Text></li>
                    <li><Text size="3" className="text-brown-700">Misrepresenting your affiliation with organisations</Text></li>
                    <li><Text size="3" className="text-brown-700">Creating fake personas (beyond the privacy-protecting personas our platform provides)</Text></li>
                </ul>

                <Text size="3" className="text-brown-700 leading-relaxed">
                    Using pseudonyms and personas for privacy protection is encouraged and supported.
                </Text>
                </div>

                {/* II.H. Harassment and Safety */}
                <div id="harassment-safety" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">II.H. Harassment and Safety</Heading>
                <div className="mb-5"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>Harassment of any kind is not tolerated.</strong> This platform prioritises the safety of vulnerable women. Harassment includes:
                </Text>

                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><Text size="3" className="text-brown-700">Bullying, threats, or personal attacks</Text></li>
                    <li><Text size="3" className="text-brown-700">Repeated unwanted contact after being asked to stop</Text></li>
                    <li><Text size="3" className="text-brown-700">Sharing someone's personal information without consent</Text></li>
                    <li><Text size="3" className="text-brown-700">Targeting someone based on their immigration status, nationality, religion, or other identity</Text></li>
                    <li><Text size="3" className="text-brown-700">Attempting to "out" someone's real identity</Text></li>
                </ul>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>Creating a hostile environment for immigrant women is not allowed.</strong>
                </Text>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    We recognise that discussing difficult experiences may involve naming harmful behaviours or systems, but personal attacks against other users are never acceptable.
                </Text>

                <Text size="3" className="text-brown-700 leading-relaxed">
                    <strong>Community Response:</strong> Users are encouraged to use blocking, reporting, and privacy controls. We will investigate all harassment reports promptly.
                </Text>
                </div>

                {/* II.I. Profile Pictures and Media */}
                <div id="profile-pictures" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">II.I. Profile Pictures and Media</Heading>
                
                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    Profile pictures and media must be appropriate for all audiences. They must not contain:
                </Text>

                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><Text size="3" className="text-brown-700">Explicit sexual content</Text></li>
                    <li><Text size="3" className="text-brown-700">Hate symbols or imagery</Text></li>
                    <li><Text size="3" className="text-brown-700">Content that could identify you or others</Text></li>
                    <li><Text size="3" className="text-brown-700">Copyrighted images without permission</Text></li>
                </ul>

                <Text size="3" className="text-brown-700 leading-relaxed">
                    The platform provides anonymous avatar generation to protect your privacy whilst maintaining visual identity.
                </Text>
                </div>

                {/* II.J. Content Warnings */}
                <div id="content-warnings" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">II.J. Content Warnings</Heading>
                <div className="mb-5"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>Content warnings help keep our community safe.</strong> You must apply appropriate warnings when your story contains:
                </Text>

                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><Text size="3" className="text-brown-700">Domestic violence or abuse</Text></li>
                    <li><Text size="3" className="text-brown-700">Sexual violence or assault</Text></li>
                    <li><Text size="3" className="text-brown-700">Mental health crises or self-harm</Text></li>
                    <li><Text size="3" className="text-brown-700">Detailed accounts of discrimination or racism</Text></li>
                    <li><Text size="3" className="text-brown-700">Trauma-related content</Text></li>
                    <li><Text size="3" className="text-brown-700">Substance abuse</Text></li>
                    <li><Text size="3" className="text-brown-700">Content that might be triggering for other immigrant women</Text></li>
                </ul>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>You may also create custom warnings</strong> for cultural sensitivities, religious content, or other topics that might be sensitive to specific communities.
                </Text>

                <Text size="3" className="text-brown-700 leading-relaxed">
                    <strong>Using content warnings is an act of community care.</strong> They allow others to make informed choices about what they read whilst not restricting your ability to share your authentic experience.
                </Text>
                </div>

                {/* II.K. Illegal and Harmful Content */}
                <div id="illegal-harmful" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">II.K. Illegal and Harmful Content</Heading>
                <div className="mb-5"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    You may not upload content that:
                </Text>

                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><Text size="3" className="text-brown-700">Contains or links to illegal material under UK law</Text></li>
                    <li><Text size="3" className="text-brown-700">Promotes violence against specific individuals or groups</Text></li>
                    <li><Text size="3" className="text-brown-700">Contains malware or attempts to hack the platform</Text></li>
                    <li><Text size="3" className="text-brown-700">Violates UK laws regarding hate speech or incitement</Text></li>
                    <li><Text size="3" className="text-brown-700">Shares trade secrets or classified information</Text></li>
                    <li><Text size="3" className="text-brown-700">Contains spam or repetitive promotional content</Text></li>
                </ul>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>If your story involves illegal activities you experienced or witnessed, you may share your experience and feelings without providing detailed instructions or encouraging others to break the law.</strong>
                </Text>

                <Text size="3" className="text-brown-700 leading-relaxed">
                    We may use automated systems to filter spam and malicious content. If your legitimate content is mistakenly filtered, please contact our <Link href="/support" className="text-brown-700 underline hover:text-brown-900">support team</Link>.
                </Text>
                </div>

            </section>

            {/* Reporting Notice */}
            <div className="border-t border-brown-200 pt-6 mb-8">
                <Text size="3" className="text-brown-700 leading-relaxed">
                <strong>Reporting:</strong> If you encounter content that violates UK law or poses immediate danger, please also contact appropriate authorities in addition to reporting through our <Link href="/support" className="text-brown-700 underline hover:text-brown-900">system</Link>.
                </Text>
            </div>

            {/* Footer Navigation */}
            <div className="border-t border-brown-200 pt-8 mt-12">
                <div className="flex justify-between items-center">
                <Text size="2" className="text-brown-600">
                    Effective: January 1, 2025
                </Text>
                <div className="flex gap-2">
                    <Link href="#top">
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200">
                        ↑ Top
                    </button>
                    </Link>
                    <Link href="/terms">
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200">
                        Terms of Service
                    </button>
                    </Link>
                    <Link href="/content-policy">
                    <button className="px-3 py-1 text-sm bg-brown-100 text-brown-900 border border-brown-300 rounded">
                        Content Policy
                    </button>
                    </Link>
                    <Link href="/privacy">
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200">
                        Privacy Policy
                    </button>
                    </Link>
                </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-brown-200">
                <Text size="2" className="text-brown-600">
                    The Her DiasporaVoices <Link href="/content-policy" className="text-brown-700 underline hover:text-brown-900">Content Policy</Link> is licensed under the <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-brown-700 underline hover:text-brown-900">Creative Commons Attribution 4.0 International License</a>.
                </Text>
                </div>
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
                <Text size="2" className="text-white">Copyright © 2025 Her DiasporaVoices. All rights reserved.</Text>
                </div>
            </div>
            </footer>
        </div>
    )
}