# Musica AI - Guitar Chord Progression & Song Suggestion Tool

<p align="center">
  <strong>An AI-powered guitar learning tool that helps musicians discover complementary chords and find songs to practice with their chosen chord progressions.</strong>
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#how-it-works"><strong>How It Works</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#running-locally"><strong>Running Locally</strong></a>
</p>
<br/>

## Features

- **🎸 Interactive Chord Selector**
  - Visual chord diagrams for all major, minor, 7th, and major 7th chords
  - Organized by root notes (A, A#, B, C, C#, D, D#, E, F, F#, G, G#)
  - Easy-to-use interface for building chord progressions

- **🤖 AI-Powered Chord Analysis**
  - Get complementary chords that work well with your selected progression
  - AI analyzes musical theory to suggest harmonically compatible chords
  - Real-time recommendations using advanced language models

- **🎵 Song Suggestion Engine**
  - Discover popular songs that feature similar chord progressions
  - Get difficulty ratings (Beginner, Intermediate, Advanced)
  - Learn which songs are perfect for practicing your chosen chords

- **🔐 Authentication System**
  - Secure user accounts with Auth.js
  - Guest access for trying features without registration
  - Persistent chord history and preferences

## How It Works

1. **Select Your Chords**: Choose from a comprehensive library of guitar chords organized by root note and chord type
2. **Get AI Recommendations**: The system analyzes your chord selection and suggests complementary chords that create harmonically pleasing progressions
3. **Discover Songs**: Automatically receive song suggestions that feature similar chord progressions, perfect for practice
4. **Practice & Learn**: Use the suggested songs to practice your chord progressions and improve your guitar skills

## Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org) with App Router and React Server Components
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/docs) with xAI Grok-2 model
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) with Tailwind CSS
- **Database**: [Neon Serverless Postgres](https://vercel.com/marketplace/neon) for user data
- **Authentication**: [Auth.js](https://authjs.dev) for secure user management
- **Chord Diagrams**: [SVGuitar](https://github.com/omnibrain/svguitar) - Beautiful SVG-based guitar chord visualization system

## Running Locally

### Prerequisites

- Node.js 18+ and pnpm
- A database (Neon Postgres recommended)
- AI model API keys (xAI, OpenAI, or other supported providers)

### Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd musica-ai
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Environment Configuration**:
   Create a `.env.local` file with the following variables:
   ```bash
   # Database
   DATABASE_URL="your-database-connection-string"
   
   # AI Provider (choose one)
   XAI_API_KEY="your-xai-api-key"
   # or
   OPENAI_API_KEY="your-openai-api-key"
   
   # Authentication
   AUTH_SECRET="your-auth-secret"
   AUTH_GITHUB_ID="your-github-oauth-id"
   AUTH_GITHUB_SECRET="your-github-oauth-secret"
   
   # Guest Access (optional)
   GUEST_PASSWORD="your-guest-password"
   ```

4. **Database Setup**:
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

5. **Start Development Server**:
   ```bash
   pnpm dev
   ```

   Your app will be running on [localhost:3000](http://localhost:3000)

### Guest Authentication

The application supports guest access for users who want to try features without creating an account:

1. **Set Guest Password**: Add to your `.env.local`:
   ```bash
   GUEST_PASSWORD=your-secure-guest-password
   ```

2. **Default Password**: If no environment variable is set, the default is `musicai-guest-2024`

## Contributing

This is an open-source project focused on helping musicians learn and practice guitar. Contributions are welcome! Areas that could use help:

- Additional chord types and voicings
- More sophisticated music theory analysis
- Enhanced song recommendation algorithms
- Mobile app development
- Additional instrument support

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the guitar community**
