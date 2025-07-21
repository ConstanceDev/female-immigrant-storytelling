"use client" 

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button, Card, Text, Flex, Heading, Switch } from "@radix-ui/themes"
import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'
import ThemeSettings from "@/components/settings/ThemeSettings"
import { Car } from "lucide-react"

export default function Profile() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [settings, setSettings] = useState({
        emailNotifications: false,
        profileVisibility: "private",
        dataRetention: "1year",
        anonymousPosting: true
    })

    useEffect(() => {
        if (status === "loading") return
        if (!session) {
            router.push("/auth/signin")
        }
    }, [session, status, router])

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Text>Loading...</Text>
            </div>
        )
    }

    if (!session) {
        return null
    }

    const avatar = createAvatar(initials, {
        seed: session.user?.avatarSeed || session.user?.name || 'default',
        backgroundColor: ['b6e3f4','c084fc','818cf8','fb7185','fbbf24'],
        backgroundType: ['solid'],
    })

    const avatarUrl = avatar.toDataUri()

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/"})
    }

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your stories and data.")) {
            alert("Account deletion functionality will be implemented. This is a prototype.")
        }
    }

    const handleExportData = () => {
        //TODO: implement data export
        alert("Data will be exported!")
    }

return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Flex justify="between" align="center" className="h-16">
            <Heading size="6">Profile & Settings</Heading>
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </Flex>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">

          {/* Profile Section */}
          <Card className="p-6">
            <Flex align="center" gap="6">
              <img
                src={avatarUrl}
                alt="Profile avatar"
                className="w-20 h-20 rounded-full"
              />
              <div className="flex-1">
                <Heading size="5" className="mb-2">
                  {session.user?.pseudonym || session.user?.name}
                </Heading>
                <Text size="2" style={{ color: 'rgb(107 114 128)' }}>
                  {session.user?.email}
                </Text>
                <Text size="2" style={{ color: 'rgb(107 114 128)' }}>
                  Member since {new Date().toLocaleDateString()}
                </Text>
              </div>
              <Button onClick={() => alert("Avatar customisation coming soon!")}>
                Change Avatar
              </Button>
            </Flex>
          </Card>

          {/* Theme Settings */}
          <Card className="p-6">
            <ThemeSettings />
          </Card>

          {/* Privacy Settings */}
          <Card className="p-6">
            <Heading size="4" className="mb-6">Privacy Settings</Heading>

            <div className="space-y-6">
              <Flex justify="between" align="center">
                <div>
                  <Text className="font-medium">Email Notifications</Text>
                  <Text size="2" style={{ color: 'rgb(107 114 128)' }}>
                    Receive notifications about comments and interactions
                  </Text>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({...settings, emailNotifications: checked})
                  }
                />
              </Flex>

              <Flex justify="between" align="center">
                <div>
                  <Text className="font-medium">Anonymous Posting</Text>
                  <Text size="2" style={{ color: 'rgb(107 114 128)' }}>
                    Default to anonymous when sharing stories publicly
                  </Text>
                </div>
                <Switch
                  checked={settings.anonymousPosting}
                  onCheckedChange={(checked) =>
                    setSettings({...settings, anonymousPosting: checked})
                  }
                />
              </Flex>

              <div>
                <Text className="font-medium mb-2">Profile Visibility</Text>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => setSettings({...settings, profileVisibility: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="private">Private (Only me)</option>
                  <option value="trusted">Trusted circles only</option>
                  <option value="community">Community members</option>
                </select>
              </div>

              <div>
                <Text className="font-medium mb-2">Data Retention</Text>
                <select
                  value={settings.dataRetention}
                  onChange={(e) => setSettings({...settings, dataRetention: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="3months">3 months</option>
                  <option value="6months">6 months</option>
                  <option value="1year">1 year</option>
                  <option value="2years">2 years</option>
                  <option value="indefinite">Keep indefinitely</option>
                </select>
                <Text size="2" style={{ color: 'rgb(107 114 128)' }} className="mt-1">
                  How long to keep your stories and data
                </Text>
              </div>
            </div>
          </Card>

          {/* GDPR Compliance */}
          <Card className="p-6">
            <Heading size="4" className="mb-6">Your Data Rights</Heading>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" onClick={handleExportData}>
                  📥 Export My Data
                </Button>
                <Button variant="outline" onClick={() => router.push("/privacy-policy")}>
                  📋 Privacy Policy
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Text size="2" style={{ color: 'rgb(59 130 246)' }}>
                  <strong>Your Rights:</strong> You can request access to, correction of, or deletion of your personal data at any time. You also have the right to data portability and to object to processing.
                </Text>
              </div>
            </div>
          </Card>

          {/* Account Actions */}
          <Card className="p-6">
            <Heading size="4" className="mb-6">Account Actions</Heading>

            <div className="space-y-4">
              <Button
                size="3"
                onClick={handleSignOut}
                style={{ backgroundColor: 'rgb(75 85 99)', color: 'white' }}
                className="w-full md:w-auto"
              >
                Sign Out
              </Button>

              <div className="border-t pt-4">
                <Text size="2" style={{ color: 'rgb(107 114 128)' }} className="mb-4">
                  Danger Zone
                </Text>
                <Button
                  variant="outline"
                  onClick={handleDeleteAccount}
                  style={{ borderColor: '#dc2626', color: '#dc2626' }}
                  className="hover:bg-red-50"
                >
                  Delete Account
                </Button>
                <Text size="2" style={{ color: 'rgb(107 114 128)' }} className="mt-2 block">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}