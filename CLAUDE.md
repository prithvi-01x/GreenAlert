# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GreenAlert is an AI-powered urban hazard detection platform with a React + TypeScript + Vite frontend. The application allows citizens to report hazards, administrators to manage reports and dispatch, and employees to view assignments.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, custom CSS variables
- **Routing**: React Router v7
- **State**: React Context (AuthContext)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Maps**: Leaflet + React-Leaflet
- **HTTP**: Axios
- **Notifications**: React Hot Toast

## Commands

All commands are run from the `frontend` directory:

```bash
# Development
pnpm install              # Install dependencies
pnpm dev                  # Start dev server (Vite)
pnpm build                # Build for production
pnpm preview              # Preview production build
pnpm lint                 # Run ESLint
```

## Architecture

### Directory Structure
```
greenalert/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # Base UI primitives (Button, Input, Badge, etc.)
│   │   │   └── layout/     # Layout components (Navbars, Sidebar, Footer)
│   │   ├── context/        # React Context providers (AuthContext)
│   │   ├── data/           # Mock data
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components organized by user role
│   │   │   ├── public/     # Public pages (Landing, Login)
│   │   │   ├── citizen/    # Citizen-facing pages
│   │   │   ├── admin/      # Admin dashboard pages
│   │   │   └── employee/   # Employee-facing pages
│   │   ├── styles/         # Global styles
│   │   ├── App.tsx         # Main app with routing
│   │   └── main.tsx        # Entry point
│   └── package.json
└── package.json            # Root package (Tailwind, PostCSS)
```

### Routing Structure

The app uses React Router with role-based protected routes:

- **Public**: `/`, `/login` (no auth required)
- **Citizen**: `/citizen/*` (requires citizen role)
- **Admin**: `/admin/*` (requires admin role)
- **Employee**: `/employee/*` (requires employee role)

See `App.tsx` for the complete route mapping and layout wrappers.

### Authentication

Currently uses mock authentication via `AuthContext`. The context provides:
- `user`, `role`, `isAuthenticated`
- `login(role)`, `logout()`, `switchRole(role)`

Protected routes check authentication and redirect to `/login` if unauthorized.

### Styling System

- Tailwind CSS v4 with CSS variables for theming
- Custom utility: `cn()` (clsx + tailwind-merge) in `lib/utils.ts` pattern
- Glass morphism effects in `GlassCard` component
- Dark mode default theme

## Development Notes

- TypeScript strict mode enabled
- ESLint with React Hooks and refresh plugins
- Vite for fast HMR and builds
- React 19 with modern hooks pattern
