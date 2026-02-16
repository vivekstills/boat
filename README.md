# BetStrike Leaderboard

A modern, real-time leaderboard application for tracking gaming competitions and prizes.

## Features

- 🏆 **Dual Leaderboards**: BetStrike monthly race and Juice.gg weekly race
- 🔄 **Live Updates**: Automatic refresh of Juice.gg leaderboard data every 30 seconds
- 🎨 **Beautiful UI**: Modern design with smooth animations and responsive layout
- ⚡ **Fast & Reliable**: Built with React, TypeScript, and Vite
- 🔒 **Secure**: API credentials managed via environment variables

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vivekstills/boat.git
cd boat
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
```bash
cp .env.example .env
```

Edit `.env` and configure your API credentials if needed.

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Environment Variables

The application supports the following environment variables:

- `VITE_JUICE_API_URL` - Juice.gg API base URL (default: `https://api.juice.gg`)
- `VITE_JUICE_API_KEY` - Your Juice.gg API key
- `VITE_JUICE_CODE` - Leaderboard code (default: `GANG`)

See `.env.example` for a complete reference.

## API Integration

The application integrates with the Juice.gg API to fetch real-time leaderboard data:

- **Endpoint**: Automatically tries multiple endpoint variations
- **Authentication**: Supports multiple authentication methods
- **Refresh Rate**: Updates every 30 seconds
- **Fallback**: Gracefully falls back to static data if API is unavailable

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## License

All rights reserved © 2026 leaderboat.xyz

## Responsible Gaming

Please gamble responsibly. If you need help, visit [BeGambleAware.org](https://www.begambleaware.org/)
