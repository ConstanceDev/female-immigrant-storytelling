
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import fs from 'fs'
import path from 'path'

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

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params
        const fileId = resolvedParams.id

        // Load file database
        const dataDir = path.join(process.cwd(), 'data')
        const filesDbPath = path.join(dataDir, 'uploaded-files.json')

        if (!fs.existsSync(filesDbPath)) {
            return NextResponse.json({ error: "File not found" }, { status: 404 })
        }

        const filesData = fs.readFileSync(filesDbPath, 'utf-8')
        let allFiles: UploadedFileRecord[] = []

        try {
            allFiles = JSON.parse(filesData)
        } catch (e) {
            return NextResponse.json({ error: "Database error" }, { status: 500 })
        }

        // Find the file
        const fileRecord = allFiles.find(file => file.id === fileId)

        if (!fileRecord) {
            return NextResponse.json({ error: "File not found" }, { status: 404 })
        }

        // Check file exists on disk - try absolute path first
        const absolutePath = `/Users/constancelu/Downloads/Coding/Projects/female-immigrant-storytelling/${fileRecord.filePath}`
        const relativePath = path.join(process.cwd(), fileRecord.filePath)
        
        let fullFilePath = absolutePath
        let fileExists = fs.existsSync(absolutePath)
        
        if (!fileExists) {
            fullFilePath = relativePath
            fileExists = fs.existsSync(relativePath)
        }

        if (!fileExists) {
            return NextResponse.json({ error: "File not found on disk" }, { status: 404 })
        }

        // Read file
        const fileBuffer = fs.readFileSync(fullFilePath)

        // Set appropriate headers
        const headers = new Headers()
        headers.set('Content-Type', fileRecord.type)
        headers.set('Content-Length', fileRecord.size.toString())
        headers.set('Content-Disposition', `inline; filename="${fileRecord.originalName}"`)

        // Add cache headers for better performance
        headers.set('Cache-Control', 'public, max-age=31536000') // 1 year
        headers.set('ETag', `"${fileRecord.id}"`)

        return new NextResponse(fileBuffer, {
            status: 200,
            headers
        })

    } catch(error) {
        console.error("Error serving file:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const resolvedParams = await params
        const fileId = resolvedParams.id

        // Load file database
        const dataDir = path.join(process.cwd(), 'data')
        const filesDbPath = path.join(dataDir, 'uploaded-files.json')

        if (!fs.existsSync(filesDbPath)) {
            return NextResponse.json({ error: "File not found" }, { status: 404 })
        }

        const filesData = fs.readFileSync(filesDbPath, 'utf-8')
        let allFiles: UploadedFileRecord[] = []

        try {
            allFiles = JSON.parse(filesData)
        } catch (e) {
            return NextResponse.json({ error: "Database error" }, { status: 500 })
        }

        // Find the file
        const fileIndex = allFiles.findIndex(file => file.id === fileId)

        if (fileIndex === -1) {
            return NextResponse.json({ error: "File not found" }, { status: 404 })
        }

        const fileRecord = allFiles[fileIndex]

        // Check ownership
        if (fileRecord.uploadedBy !== session.user.id) {
            return NextResponse.json({ error: "Forbidden - You can only delete your own files" }, { status: 403 })
        }

        // Delete file from disk
        const fullFilePath = path.join(process.cwd(), fileRecord.filePath)

        if (fs.existsSync(fullFilePath)) {
            fs.unlinkSync(fullFilePath)
        }

        // Remove from database
        allFiles.splice(fileIndex, 1)
        fs.writeFileSync(filesDbPath, JSON.stringify(allFiles, null, 2))

        return NextResponse.json({ message: "File deleted successfully" })

    } catch (error) {
        console.error("Error deleting file:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}