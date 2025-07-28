
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import fs from 'fs'
import path from 'path'
import { writeFile } from "fs/promises";

const MAX_FILE_SIZE = 10 * 1024 // 10MB in bytes
const MAX_FILES_PER_USER = 50 // Maximum files per user
const ALLOWED_TYPES = [
    'image/jepg',
    'image/jpg',
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

interface UploadedFileRecord {
    id: string
    originalName: string
    fileName: string
    filePath: string
    size: number
    type: string
    uploadedBy: string
    uploadedAt: string
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const formData = await req.formData()
        const files = formData.getAll('files') as File[]

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files provided" }, { status: 400 })
        }

        // Create directories if they don't exist
        const uploadsDir = path.join(process.cwd(), 'uploads')
        const userDir = path.join(uploadsDir, session.user.id)
        const dataDir = path.join(process.cwd(), 'data')

        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true })
        }
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true })
        }
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
        }

        // Check existing user files count
        const filesDbPath = path.join(dataDir, 'uploaded-files.json')
        let existingFiles: UploadedFileRecord[] = []

        if (fs.existsSync(filesDbPath)) {
            const filesData = fs.readFileSync(filesDbPath, 'utf-8')
            try {
                existingFiles = JSON.parse(filesData)
            } catch (e) {
                existingFiles = []
            }
        }

        const userFiles = existingFiles.filter(file => file.uploadedBy === session.user.id)

        if (userFiles.length + files.length > MAX_FILES_PER_USER) {
            return NextResponse.json(
                { error: `Maximum ${MAX_FILES_PER_USER} files allowed per user. You currently have ${userFiles.length} files.`},
                { status: 400 }
            )
        }

        const uploadResults: UploadedFileRecord[] = []
        const errors: string[] = []

        for (const file of files) {
            try {
                // Validate file
                if (file.size > MAX_FILE_SIZE) {
                    errors.push(`${file.name}: File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`)
                    continue
                }

                if (!ALLOWED_TYPES.includes(file.type)) {
                    errors.push(`${file.name}: File type ${file.type} not allowed`)
                    continue
                }

                // Generate unique filename
                const timestamp = Date.now()
                const randomString = Math.random().toString(36).substring(2, 15)
                const fileExtension = path.extname(file.name)
                const uniqueFileName = `${timestamp}_${randomString}${fileExtension }`
                const filePath = path.join(userDir, uniqueFileName)

                // Convert file to buffer and save
                const bytes = await file.arrayBuffer()
                const buffer = Buffer.from(bytes)
                await writeFile(filePath, buffer)

                // Create file record
                const fileRecord: UploadedFileRecord = {
                    id: `${timestamp}_${randomString}`,
                    originalName: file.name,
                    fileName: uniqueFileName,
                    filePath: path.join('uploads', session.user.id, uniqueFileName),
                    size: file.size,
                    type: file.type,
                    uploadedBy: session.user.id,
                    uploadedAt: new Date().toISOString()
                }

                uploadResults.push(fileRecord)
            } catch (error) {
                console.error(`Error uploading file ${file.name}:`, error)
                errors.push(`${file.name}: Upload failed`)
            }
        }

        // Save file recoords to database
        if (uploadResults.length > 0) {
            const updatedFiles = [...existingFiles, ...uploadResults]
            fs.writeFileSync(filesDbPath, JSON.stringify(updatedFiles, null, 2))
        }

        const response = {
            success: true,
            uploadedFiles: uploadResults.map(file => ({
                id: file.id,
                name: file.originalName,
                size: file.size,
                type: file.type,
                url: `/api/files/${file.id}`
            })),
            errors: errors.length > 0 ? errors : undefined
        }

        return NextResponse.json(response)

    } catch (error) {
        console.error("Error in file upload:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const dataDir = path.join(process.cwd(), 'data')
        const filesDbPath = path.join(dataDir, 'uploaded-files.json')

        if (!fs.existsSync(filesDbPath)) {
            return NextResponse.json([])
        }

        const filesData = fs.readFileSync(filesDbPath, 'utf-8')
        let allFiles: UploadedFileRecord[] = []

        try {
            allFiles = JSON.parse(filesData)
        } catch (e) {
            allFiles = []
        }

        // Return only user's files
        const userFiles = allFiles
            .filter(file => file.uploadedBy === session.user.id)
            .map(file => ({
                id: file.id,
                name: file.originalName,
                size: file.size,
                type: file.type,
                uploadedAt: file.uploadedAt,
                url: `/api/files/${file.id}`
            }))

            return NextResponse.json(userFiles)
    } catch (error) {
        console.error("Error fetching user files:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}