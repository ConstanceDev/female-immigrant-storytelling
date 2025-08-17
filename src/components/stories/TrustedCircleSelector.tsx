"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'

interface User {
  id: string
  name?: string
  email?: string
  pseudonym?: string
  avatarSeed?: string
}

interface TrustedCircleSelectorProps {
  selectedUserIds: string[]
  onSelectionChange: (userIds: string[]) => void
  disabled?: boolean
}

export default function TrustedCircleSelector({ 
  selectedUserIds, 
  onSelectionChange, 
  disabled = false 
}: TrustedCircleSelectorProps) {
  const { data: session } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    // Filter users based on search query
    if (searchQuery.trim()) {
      const filtered = users.filter(user => 
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.pseudonym?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [users, searchQuery])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (response.ok) {
        const data = await response.json()
        // Exclude current user from the list
        const otherUsers = data.filter((user: User) => user.id !== session?.user?.id)
        setUsers(otherUsers)
        setFilteredUsers(otherUsers)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateAvatar = (seed: string) => {
    return createAvatar(initials, {
      seed: seed,
      backgroundColor: ['b6e3f4','c084fc','818cf8','fb7185','fbbf24'],
      backgroundType: ['solid'],
    }).toDataUri()
  }

  const toggleUserSelection = (userId: string) => {
    if (disabled) return

    const newSelection = selectedUserIds.includes(userId)
      ? selectedUserIds.filter(id => id !== userId)
      : [...selectedUserIds, userId]
    
    onSelectionChange(newSelection)
  }

  const getUserDisplayName = (user: User) => {
    return user.pseudonym || user.name || user.email || 'Unknown User'
  }

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        Loading users...
      </div>
    )
  }

    return (
        <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Select trusted circle members
            </label>
            <p className="text-sm text-gray-500 mb-3">
            Choose who can see and comment on this story. Only selected users will have access.
            </p>
        </div>

        {/* Search */}
        <div>
            <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={disabled}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
            />
        </div>

        {/* Selected count */}
        {selectedUserIds.length > 0 && (
            <div className="text-sm text-purple-600">
            {selectedUserIds.length} user{selectedUserIds.length === 1 ? '' : 's'} selected
            </div>
        )}

        {/* User list */}
        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
            {filteredUsers.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
                {users.length === 0 
                ? "No other users found. Invite friends to join the platform!" 
                : "No users match your search."}
            </div>
            ) : (
            <div className="divide-y divide-gray-200">
                {filteredUsers.map((user) => {
                const isSelected = selectedUserIds.includes(user.id)
                return (
                    <div
                    key={user.id}
                    onClick={() => toggleUserSelection(user.id)}
                    className={`flex items-center p-3 cursor-pointer transition-colors ${
                        disabled 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-gray-50'
                    } ${
                        isSelected ? 'bg-purple-50 border-l-4 border-purple-500' : ''
                    }`}
                    >
                    <div className="flex-shrink-0 mr-3">
                        <img
                        src={generateAvatar(user.avatarSeed || user.id)}
                        alt={`${getUserDisplayName(user)} avatar`}
                        className="w-10 h-10 rounded-full"
                        />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                        {getUserDisplayName(user)}
                        </div>
                        {user.email && (
                        <div className="text-sm text-gray-500 truncate">
                            {user.email}
                        </div>
                        )}
                    </div>

                    <div className="flex-shrink-0">
                        <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // Handled by parent div click
                        disabled={disabled}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                    </div>
                    </div>
                )
                })}
            </div>
            )}
        </div>

        {/* Helper text */}
        <div className="text-xs text-gray-500">
            💡 Tip: Users in your trusted circle will see your real name/pseudonym (based on your persona selection) 
            and can engage with your story through comments.
        </div>
        </div>
    )
}