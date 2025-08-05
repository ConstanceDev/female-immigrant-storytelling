"use client" 

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button, Card, Text, Flex, Heading, Switch } from "@radix-ui/themes"
import { createAvatar } from '@dicebear/core'
import { 
    initials, 
    adventurer,
    adventurerNeutral,
    avataaars,
    avataaarsNeutral,
    bigEars,
    bigEarsNeutral,
    bigSmile,
    bottts,
    bottsNeutral,
    croodles,
    croodlesNeutral,
    funEmoji,
    icons,
    identicon,
    lorelei,
    loreleiNeutral,
    micah,
    miniavs,
    notionists,
    notionistsNeutral,
    openPeeps,
    personas,
    pixelArt,
    pixelArtNeutral,
    rings,
    shapes,
    thumbs
} from '@dicebear/collection'
import ThemeSettings from "@/components/settings/ThemeSettings"
import PersonaManager from "@/components/persona/PersonaManager"

export default function Profile() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [settings, setSettings] = useState({
        emailNotifications: false,
        profileVisibility: "private",
        dataRetention: "1year",
        anonymousPosting: true
    })
    const [showAvatarModal, setShowAvatarModal] = useState(false)
    const [selectedAvatarSeed, setSelectedAvatarSeed] = useState(
      session?.user?.avatarSeed || session?.user?.name || 'default'
    )
    const [selectedAvatarStyle, setSelectedAvatarStyle] = useState('initials')

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

    // Avatar style configurations
    const avatarStyles = {
        initials: { collection: initials, name: 'Initials', emoji: '🔤' },
        adventurer: { collection: adventurer, name: 'Adventurer', emoji: '🏃‍♂️' },
        adventurerNeutral: { collection: adventurerNeutral, name: 'Adventurer Neutral', emoji: '🚶‍♂️' },
        avataaars: { collection: avataaars, name: 'Avataaars', emoji: '👤' },
        avataaarsNeutral: { collection: avataaarsNeutral, name: 'Avataaars Neutral', emoji: '😐' },
        bigEars: { collection: bigEars, name: 'Big Ears', emoji: '👂' },
        bigEarsNeutral: { collection: bigEarsNeutral, name: 'Big Ears Neutral', emoji: '🙂' },
        bigSmile: { collection: bigSmile, name: 'Big Smile', emoji: '😄' },
        bottts: { collection: bottts, name: 'Bottts', emoji: '🤖' },
        bottsNeutral: { collection: bottsNeutral, name: 'Bottts Neutral', emoji: '🤖' },
        croodles: { collection: croodles, name: 'Croodles', emoji: '🎨' },
        croodlesNeutral: { collection: croodlesNeutral, name: 'Croodles Neutral', emoji: '✏️' },
        funEmoji: { collection: funEmoji, name: 'Fun Emoji', emoji: '🎭' },
        icons: { collection: icons, name: 'Icons', emoji: '🔰' },
        identicon: { collection: identicon, name: 'Identicon', emoji: '🔳' },
        lorelei: { collection: lorelei, name: 'Lorelei', emoji: '👩‍🦰' },
        loreleiNeutral: { collection: loreleiNeutral, name: 'Lorelei Neutral', emoji: '👩' },
        micah: { collection: micah, name: 'Micah', emoji: '👨‍💼' },
        miniavs: { collection: miniavs, name: 'Miniavs', emoji: '🧑‍💻' },
        notionists: { collection: notionists, name: 'Notionists', emoji: '💼' },
        notionistsNeutral: { collection: notionistsNeutral, name: 'Notionists Neutral', emoji: '📋' },
        openPeeps: { collection: openPeeps, name: 'Open Peeps', emoji: '👥' },
        personas: { collection: personas, name: 'Personas', emoji: '🎭' },
        pixelArt: { collection: pixelArt, name: 'Pixel Art', emoji: '🎮' },
        pixelArtNeutral: { collection: pixelArtNeutral, name: 'Pixel Art Neutral', emoji: '👾' },
        rings: { collection: rings, name: 'Rings', emoji: '⭕' },
        shapes: { collection: shapes, name: 'Shapes', emoji: '🔸' },
        thumbs: { collection: thumbs, name: 'Thumbs', emoji: '👍' }
    }

    // Generate avatar using current seed and style
    const generateAvatar = (seed: string, style: string = selectedAvatarStyle) => {
        const styleConfig = avatarStyles[style as keyof typeof avatarStyles]
        if (!styleConfig) return ''

        return createAvatar(styleConfig.collection, {
            seed: seed,
            backgroundColor: ['b6e3f4','c084fc','818cf8','fb7185','fbbf24'],
            backgroundType: ['solid'],
        }).toDataUri()
    }

    const avatarUrl = generateAvatar(selectedAvatarSeed, selectedAvatarStyle)

    // Generate random avatar options for current style
    const generateAvatarOptions = () => {
        const randomSeeds = [
            `${session?.user?.name || 'user'}_1`,
            `${session?.user?.name || 'user'}_2`, 
            `${session?.user?.name || 'user'}_3`,
            `${session?.user?.email || 'default'}_variant`,
            `creative_${Date.now().toString().slice(-6)}`,
            `artistic_${Math.random().toString(36).substring(7)}`,
            `unique_${Math.random().toString(36).substring(7)}`,
            `style_${Math.random().toString(36).substring(7)}`
        ]
        return randomSeeds.map(seed => ({
            seed,
            url: generateAvatar(seed, selectedAvatarStyle)
        }))
    }

    const handleSaveAvatar = async () => {
        // TODO: Implement avatar save functionality
        // This would update the user's avatarSeed in the database
        alert(`Avatar saved! Seed: ${selectedAvatarSeed}`)
        setShowAvatarModal(false)
    }

    const handleUploadImage = () => {
        // TODO: Implement custom image upload functionality
        alert("Custom image upload coming soon!")
    }

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
              <Button onClick={() => setShowAvatarModal(true)}>
                🎨 Change Avatar
              </Button>
            </Flex>
          </Card>

          {/* Persona Management */} 
          <Card >
            <PersonaManager />
          </Card>

          {/* Theme Settings */}
          <Card className="p-6">
            <ThemeSettings />
          </Card>

          {/* Privacy Settings */}
          <Card className="p-6">
            <Heading size="4" className="mb-6">Privacy Settings</Heading>
            <div className="mb-3"></div>

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
            <div className="mb-3"></div>

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
            <div className="mb-3"></div>
            
            {/* Regular Actions */}
            <div className="mb-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="3"
                  onClick={handleSignOut}
                  variant="soft"
                  style={{ backgroundColor: 'rgb(75 85 99)', color: 'white' }}
                  className="flex-1 sm:flex-none"
                >
                  🚪 Sign Out
                </Button>
                <Button
                  size="3"
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                  className="flex-1 sm:flex-none"
                >
                  📊 Dashboard
                </Button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="border-t border-red-200 pt-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <Flex align="center" gap="2" className="mb-2">
                  <span className="text-red-500">⚠️</span>
                  <Text weight="bold" style={{ color: '#dc2626' }}>
                    Danger Zone
                  </Text>
                </Flex>
                <Text size="2" style={{ color: 'rgb(107 114 128)' }}>
                  Permanently delete your account and all associated data. This action cannot be undone.
                </Text>
              </div>
              
              <Button
                variant="outline"
                onClick={handleDeleteAccount}
                style={{ 
                  borderColor: '#dc2626', 
                  color: '#dc2626',
                  backgroundColor: 'transparent'
                }}
                className="hover:bg-red-50 transition-colors"
              >
                🗑️ Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Avatar Customization Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <Heading size="4">Choose Your Avatar</Heading>
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Current Avatar Preview */}
              <div className="text-center mb-6">
                <img
                  src={generateAvatar(selectedAvatarSeed, selectedAvatarStyle)}
                  alt="Selected avatar"
                  className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-purple-200"
                />
                <Text size="2" style={{ color: 'rgb(107 114 128)' }}>
                  Current Selection - {avatarStyles[selectedAvatarStyle as keyof typeof avatarStyles]?.name}
                </Text>
              </div>

              {/* Avatar Style Selection */}
              <div className="mb-6">
                <Heading size="3" className="mb-4">Choose Avatar Style</Heading>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-64 overflow-y-auto border rounded-lg p-3">
                  {Object.entries(avatarStyles).map(([styleKey, styleConfig]) => (
                    <button
                      key={styleKey}
                      onClick={() => setSelectedAvatarStyle(styleKey)}
                      className={`p-2 rounded-lg border-2 transition-all text-center ${
                        selectedAvatarStyle === styleKey
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{styleConfig.emoji}</div>
                      <div className="text-xs text-gray-600 leading-tight">
                        {styleConfig.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Custom Image Section */}
              <div className="mb-6 p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
                <div className="mb-3">
                  <span className="text-4xl">📸</span>
                </div>
                <Heading size="3" className="mb-2">Upload Custom Image</Heading>
                <Text size="2" style={{ color: 'rgb(107 114 128)' }} className="mb-4">
                  Use your own photo as avatar
                </Text>
                <div className="mb-3"></div>
                <Button 
                  variant="outline" 
                  onClick={handleUploadImage}
                  className="opacity-50"
                >
                  📤 Upload Image
                </Button>
              </div>

              {/* DiceBear Avatar Options */}
              <div className="mb-6">
                <Heading size="3" className="mb-4">Choose from Generated Avatars</Heading>
                <div className="grid grid-cols-4 gap-4">
                  {generateAvatarOptions().map((option, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer p-2 rounded-lg border-2 transition-all hover:border-purple-300 ${
                        selectedAvatarSeed === option.seed
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedAvatarSeed(option.seed)}
                    >
                      <img
                        src={option.url}
                        alt={`Avatar option ${index + 1}`}
                        className="w-full h-16 rounded-full mx-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate More Options */}
              <div className="text-center mb-6">
                <Button
                  variant="soft"
                  onClick={() => {
                    // Force re-render by updating a random component of the seed
                    const timestamp = Date.now().toString().slice(-6)
                    setSelectedAvatarSeed(`${session?.user?.name || 'user'}_${timestamp}`)
                  }}
                >
                  🎲 Generate New Options
                </Button>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 justify-end">
                <Button
                  variant="soft"
                  onClick={() => setShowAvatarModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveAvatar}
                  style={{ backgroundColor: 'rgb(147 51 234)', color: 'white' }}
                >
                  💾 Save Avatar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}