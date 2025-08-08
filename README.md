# Female Immigrant Storytelling Platform

A safe, supportive digital platform designed specifically for female immigrants to share their experiences, connect with their community, and access vital resources in the UK.

## Overview

This platform provides a secure environment where female immigrants can share their stories anonymously or with chosen identities, find community support, and access essential UK-specific resources. Built with privacy-first principles and cultural sensitivity in mind.

## Main Features

### 🏠 **Safe Storytelling Environment**
- **Anonymous Posting**: Share stories without revealing personal identity
- **Multiple Personas**: Create different identities for different types of stories
- **Content Warnings**: Clear labeling system for sensitive content
- **Privacy Controls**: Choose story visibility (private, trusted circles, community)

### 👥 **Community Engagement**
- **Public Story Gallery**: Browse inspiring stories from the community
- **Comments System**: Engage with stories using chosen personas
- **Tag-Based Discovery**: Find stories by themes (career, healthcare, education, etc.)
- **Search Functionality**: Locate relevant stories and experiences

### 🎨 **Personalization**
- **Custom Avatars**: 25+ DiceBear avatar styles with persistence
- **Theme Options**: Dark/light mode and accessibility settings
- **Font Customization**: Adjustable text sizes for better readability
- **Color Schemes**: Multiple accessible color palettes

### 📱 **User Experience**
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Media Support**: Upload and share images with stories
- **Story Management**: Edit, delete, and organize your stories
- **Dashboard**: Personal hub for managing content and settings

### 🛡️ **Safety & Support**
- **Content Reporting**: Easy reporting system for inappropriate content
- **Crisis Resources**: Direct links to UK mental health and safety services
- **Support System**: Integrated feedback and help functionality
- **GDPR Compliance**: Data rights and privacy protection

### 🔐 **Authentication & Privacy**
- **Google OAuth**: Secure login with Google accounts
- **Anonymous Options**: Post without account registration
- **Data Control**: Export and manage personal data
- **Secure Storage**: Local file-based storage for privacy

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd female-immigrant-storytelling
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Create data directories**
   ```bash
   mkdir data
   mkdir uploads
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Technology Stack

- **Frontend**: Next.js 14 with React
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Tailwind CSS with Radix UI components
- **Icons**: Lucide React
- **Avatars**: DiceBear library
- **Storage**: Local file system (development)
- **Type Safety**: TypeScript

## File Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── lib/                # Utilities and configurations
└── types/              # TypeScript type definitions
data/                   # Local data storage
uploads/                # User-uploaded media files
```


## Privacy & Data Protection

This platform is built with privacy as a fundamental principle:
- Stories can be shared anonymously
- Personal data is minimally collected
- Users control their data and privacy settings
- GDPR compliant data handling
- Local storage prioritizes user privacy

## License

Copyright © 2025 Female Immigrant Storytelling Platform. All Rights Reserved. 


## Acknowledgments

Built to serve and empower the female immigrant community in the UK, with gratitude to all the brave women who share their stories to help others.