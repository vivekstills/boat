<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1px2gWsWSyw3UbUvbKWJriGxHGqlHS2G9

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update `VITE_JUICE_API_KEY` with your juice.gg API key (default is already set)
3. Run the app:
   `npm run dev`

## Environment Variables

- `VITE_JUICE_API_KEY`: API key for juice.gg integration (required for leaderboard data)
