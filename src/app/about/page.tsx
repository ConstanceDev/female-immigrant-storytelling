"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Text, Flex, Heading, Card } from "@radix-ui/themes"
import ThemeToolbar from "@/contexts/ThemeToolbar";


export default function About() {
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

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <Flex align="center" gap="2">
                    <ThemeToolbar />
                    <button
                        className="text-brown-700 hover:text-brown-900 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                    >
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    </Flex>
                </div>
                </Flex>
            </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* About Section */}
            <section className="mb-16">
                <Heading size="7" className="text-brown-900 mb-8 font-bold">About Her DiasporaVoices</Heading>
                <div className="mb-4"></div>
                <Text size="4" className="text-brown-700 leading-relaxed block mb-6">
                    <strong>Her DiasporaVoices</strong> is a privacy-first digital storytelling platform designed specifically for female immigrants to share their experiences, 
                    emotions, and journeys safely and anonymously. We understand that immigrant women face unique challenges when expressing themselves online, 
                    from concerns about surveillance and cultural stigma to fears about personal safety. 
                    Our platform provides a secure space where women can tell their stories using multiple personas, 
                    control exactly who sees their content, and connect with others who understand their experiences. 
                    Whether sharing struggles with integration, celebrating cultural traditions, or seeking support during difficult times, 
                    Her DiasporaVoices empowers women to reclaim their narratives whilst protecting their privacy and safety. 
                    Built by researchers who believe in the power of storytelling for healing and community building, 
                    our platform puts user agency and safety at the heart of everything we do.

                </Text>
            </section>

            {/* Our Values Section */}
            <section className="mb-16">
                <Heading size="6" className="text-brown-900 mb-8 font-bold">Our Values</Heading>
                <div className="mb-4"></div>
                <Text size="4" className="text-brown-700 leading-relaxed block">
                    <strong>Privacy First:</strong> Your safety and privacy are non-negotiable. We collect minimal data, give you complete control over your content, and will never share your information without your explicit consent.
                    <div className="mb-3"></div>
                    <strong>Cultural Sensitivity:</strong> We recognise and celebrate the rich diversity of immigrant experiences, avoiding one-size-fits-all approaches and respecting different cultural norms around storytelling and self-expression.
                    <div className="mb-3"></div>
                    <strong>User Agency: </strong> You have complete control over your identity, content, and level of engagement. From multiple personas to granular privacy settings, every feature is designed to maximise your autonomy.
                    <div className="mb-3"></div>
                    <strong>Community Care:</strong> We foster supportive connections whilst protecting individual safety, understanding that community building must never come at the expense of personal security.
                    <div className="mb-3"></div>
                    <strong>Accessibility for All:</strong> Our platform serves users with diverse abilities, technical literacy levels, and cultural backgrounds, ensuring that technology barriers never prevent authentic expression.
                    <div className="mb-3"></div>
                    <strong>Transparency:</strong> We operate with complete openness about how our platform works, what data we collect, and how your content is handled, because trust requires transparency.
                </Text>
            </section>

            {/* Our Team Section */}
            <section className="mb-16">
                <Heading size="6" className="text-brown-900 mb-12 font-bold">Our Team</Heading>
                <div className="mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Team Member 1 */}
                <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden" style={{ backgroundColor: '#f4c2c2' }}>
                    <div className="w-full h-full flex items-center justify-center">
                    <img
                    src="/images/CEO.jpg"
                    alt="Aisha's portrait"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling.style.display = 'flex'
                    }}
                    />
                    </div>
                    </div>
                    <Heading size="4" className="text-brown-900 mb-2 font-semibold">Constance Lu</Heading>
                    <Text size="2" className="text-brown-600">Founder & CEO</Text>
                </div>
                </div>
            </section>

            {/* Our Impact Section */}
            <section className="mb-16">
                <Heading size="6" className="text-brown-900 mb-12 font-bold">Our Impact</Heading>
                <div className="mb-4"></div>

                {/* Impact Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="p-8 text-center" style={{ backgroundColor: '#f8f8f8' }}>
                    <Text size="2" className="text-brown-600 mb-2 font-medium block">Stories Shared</Text>
                    <Heading size="8" className="text-brown-900 font-bold">500+</Heading>
                </Card>
                <Card className="p-8 text-center" style={{ backgroundColor: '#f8f8f8' }}>
                    <Text size="2" className="text-brown-600 mb-2 font-medium block">Community Members</Text>
                    <Heading size="8" className="text-brown-900 font-bold">2,000+</Heading>
                </Card>
                <Card className="p-8 text-center" style={{ backgroundColor: '#f8f8f8' }}>
                    <Text size="2" className="text-brown-600 mb-2 font-medium block">Countries Represented</Text>
                    <Heading size="8" className="text-brown-900 font-bold">50+</Heading>
                </Card>
                </div>

                {/* Stories by Region */}
                <div className="mb-8">
                <Heading size="4" className="text-brown-900 mb-6 font-semibold">Stories by Region</Heading>
                <div className="mb-4"></div>
                <Heading size="8" className="text-brown-900 font-bold mb-4">500+</Heading>
                <div className="mb-4"></div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                    <Text size="3" className="text-brown-700 w-32">Total</Text>
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-64 h-2 bg-gray-200 rounded-full">
                        <div className="w-full h-full bg-green-500 rounded-full"></div>
                        </div>
                        <Text size="3" className="text-green-600 font-medium">+ 35%</Text>
                    </div>

                    </div>
                    <div className="flex items-center justify-between">
                    <Text size="3" className="text-brown-700 w-32">Africa</Text>
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-4 h-2 bg-gray-200 rounded-full">
                        <div className="w-full h-full bg-green-500 rounded-full"></div>
                        </div>
                        <Text size="3" className="text-green-600 font-medium">+ 5%</Text>
                    </div>

                    </div>
                    <div className="flex items-center justify-between">
                    <Text size="3" className="text-brown-700 w-32">Asia</Text>
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-35 h-2 bg-gray-200 rounded-full">
                        <div className="w-full h-full bg-green-500 rounded-full"></div>
                        </div>
                        <Text size="3" className="text-green-600 font-medium">+ 20%</Text>
                    </div>

                    </div>
                    <div className="flex items-center justify-between">
                    <Text size="3" className="text-brown-700 w-32">Europe</Text>
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-44 h-2 bg-gray-200 rounded-full">
                        <div className="w-full h-full bg-green-500 rounded-full"></div>
                        </div>
                        <Text size="3" className="text-green-600 font-medium">+ 25%</Text>
                    </div>

                    </div>
                    <div className="flex items-center justify-between">
                    <Text size="3" className="text-brown-700 w-32">North America</Text>
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-30 h-2 bg-gray-200 rounded-full">
                        <div className="w-full h-full bg-green-500 rounded-full"></div>
                        </div>
                        <Text size="3" className="text-green-600 font-medium">+ 15%</Text>
                    </div>

                    </div>
                    <div className="flex items-center justify-between">
                    <Text size="3" className="text-brown-700 w-32">South America</Text>
                        <div className="flex items-center gap-4 flex-1">
                        <div className="w-15 h-2 bg-gray-200 rounded-full">
                        <div className="w-full h-full bg-green-500 rounded-full"></div>
                        </div>
                        <Text size="3" className="text-green-600 font-medium">+ 10%</Text>
                    </div>

                    </div>
                    <div className="flex items-center justify-between">
                    <Text size="3" className="text-brown-700 w-32">Oceania</Text>
                        <div className="flex items-center gap-4 flex-1">
                        <div className="w-4 h-2 bg-gray-200 rounded-full">
                        <div className="w-full h-full bg-green-500 rounded-full"></div>
                        </div>
                        <Text size="3" className="text-green-600 font-medium">+ 5%</Text>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            {/* Get Involved Section */}
            <section className="mb-16">
                <Heading size="6" className="text-brown-900 mb-8 font-bold">Get Involved</Heading>
                <div className="mb-4"></div>
                <Text size="3" className="text-brown-700 leading-relaxed block mb-8">
                We are always looking for passionate individuals to join our team or support our mission. Whether you&apos;re a storyteller,
                a volunteer, or a donor, your contribution can make a difference.
                </Text>
                <div className="mb-10"></div>
                <Flex gap="4">
                <Button
                    onClick={() => router.push("/auth/signin")}
                    className="text-black"
                    style={{ backgroundColor: '#f3cbcb' }}
                    size="3"
                >
                    Share Your Story
                </Button>
                <Button
                    onClick={() => router.push("/support")}
                    className="text-brown-900 border border-brown-300 hover:bg-brown-50"
                    variant="outline"
                    size="3"
                >
                    Contact Us
                </Button>
                </Flex>
            </section>

            </main>
        </div>
        )
}