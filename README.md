# Superfuel AI POC

A Next.js 15 + React 19 proof of concept application built with ShadCN UI, implementing a workflow management system for Amazon product listings.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS + ShadCN UI
- **Language**: TypeScript
- **Component System**: ShadCN UI (via MCP)
- **Icons**: Lucide React

## Features

### Screen 1: Run a Workflow
- Display workflow cards with estimated time
- Show metrics with trend indicators (up/down)
- Search functionality
- "View Details" and "Run" actions for each workflow

### Screen 2: Set Context
- Product listing grid (1002 products)
- Search product listings
- Filter products by criteria (Sales, Conversion Rates, Ad Clicks)
- Select individual products or select all
- Set Criteria modal with dropdowns
- Active filter tags with remove functionality
- Reset filters option

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

The app will redirect to `/set-context` by default. Navigate to `/run-workflow` to see the workflow selection screen.

## Project Structure

```
.
├── app/
│   ├── run-workflow/    # Screen 1: Workflow selection
│   ├── set-context/     # Screen 2: Product listing with filters
│   └── layout.tsx       # Root layout with dark mode
├── components/
│   ├── sidebar.tsx      # Navigation sidebar component
│   └── ui/              # ShadCN UI components
├── lib/
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## ShadCN UI MCP Setup

The project is configured to use ShadCN UI via MCP (Model Context Protocol) in Cursor. The configuration is in `.cursor/mcp.json`.

## Building for Production

```bash
npm run build
npm start
```

## GitHub Setup

To push this project to GitHub:

1. Create a new repository on GitHub
2. Add the remote:
```bash
git remote add origin https://github.com/your-username/your-repo-name.git
```
3. Commit and push:
```bash
git add .
git commit -m "Initial commit: Superfuel AI POC"
git branch -M main
git push -u origin main
```

