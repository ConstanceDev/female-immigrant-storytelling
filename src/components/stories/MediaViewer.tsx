"use client"

import { useState } from "react"
import { X, Download, FileText, Music, Video, Image as ImageIcon } from "lucide-react"

interface MediaFile {
    id: string
    name: string
    size: number
    type: string
    url: string
}

interface MediaViewerProps {
    mediaFiles: string[] // Array of file IDs
    showDownload?: boolean
    className?: string
}

interface FileInfo {
    id: string
    name: string
    size: number
    type: string
    uploadedAt: string
    url: string
}

export default function MediaViewer({
    mediaFiles,
    showDownload = true,
    className = ""
}: MediaViewerProps) {
    const [loadedFiles, setLoadedFiles] = useState<FileInfo[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedMedia, setSelectedMedia] = useState<FileInfo | null>(null)

    // Load file information when component mounts or mediaFiles change
    useState(() => {
        if (mediaFiles && mediaFiles.length > 0) {
            loadFileInfo()
        }
    })

    const loadFileInfo = async () => {
        if (loading || loadedFiles.length > 0) return

        setLoading(true)
        try {
            // In a real app, might batch this into a single API call 
            const filePromises = mediaFiles.map(async (fileId) => {
                const response = await fetch(`/api/files/${fileId}`)
                if (response.ok) {
                    return {
                        id: fileId,
                        name: fileId, // Fallback
                        size: 0,
                        type: response.headers.get('content-type') || 'application/octet-stream',
                        uploadedAt: '',
                        url: `/api/files/${fileId}`
                    }
                }
                return null
            })

            const results = await Promise.all(filePromises)
            const validFiles = results.filter(file => file !== null) as FileInfo[]
            setLoadedFiles(validFiles)
        } catch (error) {
            console.error('Error loading file info:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) return <ImageIcon className="w-4 h-4" />
        if (type.startsWith('video/')) return <Video className="w-4 h-4" /> 
        if (type.startsWith('audio/')) return <Music className="w-4 h-4" />
        return <FileText className="w-4 h-4" />
    }

    const renderMedia = (file: FileInfo) => {
        if (file.type.startsWith('image/')) {
            return (
                <div className="relative group cursor-pointer" onClick={() => setSelectedMedia(file)}>
                    <img 
                        src={file.url}
                        alt={file.name}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                            e.currentTarget.src = '/placeholder-image.png'
                        }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"/>
                    </div>
                </div>
            )
        }

        if (file.type.startsWith('video/')) {
            return (
                <video
                    controls
                    className="w-full max-h-64 rounded-lg"
                    preload="metadata"
                >
                    <source src={file.url} type={file.type}/>
                    Your browser does not support the video tag.
                </video>
            )
        }

        if (file.type.startsWith('audio/')) {
            return (
                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                        <Music className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="text-sm font-medium text-gray-800">{file.name}</span>
                    </div>
                    <audio controls className="w-full">
                        Your browser does not support the audio tag.
                    </audio>
                </div>
            )
        }

        // For other file types (PDF, text, etc.)
        return (
            <div className="bg-gray-100 p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {getFileIcon(file.type)}
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-800">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.type}</p>
                        </div>
                    </div>
                    {showDownload && (
                        <a
                            href={file.url}
                            download={file.name}
                            className="text-purple-600 hover:text-purple-800 transition-colors"
                        >
                            <Download className="w-5 h-5" />
                        </a>
                    )}
                </div>
            </div>
        )
    }

    if (!mediaFiles || mediaFiles.length === 0) {
        return null
    }

    if (loading) {
        return (
            <div className={`space-y-4 ${className}`}>
                <div className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        )
    }

    return (
        <>
        <div className={`space-y-4 ${className}`}>
            {loadedFiles.map((file) => (
                <div key={file.id}>
                    {renderMedia(file)}
                </div>
            ))}
        </div>

        {/* Full-screen image modal */}
        {selectedMedia && selectedMedia.type.startsWith('image/') && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="relative max-w-4xl max-h-full">
                    <button
                        onClick={() => setSelectedMedia(null)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <img
                        src={selectedMedia.url}
                        alt={selectedMedia.name}
                        className="max-w-full max-h-full object-contain"
                    />
                    {showDownload && (
                        <a
                            href={selectedMedia.url}
                            download={selectedMedia.name}
                            className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                        >
                            <Download className="w-5 h-5" />
                        </a>
                    )}
                </div>
            </div>
        )}
        </>
    )
}