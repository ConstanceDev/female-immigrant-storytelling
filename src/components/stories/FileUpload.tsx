"use client"

import { useState, useRef } from "react"
import { X, Upload, File, Image, Video, Music } from "lucide-react"
import { maxHeaderSize } from "http"

interface UploadedFile {
    id: string
    name: string
    size: number
    type: string
    url?: string
    file: File
}

interface FileUploadedProps {
    files: UploadedFile[]
    onFilesChange: (files: UploadedFile[]) => void
    maxFileSize?: number //in MB
    maxFiles?: number
    acceptedTypes?: string[]
    disabled?: boolean
}

const DEFAULT_MAX_FILE_SIZE = 10 // 10MB
const DEFAULT_MAX_FILES = 5
const DEFAULT_ACCEPTED_TYPES = [
    'image/jpg',
    'image/jepg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'application/pdf',
    'text/plain'
]

export default function FileUpload ({
    files,
    onFilesChange,
    maxFileSize = DEFAULT_MAX_FILE_SIZE,
    maxFiles = DEFAULT_MAX_FILES,
    acceptedTypes = DEFAULT_ACCEPTED_TYPES,
    disabled = false
}: FileUploadedProps) {
    const [dragOver, setDragOver] = useState(false)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) return <Image className="w-4 h-4" />
        if (type.startsWith('video/')) return <Video className="w-4 h-4" /> 
        if (type.startsWith('audio/')) return <Music className="w-4 h-4" />
        return <File className="w-4 h-4" />
    }

    const validateFile = (file: File): string | null => {
        // Check file size
        const fileSizeMB = file.size / (1024 * 1024)
        if (fileSizeMB > maxHeaderSize) {
            return `File size must be less than ${maxFileSize}MB. Current file is ${fileSizeMB.toFixed(2)}MB.`
        }

        // Check file type - also check file extension as fallback
        const fileExtension = file.name.toLowerCase().split('.').pop()
        const isValidType = acceptedTypes.includes(file.type)
        const isValidExtension = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'webm', 'mp3', 'wav', 'ogg', 'pdf', 'txt'].includes(fileExtension || '')

        if (!isValidType && !isValidExtension) {
            console.log('File validation failed:', {
                fileName: file.name,
                fileType: file.type,
                fileExtension,
                acceptedTypes
            })
            return `File type ${file.type} is not supported. Supported types: image/jepg, image/png, image/gif, image/webp, video/mp4, video/webm, video/quicktime, audio/mpeg,
            audio/wav, audio/ogg, application/pdf, text/plain`
        }

        // Check total file count
        if (files.length >= maxFiles) {
            return `Maximum ${maxFiles} files allowed. Please remove some files first.`
        }

        return null
    }

    const handleFiles = async (newFiles: FileList | File[]) => {
        if (disabled) return

        setUploading(true)
        const validFiles: UploadedFile[] = []
        const errors: string[] = []

        const fileArray = Array.from(newFiles)

        for (const file of fileArray) {
            const error = validateFile(file)
            if (error) {
                errors.push(`${file.name}: ${error}`)
                continue
            }

            // Check for duplicates
            const isDuplicate = files.some(existingFile =>
                existingFile.name === file.name && existingFile.size === file.size
             )

             if (isDuplicate) {
                errors.push(`${file.name}: File already added`)
                continue
             }

             const uploadedFile: UploadedFile = {
                id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
                name: file.name,
                size: file.size,
                type: file.type,
                file: file
             }

             // Create preview URL for images
             if (file.type.startsWith('image/')) {
                uploadedFile.url = URL.createObjectURL(file)
             }

             validFiles.push(uploadedFile)
        }

        if (errors.length > 0) {
            alert('Some files could not be uploaded:\n' + errors.join('\n'))
        }

        if (validFiles.length > 0) {
            onFilesChange([...files, ...validFiles])
        }

        setUploading(false)
    }

    const removeFile = (fileId: string) => {
        const updatedFiles = files.filter(file => {
            if (file.id === fileId) {
                // Clean up object URL to prevent memory leaks
                if (file.url) {
                    URL.revokeObjectURL(file.url)
                }
                return false
            }
            return true
        })
        onFilesChange(updatedFiles)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        if (!disabled) {
            setDragOver(true)
        }
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)

        if (disabled) return
        
        const droppedFiles = e.dataTransfer.files
        if (droppedFiles.length > 0) {
            handleFiles(droppedFiles)
        }
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files
        if (selectedFiles && selectedFiles.length > 0) {
            handleFiles(selectedFiles)
        }
        // Reset input value to allow selecting the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleUploadClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click()
        }
    }
    
    return (
    <div className="space-y-4">
        {/* Upload Area */}
        <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver
            ? 'border-purple-500 bg-purple-50'
            : disabled
            ? 'border-gray-200 bg-gray-50'
            : 'border-gray-300 hover:border-purple-400'
        } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
        >
        <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
            disabled={disabled}
        />

        <Upload className={`w-12 h-12 mx-auto mb-4 ${disabled ? 'text-gray-300' : 'text-gray-400'}`} />

        <div className={disabled ? 'text-gray-400' : 'text-gray-600'}>
            <p className="text-lg font-medium mb-2">
            {uploading ? 'Processing files...' : 'Drop files here or click to browse'}
            </p>
            <p className="text-sm">
            Supports images, videos, audio, PDFs and text files
            </p>
            <p className="text-xs mt-2">
            Max {maxFileSize}MB per file • Max {maxFiles} files • {files.length}/{maxFiles} files uploaded
            </p>
        </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
        <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Uploaded Files</h4>

            <div className="space-y-2 max-h-64 overflow-y-auto">
            {files.map((file) => (
                <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 text-gray-500">
                    {getFileIcon(file.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)} • {file.type}
                    </p>
                    </div>

                    {/* Image Preview */}
                    {file.url && file.type.startsWith('image/') && (
                    <img
                        src={file.url}
                        alt={file.name}
                        className="w-10 h-10 object-cover rounded"
                    />
                    )}
                </div>

                <button
                    onClick={(e) => {
                    e.stopPropagation()
                    removeFile(file.id)
                    }}
                    className="ml-3 p-1 text-gray-400 hover:text-red-500 transition-colors"
                    disabled={disabled}
                >
                    <X className="w-4 h-4" />
                </button>
                </div>
            ))}
            </div>
        </div>
        )}

        {/* File Type Info */}
        <div className="text-xs text-gray-500">
        <p>Supported file types:</p>
        <p>• Images: JPEG, PNG, GIF, WebP</p>
        <p>• Videos: MP4, WebM, QuickTime</p>
        <p>• Audio: MP3, WAV, OGG</p>
        <p>• Documents: PDF, Plain Text</p>
        </div>
    </div>
    )
}