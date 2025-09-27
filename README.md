# WasteTrack Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Home Page**: Landing page with information about the WasteTrack system
- **Map View**: Interactive map showing containers and routes
- **Container Management**: Monitor fill levels and status of waste containers
- **Route Optimization**: Plan and track collection routes

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Google Maps API
- Shadcn UI Components

## Project Structure

- `app/`: Next.js App Router pages and layouts
- `components/`: Reusable React components
- `fakedata/`: Mock data for development
- `lib/`: Utility functions and shared code
- `public/`: Static assets

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyBcM0ANZjKW_BPDg-I7MaLRvqb2ITd938k
\`\`\`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
