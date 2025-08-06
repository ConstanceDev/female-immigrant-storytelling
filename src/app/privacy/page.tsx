"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button, Text, Flex, Heading } from "@radix-ui/themes"
import ThemeToolbar from "@/contexts/ThemeToolbar"

export default function Terms() {
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
            <Heading size="8" className="text-brown-900 font-bold">Privacy Policy</Heading>
            
            {/* Navigation Tabs */}
            <div className="flex gap-2">
                <Link href="/terms">
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200">
                    Terms of Service
                </button>
                </Link>
                <Link href="/content-policy">
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200">
                    Content Policy
                </button>
                </Link>
                <Link href="/privacy">
                <button className="px-3 py-1 text-sm bg-brown-100 text-brown-900 border border-brown-300 rounded">
                    Privacy Policy
                </button>
                </Link>
            </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <Text size="4" className="text-brown-700 leading-relaxed block mb-8">
                Her DiasporaVoices is committed to protecting the privacy and safety of female immigrants who use our platform to share their stories.
            </Text>
            <div className="mb-5"></div>

            <Text size="3" className="text-brown-700 leading-relaxed block mb-6">
                We exist to provide a secure space for immigrant women to share their experiences whilst maintaining complete control over their privacy. To do this, we process minimal personal information and give you maximum control over your data. This is so that we can:
            </Text>
            <div className="mb-3"></div>

            <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                <li><Text size="3" className="text-brown-700">Host your stories safely and securely</Text></li>
                <li><Text size="3" className="text-brown-700">Enable you to connect with other community members</Text></li>
                <li><Text size="3" className="text-brown-700">Provide you with privacy controls and safety features</Text></li>
                <li><Text size="3" className="text-brown-700">Connect you with UK-specific support resources</Text></li>
            </ul>

            <Text size="3" className="text-brown-700 leading-relaxed block mb-12">
                This Privacy Policy details how and why we collect and process information. Your privacy and safety are our highest priorities.
            </Text>
            <div className="mb-5"></div>

            {/* Table of Contents */}
            <section className="mb-12">
                <div className="border-b-2 border-brown-900 pb-2 mb-6">
                <Heading size="5" className="text-brown-900 font-bold">Table of Contents</Heading>
                </div>
                
                <Text size="3" className="text-brown-900 font-semibold mb-4 block">III. Privacy Policy</Text>
                <div className="mb-4"></div>
                
                <div className="ml-4 space-y-2">
                <div><Link href="#applicability" className="text-brown-700 underline hover:text-brown-900 text-sm">A. Applicability</Link></div>
                <div><Link href="#privacy-first" className="text-brown-700 underline hover:text-brown-900 text-sm">B. Our Privacy-First Approach</Link></div>
                <div><Link href="#information-collect" className="text-brown-700 underline hover:text-brown-900 text-sm">C. Types of Information We Collect</Link></div>
                <div><Link href="#information-use" className="text-brown-700 underline hover:text-brown-900 text-sm">D. How We Use Your Information</Link></div>
                <div><Link href="#privacy-rights" className="text-brown-700 underline hover:text-brown-900 text-sm">E. Your Privacy Rights</Link></div>
                <div><Link href="#information-sharing" className="text-brown-700 underline hover:text-brown-900 text-sm">F. Information Sharing</Link></div>
                <div><Link href="#data-retention" className="text-brown-700 underline hover:text-brown-900 text-sm">G. Data Retention</Link></div>
                <div><Link href="#international-users" className="text-brown-700 underline hover:text-brown-900 text-sm">H. International Users</Link></div>
                <div><Link href="#security-measures" className="text-brown-700 underline hover:text-brown-900 text-sm">I. Security Measures</Link></div>
                <div><Link href="#children-privacy" className="text-brown-700 underline hover:text-brown-900 text-sm">J. Children's Privacy</Link></div>
                <div><Link href="#contact-us" className="text-brown-700 underline hover:text-brown-900 text-sm">K. Contact Us</Link></div>
                </div>
            </section>

            {/* III. Privacy Policy */}
            <section className="mb-12">
                <div className="border-b-2 border-brown-900 pb-2 mb-8">
                <Heading size="5" className="text-brown-900 font-bold">III. Privacy Policy</Heading>
                </div>

                {/* III.A. Applicability */}
                <div id="applicability" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">III.A. Applicability</Heading>
                <div className="mb-4"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    This Privacy Policy covers how we handle your personal information when you use Her DiasporaVoices. "Personal Information" means any information that can identify you personally under applicable data protection laws, including UK GDPR.
                </Text>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>We are committed to minimising data collection.</strong> We only collect information that is essential for platform operation and your safety.
                </Text>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    Changes to this Privacy Policy will only apply to information processed after the effective date. We will notify users of significant changes through the platform.
                </Text>

                <Text size="3" className="text-brown-700 leading-relaxed">
                    As our users are global, your use of Her DiasporaVoices may result in data transfer across international boundaries. We ensure appropriate safeguards are in place for such transfers.
                </Text>
                </div>

                {/* III.B. Our Privacy-First Approach */}
                <div id="privacy-first" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">III.B. Our Privacy-First Approach</Heading>
                <div className="mb-4"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>We fundamentally believe in your right to privacy and safety.</strong> Our approach includes:
                </Text>

                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><Text size="3" className="text-brown-700"><strong>Minimal data collection:</strong> We collect only what is absolutely necessary</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>User control:</strong> You control your data and can delete it at any time</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>No tracking:</strong> We do not track your browsing or build advertising profiles</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>No data sales:</strong> We will never sell your personal information</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>Pseudonym protection:</strong> We encourage and support anonymous participation</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>Safety features:</strong> We provide tools to protect your identity and safety</Text></li>
                </ul>
                </div>

                {/* III.C. Types of Information We Collect */}
                <div id="information-collect" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">III.C. Types of Information We Collect</Heading>
                <div className="mb-4"></div>

                <div className="space-y-6">
                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Email Addresses:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">We collect your email address for account creation and essential communications only</Text></li>
                        <li><Text size="3" className="text-brown-700">We use it to send you account security notifications and platform updates</Text></li>
                        <li><Text size="3" className="text-brown-700">You cannot unsubscribe from security-related emails, but you can opt out of non-essential communications</Text></li>
                        <li><Text size="3" className="text-brown-700">We never share email addresses with third parties except as required by law</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Account Information:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">Automatically generated pseudonym (you control additional personas)</Text></li>
                        <li><Text size="3" className="text-brown-700">Account creation date</Text></li>
                        <li><Text size="3" className="text-brown-700">Basic preferences and accessibility settings</Text></li>
                        <li><Text size="3" className="text-brown-700">Privacy setting choices</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Content Information:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">Stories, comments, and other content you choose to share</Text></li>
                        <li><Text size="3" className="text-brown-700">Personas you create for different privacy contexts</Text></li>
                        <li><Text size="3" className="text-brown-700">Privacy settings for each piece of content</Text></li>
                        <li><Text size="3" className="text-brown-700">Content warnings and tags you apply</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Technical Information (minimal):</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">IP address (for security and anti-spam purposes only)</Text></li>
                        <li><Text size="3" className="text-brown-700">Basic device information (browser type, operating system)</Text></li>
                        <li><Text size="3" className="text-brown-700">Session information for login security</Text></li>
                        <li><Text size="3" className="text-brown-700">Error logs for technical troubleshooting</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>We do NOT collect:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">Real names (unless you voluntarily include them in content)</Text></li>
                        <li><Text size="3" className="text-brown-700">Location data</Text></li>
                        <li><Text size="3" className="text-brown-700">Browsing history outside our platform</Text></li>
                        <li><Text size="3" className="text-brown-700">Social media profiles or contacts</Text></li>
                        <li><Text size="3" className="text-brown-700">Immigration status or legal information</Text></li>
                        <li><Text size="3" className="text-brown-700">Financial information</Text></li>
                    </ul>
                    </div>
                </div>
                </div>

                {/* III.D. How We Use Your Information */}
                <div id="information-use" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">III.D. How We Use Your Information</Heading>
                <div className="mb-4"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    We use your information only for:
                </Text>

                <div className="space-y-4">
                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Essential Platform Functions:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">Enabling you to create and manage stories</Text></li>
                        <li><Text size="3" className="text-brown-700">Providing persona and privacy management features</Text></li>
                        <li><Text size="3" className="text-brown-700">Facilitating community interactions (comments, etc.)</Text></li>
                        <li><Text size="3" className="text-brown-700">Delivering safety features (quick exit, content warnings)</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Platform Security:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">Preventing spam and abuse</Text></li>
                        <li><Text size="3" className="text-brown-700">Protecting against unauthorised access</Text></li>
                        <li><Text size="3" className="text-brown-700">Maintaining platform integrity and user safety</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>User Support:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">Responding to your support requests</Text></li>
                        <li><Text size="3" className="text-brown-700">Providing technical assistance</Text></li>
                        <li><Text size="3" className="text-brown-700">Connecting you with appropriate resources when requested</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Legal Compliance:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">Meeting our legal obligations under UK law</Text></li>
                        <li><Text size="3" className="text-brown-700">Protecting user safety when required by law</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>We do NOT use your information for:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">Targeted advertising or marketing</Text></li>
                        <li><Text size="3" className="text-brown-700">Profiling or automated decision-making</Text></li>
                        <li><Text size="3" className="text-brown-700">Sharing with immigration authorities (unless compelled by court order)</Text></li>
                        <li><Text size="3" className="text-brown-700">Commercial purposes or data sales</Text></li>
                    </ul>
                    </div>
                </div>
                </div>

                {/* III.E. Your Privacy Rights */}
                <div id="privacy-rights" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">III.E. Your Privacy Rights</Heading>
                <div className="mb-4"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>You have extensive rights over your data:</strong>
                </Text>

                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                    <li><Text size="3" className="text-brown-700"><strong>Access:</strong> Request a copy of all personal information we have about you</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>Deletion:</strong> Delete your account and all associated data at any time</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>Portability:</strong> Export your stories and data in standard formats</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>Correction:</strong> Update or correct any personal information</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>Control:</strong> Modify privacy settings for all your content</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>Pseudonym Protection:</strong> Create and manage multiple anonymous personas</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>Content Control:</strong> Edit, delete, or set expiration dates for your stories</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>Opt-out:</strong> Choose not to receive non-essential communications</Text></li>
                </ul>

                <Text size="3" className="text-brown-700 leading-relaxed">
                    <strong>No Discrimination:</strong> We will not treat you differently for exercising your privacy rights
                </Text>
                </div>

                {/* III.F. Information Sharing */}
                <div id="information-sharing" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">III.F. Information Sharing</Heading>
                <div className="mb-4"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>We do not sell, trade, or rent your personal information. Ever.</strong>
                </Text>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>Limited sharing occurs only in these specific circumstances:</strong>
                </Text>

                <div className="space-y-4">
                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>With Your Consent:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">When you explicitly choose to share information</Text></li>
                        <li><Text size="3" className="text-brown-700">When you make content public or semi-public</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>For Platform Operation:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">Technical service providers (with strict data protection agreements)</Text></li>
                        <li><Text size="3" className="text-brown-700">UK-based hosting and security services</Text></li>
                        <li><Text size="3" className="text-brown-700">Email delivery services (for account notifications only)</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Legal Requirements:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">When compelled by valid UK court orders</Text></li>
                        <li><Text size="3" className="text-brown-700">To comply with UK legal obligations</Text></li>
                        <li><Text size="3" className="text-brown-700">To protect user safety in emergency situations</Text></li>
                    </ul>
                    </div>
                </div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>We will notify you if we are legally required to share your information, unless prohibited by law.</strong>
                </Text>

                <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                    <strong>Special Protection for Vulnerable Users:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><Text size="3" className="text-brown-700">We understand that immigration status information could endanger users</Text></li>
                    <li><Text size="3" className="text-brown-700">We will challenge any data requests that could harm immigrant women</Text></li>
                    <li><Text size="3" className="text-brown-700">We maintain legal resources to protect user privacy</Text></li>
                    </ul>
                </div>
                </div>

                {/* III.G. Data Retention */}
                <div id="data-retention" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">III.G. Data Retention</Heading>
                <div className="mb-4"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>You control how long we keep your data:</strong>
                </Text>

                <div className="space-y-4">
                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Active Accounts:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">We keep your information as long as your account remains active</Text></li>
                        <li><Text size="3" className="text-brown-700">You can delete individual stories or your entire account at any time</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Deleted Content:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">Content is immediately removed from public view when you delete it</Text></li>
                        <li><Text size="3" className="text-brown-700">Complete deletion from backups occurs within 30 days</Text></li>
                        <li><Text size="3" className="text-brown-700">Emergency backups for disaster recovery may retain data longer but are not accessible for normal operations</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Account Deletion:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">When you delete your account, we remove all personal information within 30 days</Text></li>
                        <li><Text size="3" className="text-brown-700">Stories can be deleted or "orphaned" (kept without connection to your identity)</Text></li>
                        <li><Text size="3" className="text-brown-700">We may retain minimal information to prevent abuse (but not linked to your identity)</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Legal Holds:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">If content is subject to legal proceedings, retention may be extended as required by law</Text></li>
                    </ul>
                    </div>
                </div>
                </div>

                {/* III.H. International Users */}
                <div id="international-users" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">III.H. International Users</Heading>
                <div className="mb-4"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>For users outside the UK:</strong>
                </Text>

                <div className="space-y-4">
                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Data Transfers:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">Your data may be processed in the UK where our servers are located</Text></li>
                        <li><Text size="3" className="text-brown-700">We ensure appropriate safeguards for international data transfers</Text></li>
                        <li><Text size="3" className="text-brown-700">Users in the EU/EEA have additional rights under GDPR</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Local Laws:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">We comply with UK data protection laws as our primary framework</Text></li>
                        <li><Text size="3" className="text-brown-700">Users in other jurisdictions may have additional rights under local laws</Text></li>
                        <li><Text size="3" className="text-brown-700">We will honour such rights where legally permissible</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Cross-Border Support:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">Our UK resources section serves users globally</Text></li>
                        <li><Text size="3" className="text-brown-700">We connect users with appropriate support services in their location when possible</Text></li>
                    </ul>
                    </div>
                </div>
                </div>

                {/* III.I. Security Measures */}
                <div id="security-measures" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">III.I. Security Measures</Heading>
                <div className="mb-4"></div>

                <Text size="3" className="text-brown-700 leading-relaxed mb-4">
                    <strong>We implement comprehensive security measures:</strong>
                </Text>

                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><Text size="3" className="text-brown-700"><strong>Encryption:</strong> All data transmission is encrypted (HTTPS/TLS)</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>Access Controls:</strong> Strict limits on who can access user data</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>Regular Security Audits:</strong> Ongoing monitoring for vulnerabilities</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>Incident Response:</strong> Rapid response to any security concerns</Text></li>
                    <li><Text size="3" className="text-brown-700"><strong>User Education:</strong> Safety guidance and digital security resources</Text></li>
                </ul>
                </div>

                {/* III.J. Children's Privacy */}
                <div id="children-privacy" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">III.J. Children's Privacy</Heading>
                <div className="mb-4"></div>

                <Text size="3" className="text-brown-700 leading-relaxed">
                    <strong>Our platform is designed for users 16 and older.</strong> We do not knowingly collect information from children under 16. If we discover that a child under 16 has created an account, we will delete it and all associated information.
                </Text>
                </div>

                {/* III.K. Contact Us */}
                <div id="contact-us" className="mb-8">
                <Heading size="4" className="text-brown-900 font-bold mb-4">III.K. Contact Us</Heading>
                <div className="mb-4"></div>

                <div className="space-y-4">
                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>For privacy-related questions or requests:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">Use our <Link href="/support" className="text-brown-700 underline hover:text-brown-900">privacy contact form</Link> (accessible without logging in)</Text></li>
                        <li><Text size="3" className="text-brown-700">Email our Privacy Officer at privacy@herdiasporavoices.org</Text></li>
                        <li><Text size="3" className="text-brown-700">Submit requests through your account settings</Text></li>
                        <li><Text size="3" className="text-brown-700">Contact our <Link href="/support" className="text-brown-700 underline hover:text-brown-900">support team</Link> for general privacy questions</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>For urgent safety concerns:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">Use our emergency contact system</Text></li>
                        <li><Text size="3" className="text-brown-700">Contact appropriate authorities if you are in immediate danger</Text></li>
                    </ul>
                    </div>

                    <div>
                    <Text size="3" className="text-brown-700 leading-relaxed mb-2">
                        <strong>Response Times:</strong>
                    </Text>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><Text size="3" className="text-brown-700">We respond to privacy requests within 30 days</Text></li>
                        <li><Text size="3" className="text-brown-700">Urgent safety matters are addressed immediately</Text></li>
                        <li><Text size="3" className="text-brown-700">General inquiries receive responses within 5 business days</Text></li>
                    </ul>
                    </div>
                </div>
                </div>
            </section>

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
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200">
                        Content Policy
                    </button>
                    </Link>
                    <Link href="/privacy">
                    <button className="px-3 py-1 text-sm bg-brown-100 text-brown-900 border border-brown-300 rounded">
                        Privacy Policy
                    </button>
                    </Link>
                </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-brown-200">
                <Text size="2" className="text-brown-600">
                    This Privacy Policy is regularly reviewed and updated to reflect changes in law and best practices for protecting immigrant women's privacy and safety.
                </Text>
                <div className="mt-2">
                    <Text size="2" className="text-brown-600">
                    The Her DiasporaVoices <Link href="/privacy" className="text-brown-700 underline hover:text-brown-900">Privacy Policy</Link> is licensed under the <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-brown-700 underline hover:text-brown-900">Creative Commons Attribution 4.0 International License</a>.
                    </Text>
                </div>
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
                <Text size="2" className="text-white">© 2025 Her DiasporaVoices. All rights reserved.</Text>
                </div>
            </div>
            </footer>
        </div>
    )
}