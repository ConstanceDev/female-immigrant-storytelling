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
                <Heading size="8" className="text-brown-900 font-bold">Terms of Service</Heading>

                {/* Navigation Tabs */}
                <div className="flex gap-2">
                <Link href="/terms">
                    <button className="px-3 py-1 text-sm bg-brown-100 text-brown-900 border border-brown-300 rounded">
                    Terms of Service
                    </button>
                </Link>
                <Link href="/content-policy">
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 borderborder-gray-300 rounded hover:bg-gray-200">
                    Content Policy
                    </button>
                </Link>
                <Link href="/privacy">
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 borderborder-gray-300 rounded hover:bg-gray-200">
                    Privacy Policy
                    </button>
                </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">

                {/* Introduction */}
                <Text size="4" className="text-brown-700 leading-relaxed block mb-8">
                Her DiasporaVoices is a privacy-first digital storytelling platform designed specifically for female immigrants
                to share their experiences, stories, and voices safely and anonymously.
                </Text>
                <div className="mb-5"></div>

                {/* What We Believe Section */}
                <section className="mb-12">
                <div className="border-b-2 border-brown-900 pb-2 mb-6">
                    <Heading size="5" className="text-brown-900 font-bold">What We Believe</Heading>
                </div>

                <ol className="list-decimal list-inside space-y-4 ml-4">
                    <li>
                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>Your privacy and safety come first.</strong> 
                        We are committed to protecting vulnerable users through minimal data collection, 
                        user-controlled privacy settings, and transparent operations.
                    </Text>
                    </li>
                    <li>
                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>Your stories belong to you.</strong> 
                        We do not claim ownership of your content and will never sell
                        your data or personal information to third parties.
                    </Text>
                    </li>
                    <li>
                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>Community care is essential.</strong> 
                        We foster supportive connections whilst protecting individual safety, 
                        understanding that community building must never compromise personal security.
                    </Text>
                    </li>
                    <li>
                    <Text size="3" className="text-brown-700 leading-relaxed">
                        We strive to make our Terms of Service readable and accessible. 
                        We have provided explanations for legal terms, and answers to common questions are available in our  
                        <Link href="/support" className="text-brown-700 underline hover:text-brown-900"> Support & Feedback </Link>.
                    </Text>
                    </li>
                </ol>
                </section>

                {/* Table of Contents */}
                <section className="mb-12">
                <div className="border-b-2 border-brown-900 pb-2 mb-6">
                    <Heading size="5" className="text-brown-900 font-bold">
                        ▼ Table of Contents for the Terms of Service (TOS)</Heading>
                </div>

                <Text size="3" className="text-brown-700 leading-relaxed block mb-6">
                    There are three parts to the Her DiasporaVoices Terms of Service. 
                    The General Principles are the first part of the TOS.
                </Text>

                <div className="ml-4 space-y-2">
                    <div>
                    <Text size="3" className="text-brown-900 font-semibold">
                        I. ▼ General Principles (current section)</Text>
                    <div className="ml-4 mt-2 space-y-1">
                        <div><Link href="#general-terms" className="text-brown-700 underline hover:text-brown-900 text-sm">A. General terms</Link></div>
                        <div><Link href="#updates" className="text-brown-700 underline hover:text-brown-900 text-sm">B. Updates to the Terms of Service</Link></div>
                        <div><Link href="#platform-availability" className="text-brown-700 underline hover:text-brown-900 text-sm">C. Platform availability and limitations</Link></div>
                        <div><Link href="#content-access" className="text-brown-700 underline hover:text-brown-900 text-sm">D. Content you access when using Her DiasporaVoices</Link></div>
                        <div><Link href="#our-content-use" className="text-brown-700 underline hover:text-brown-900 text-sm">E. What we do with your content</Link></div>
                        <div><Link href="#prohibited-use" className="text-brown-700 underline hover:text-brown-900 text-sm">F. What you cannot do</Link></div>
                        <div><Link href="#registration" className="text-brown-700 underline hover:text-brown-900 text-sm">G. Registration and identity protection</Link></div>
                        <div><Link href="#age-policy" className="text-brown-700 underline hover:text-brown-900 text-sm">H. Age Policy</Link></div>
                        <div><Link href="#abuse-policy" className="text-brown-700 underline hover:text-brown-900 text-sm">I. Abuse Policy</Link></div>
                    </div>
                    </div>
                    <div>
                    <Text size="3" className="text-brown-900 font-semibold">
                        II. ▶ <Link href="/content-policy" className="text-brown-700 underline hover:text-brown-900">Content Policy</Link>
                    </Text>
                    </div>
                    <div>
                    <Text size="3" className="text-brown-900 font-semibold">
                        III. ▶ <Link href="/privacy" className="text-brown-700 underline hover:text-brown-900">Privacy Policy</Link>
                    </Text>
                    </div>
                </div>
                </section>

                {/* I. General Principles */}
                <section className="mb-12">
                <div className="border-b-2 border-brown-900 pb-2 mb-8">
                    <Heading size="5" className="text-brown-900 font-bold">I. General Principles</Heading>
                </div>

                {/* I.A. General Terms */}
                <div id="general-terms" className="mb-8">
                    <Heading size="4" className="text-brown-900 font-bold mb-4">I.A. General terms</Heading>
                    <div className="mb-3"></div>

                    <div className="space-y-6">
                    <div>
                        <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>1. Agreement: </strong> 
                        Her DiasporaVoices hosts and shares stories created by and for female immigrants.
                        Our <Link href="/content-policy" className="underline ">Content Policy</Link>
                        and <Link href="/privacy" className="underline ">Privacy Policy</Link> are part of these Terms of Service (TOS). By submitting a story, comment, persona, tag, image, audio, video file, 
                        or any other form of content (&ldquo;Content&rdquo;) to Her DiasporaVoices (hereinafter &ldquo;Service&rdquo;, &ldquo;Platform&rdquo;, 
                        or &ldquo;Her DiasporaVoices&rdquo;), or by creating an account and/or accessing Content, you affirm that you comply with and agree to these TOS.
                        </Text>
                    </div>

                    <div>
                        <Text size="3" className="leading-relaxed">
                        <strong>2. Entirety of agreement: </strong> 
                        These Terms of Service constitute the entire agreement between you and 
                        Her DiasporaVoices and govern your use of the platform. 
                        They replace all prior agreements concerning your use of Her DiasporaVoices.
                        </Text>
                    </div>

                    <div>
                        <Text size="3" className="leading-relaxed">
                        <strong>3. Jurisdiction: </strong> 
                        These TOS and any disputes shall be governed by the laws of the United Kingdom. 
                        You agree to submit to the jurisdiction of UK courts for any disputes arising from your use of Her DiasporaVoices.
                        </Text>
                    </div>

                    <div>
                        <Text size="3" className="leading-relaxed">
                        <strong>4. Non-severability: </strong> 
                        Our failure to enforce any part of these TOS does not waive our ability to enforce other parts. 
                        If any provision is found invalid by a court, you agree that the court should give effect to the parties&apos; intentions as reflected in the provision, 
                        and all other provisions remain in full force.
                        </Text>
                    </div>

                    <div>
                        <Text size="3" className="leading-relaxed">
                        <strong>5. Limitation on claims: </strong> 
                        Any claim arising from your use of Her DiasporaVoices must be filed within 
                        one (1) year after such claim arose or be forever barred.
                        </Text>
                    </div>

                    <div>
                        <Text size="3" className="leading-relaxed">
                        <strong>6. No assignment: </strong> 
                        These TOS are personal to you. 
                        You may not assign or transfer your rights or obligations to any other person, 
                        and any attempted assignment is void.
                        </Text>
                    </div>
                    </div>
                </div>

                {/* I.B. Updates */}
                <div id="updates" className="mb-8">
                    <Heading size="4" className="text-brown-900 font-bold mb-4">
                        I.B. Updates to the Terms of Service
                    </Heading>
                    <div className="mb-3"></div>
                    <Text size="3" className="text-brown-700 leading-relaxed">
                    Changes to these TOS will be made through the following process: Proposed changes will be prominently disclosed on Her DiasporaVoices for a public comment period lasting at least
                    two weeks. After the comment period, changes will be reviewed and, if approved, will become
                    effective when posted. This is the only means by which the TOS may be altered. The TOS cannot be
                    changed by emails or other communications.
                    </Text>
                </div>

                {/* I.C. Platform Availability */}
                <div id="platform-availability" className="mb-8">
                    <Heading size="4" className="text-brown-900 font-bold mb-4">
                        I.C. Platform availability and limitations
                    </Heading>
                    <div className="mb-3"></div>
                    <div className="space-y-4">

                    <Text size="3" className="text-brown-700 leading-relaxed">
                    <strong>1.</strong> Her DiasporaVoices provides services on an &quot;as is&quot; and &quot;as
                    available&quot; basis. We do not warrant that our services will meet all your requirements; be
                    uninterrupted, timely, secure, or error-free; or that results will be accurate or satisfactory.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                    <strong>2.</strong> If we learn of a security breach affecting user information,
                    we will notify affected users and relevant authorities as required by law as soon as practicable.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>3.</strong> Any material you access through Her DiasporaVoices is at
                        your own risk. You are solely responsible for any damage or data loss resulting from accessing such material.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>4.</strong> We expressly disclaim all warranties of any kind, whether express or implied, 
                        including warranties of merchantability, fitness for a particular purpose, and non-infringement.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>5.</strong> You agree that Her DiasporaVoices shall not be liable for
                        damages resulting from your use or inability to use the platform; unauthorised access to or
                        changes in your content; or actions of other users.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>6.</strong> Her DiasporaVoices is not intended as a personal storage
                        service. You are <strong>solely responsible for backing up any content you submit</strong>. We
                        will not be liable for lost or unrecoverable content.
                    </Text>
                    <div className="mb-3"></div>
                    </div>
                </div>

                {/* I.D. Content you access */}
                <div id="content-access" className="mb-8">
                    <Heading size="4" className="text-brown-900 font-bold mb-4">
                        I.D. Content you access when using Her DiasporaVoices
                    </Heading>
                    <div className="mb-3"></div>

                    <div className="space-y-4">
                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>1.</strong> All content on Her DiasporaVoices is created by users. We do
                    not endorse or guarantee the accuracy, completeness, or reliability of any user-generated content.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>2.</strong> You acknowledge that some content may be disturbing,
                        offensive, or triggering. We provide content warnings where possible, but you access all content
                        at your own discretion.
                    </Text>

                    <div className="mb-3"></div>
                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>3.</strong> Content remains the intellectual property of its creators.
                        By accessing content, you do not gain any ownership rights or licences beyond what is explicitly
                        granted by the creator.
                    </Text>
                    </div>
                </div>

                {/* I.E. What we do with your content */}
                <div id="our-content-use" className="mb-8">
                    <Heading size="4" className="text-brown-900 font-bold mb-4">
                        I.E. What we do with your content
                    </Heading>
                    <div className="mb-3"></div>

                    <div className="space-y-4">
                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>1. Ownership:</strong> You retain full ownership and copyright of all
                        content you submit to Her DiasporaVoices. We do not claim ownership of your stories, comments, or other content.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>2. Licence:</strong> By submitting content, you grant Her DiasporaVoices
                        a non-exclusive, royalty-free licence to host, display, and distribute your content solely for
                        the purpose of operating the platform.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>3. Privacy controls:</strong> You maintain full control over the
                        visibility of your content through our privacy settings. You may make content public, private, or
                        restrict access as desired.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>4. Removal:</strong> You may delete your content at any time. We will
                        make reasonable efforts to remove deleted content from public view, though archived copies may
                        persist in backups for technical reasons.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>5. No monetisation:</strong> We do not and will never monetise, sell, or
                        profit from your personal content or data. Her DiasporaVoices operates as a non-commercial platform.
                    </Text>
                    </div>
                </div>

                {/* I.F. What you cannot do */}
                <div id="prohibited-use" className="mb-8">
                    <Heading size="4" className="text-brown-900 font-bold mb-4">
                        I.F. What you cannot do
                    </Heading>
                    <div className="mb-3"></div>
                    <div className="space-y-4">
                    <Text size="3" className="text-brown-700 leading-relaxed">
                        You may not use Her DiasporaVoices to:
                    </Text>

                    <div className="ml-4 space-y-3">
                        <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>1.</strong> Post content that violates our <Link href="/content-policy" className="text-brown-700 underline hover:text-brown-900">
                        Content Policy</Link>, including harassment, hate speech, or content that endangers user safety.
                        </Text>
                        <div className="mb-3"></div>

                        <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>2.</strong> Attempt to identify, harass, or contact other users
                        outside the platform without their explicit consent.
                        </Text>
                        <div className="mb-3"></div>

                        <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>3.</strong> Share others&apos; personal information or attempt to compromise user privacy or anonymity.
                        </Text>
                        <div className="mb-3"></div>

                        <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>4.</strong> Engage in spam, phishing, or other deceptive practices.
                        </Text>
                        <div className="mb-3"></div>
                        
                        <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>5.</strong> Attempt to hack, disrupt, or damage the platform&apos;s technical infrastructure.
                        </Text>
                        <div className="mb-3"></div>

                        <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>6.</strong> Use automated tools or bots to access or interact with the platform without permission.
                        </Text>
                        <div className="mb-3"></div>

                        <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>7.</strong> Violate any applicable laws or regulations in your use of the platform.
                        </Text>
                        <div className="mb-3"></div>
                    </div>
                    </div>
                </div>

                {/* I.G. Registration and identity protection */}
                <div id="registration" className="mb-8">
                    <Heading size="4" className="text-brown-900 font-bold mb-4">
                        I.G. Registration and identity protection
                    </Heading>
                    <div className="mb-3"></div>

                    <div className="space-y-4">
                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>1. Account security:</strong> You are responsible for maintaining the
                    security of your account credentials. Choose a strong, unique password and do not share it with others.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>2. Identity protection:</strong> We understand the importance of
                        anonymity for vulnerable users. You may use pseudonyms and are not required to provide identifying
                        information beyond what is necessary for account security.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>3. Multiple personas:</strong> You may create multiple personas within
                        your account to maintain separation between different aspects of your identity or experiences.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>4. Account termination:</strong> You may delete your account at any
                        time. We will permanently remove your data as described in our <Link href="/privacy" className="text-brown-700 underline hover:text-brown-900">Privacy Policy</Link>.
                    </Text>
                    <div className="mb-3"></div>
                    </div>
                </div>

                {/* I.H. Age Policy */}
                <div id="age-policy" className="mb-8">
                    <Heading size="4" className="text-brown-900 font-bold mb-4">
                        I.H. Age Policy
                    </Heading>
                    <div className="mb-3"></div>

                    <div className="space-y-4">
                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>1. Minimum age:</strong> You must be at least 16 years old to create an
                        account on Her DiasporaVoices. This platform deals with mature themes that may not be appropriate
                        for younger users.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>2. Parental consent:</strong> Users between 16-18 years old should have
                        parental or guardian awareness of their participation, though we do not require explicit parental consent.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>3. Age verification:</strong> While we do not routinely verify ages,
                        providing false age information violates these terms and may result in account suspension.
                    </Text>
                    <div className="mb-3"></div>
                    </div>
                </div>

                {/* I.I. Abuse Policy */}
                <div id="abuse-policy" className="mb-8">
                    <Heading size="4" className="text-brown-900 font-bold mb-4">
                        I.I. Abuse Policy
                    </Heading>
                    <div className="mb-3"></div>
                    <div className="space-y-4">
                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>1. Reporting mechanism:</strong> If you encounter content or behaviour
                        that violates our policies, please report it through our <Link href="/support" className="text-brown-700 underline hover:text-brown-900">support system</Link>. All reports are
                        reviewed promptly and confidentially.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>2. Investigation process:</strong> We investigate all reports fairly and
                        thoroughly, considering context and community impact. Users may be contacted for additional
                        information during investigations.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>3. Enforcement actions:</strong> Violations may result in content
                        removal, account warnings, temporary suspension, or permanent account termination, depending on
                        severity and frequency.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>4. Appeals process:</strong> Users may appeal enforcement actions
                        through our <Link href="/support" className="text-brown-700 underline hover:text-brown-900">support system</Link>. Appeals are reviewed by a different team member when possible.
                    </Text>
                    <div className="mb-3"></div>

                    <Text size="3" className="text-brown-700 leading-relaxed">
                        <strong>5. Legal obligations:</strong> We may report illegal activity to
                        relevant authorities when required by law, but will always prioritise user safety and privacy in our approach.
                    </Text>
                    <div className="mb-3"></div>
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
                        <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 borderborder-gray-300 rounded hover:bg-gray-200">
                        ↑ Top
                        </button>
                    </Link>
                    <Link href="/terms">
                        <button className="px-3 py-1 text-sm bg-brown-100 text-brown-900 border border-brown-300 rounded">
                        Terms of Service
                        </button>
                    </Link>
                    <Link href="/content-policy">
                        <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 borderborder-gray-300 rounded hover:bg-gray-200">
                        Content Policy
                        </button>
                    </Link>
                    <Link href="/privacy">
                        <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 borderborder-gray-300 rounded hover:bg-gray-200">
                        Privacy Policy
                        </button>
                    </Link>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-brown-200">
                    <Text size="2" className="text-brown-600">
                    The Her DiasporaVoices <Link href="/terms" className="text-brown-700 underline hover:text-brown-900">Terms of Service</Link>, including the <Link href="/content-policy" 
                    className="text-brown-700 underline hover:text-brown-900">Content Policy</Link> and <Link 
                    href="/privacy" className="text-brown-700 underline hover:text-brown-900">Privacy Policy</Link>,
                    are licensed under the <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" 
                    rel="noopener noreferrer" className="text-brown-700 underline hover:text-brown-900">Creative
                    Commons Attribution 4.0 International License</a>.
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