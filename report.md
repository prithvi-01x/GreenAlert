# GreenAlert — Codebase Analysis Report

**Generated:** March 30, 2026
**Project:** Urban Hazard Detection & Reporting Platform

---

## Executive Summary

GreenAlert is a **React 19 + Vite 8** single-page application for reporting and managing urban environmental hazards. The platform connects citizens, field employees, and administrators in a workflow that tracks hazards from report to resolution. The codebase features a polished dark neon-themed UI, role-based access control, and a well-organized component architecture.

---

## 1. Project Overview

| Attribute | Value |
|-----------|-------|
| **Project Type** | React SPA with Vite |
| **Framework** | React 19.2.4 |
| **Build Tool** | Vite 8.0.1 |
| **Language** | TypeScript 5.9 |
| **Package Manager** | pnpm |
| **Router** | React Router DOM 7.13.2 |
| **Deployment** | Vercel (configured) |

---

## 2. Repository Structure

```
greenalert/
├── frontend/              # Main React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── layout/    # Layout wrappers (Navbars, Sidebar, Footer)
│   │   │   └── ui/        # Primitive UI components
│   │   ├── context/       # React Context providers
│   │   ├── data/          # TypeScript types + mock data
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components by user role
│   │   │   ├── admin/     # Admin dashboard pages
│   │   │   ├── citizen/   # Citizen user pages
│   │   │   ├── employee/  # Field employee pages
│   │   │   └── public/    # Public-facing pages
│   │   ├── styles/        # Global design system CSS
│   │   ├── assets/        # Static assets
│   │   ├── App.tsx        # Main app with routing
│   │   ├── main.tsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── public/            # Static assets
│   ├── dist/              # Build output
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.ts     # Vite configuration
│   └── tsconfig.json      # TypeScript configuration
├── node_modules/          # Root dependencies
├── package.json           # Root dependencies (Tailwind, Firebase, etc.)
├── pnpm-lock.yaml         # Lockfile
├── .gitignore             # Git ignore rules
└── GreenAlert_Plan_v2.docx  # Project documentation
```

---

## 3. Dependencies

### Frontend (`frontend/package.json`)

**Production:**
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.4 | UI framework |
| react-dom | ^19.2.4 | React DOM renderer |
| react-router-dom | ^7.13.2 | Client-side routing |
| recharts | ^3.8.1 | Data visualization |
| lucide-react | ^1.7.0 | Icon library |

**Development:**
| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^8.0.1 | Build tool / dev server |
| @vitejs/plugin-react | ^6.0.1 | React support for Vite |
| typescript | ~5.9.3 | Type safety |
| eslint | ^9.39.4 | Linting |
| typescript-eslint | ^8.57.0 | TypeScript ESLint |

### Root (`package.json`)

| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | ^4.2.2 | Utility CSS framework |
| autoprefixer | ^10.4.27 | CSS autoprefixing |
| postcss | ^8.5.8 | CSS transformation tool |
| axios | ^1.14.0 | HTTP client |
| firebase | ^12.11.0 | Backend services (planned) |
| leaflet | ^1.9.4 | Map library |
| react-leaflet | ^5.0.0 | React bindings for Leaflet |
| react-hot-toast | ^2.6.0 | Toast notifications |
| clsx | ^2.1.1 | Conditional class names |
| tailwind-merge | ^3.5.0 | Tailwind class merging |

---

## 4. User Roles & Access Control

The application implements **Role-Based Access Control (RBAC)** with three distinct user types:

| Role | Description | Access |
|------|-------------|--------|
| `citizen` | Regular users who report hazards | Citizen dashboard, report submission, view own reports |
| `admin` | System administrators | Full admin dashboard, analytics, dispatch, employee tracking |
| `employee` | Field workers who verify/resolve reports | Assignment view, verification submission |

### AuthContext API

```typescript
interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}
```

> **Note:** Currently uses mock data for authentication. Firebase is installed but not integrated.

---

## 5. Route Structure

### Public Routes
| Path | Component | Layout |
|------|-----------|--------|
| `/` | LandingPage | PublicLayout |
| `/about` | LandingPage | PublicLayout |
| `/map` | LandingPage | PublicLayout |
| `/reports` | LandingPage | PublicLayout |
| `/login` | LoginPage | None |

### Citizen Routes (Protected)
| Path | Component | Layout |
|------|-----------|--------|
| `/citizen/dashboard` | Dashboard | CitizenLayout |
| `/citizen/report` | ReportHazard | CitizenLayout |
| `/citizen/my-reports` | MyReports | CitizenLayout |
| `/citizen/hazard/:id` | HazardDetail | CitizenLayout |
| `/citizen/profile` | Profile | CitizenLayout |

### Admin Routes (Protected)
| Path | Component | Layout |
|------|-----------|--------|
| `/admin/dashboard` | AdminDashboard | AdminLayout |
| `/admin/reports-queue` | ReportsQueue | AdminLayout |
| `/admin/analytics` | AnalyticsDashboard | AdminLayout |
| `/admin/hotspot-map` | HotspotMap | AdminLayout |
| `/admin/dispatch` | DispatchDashboard | AdminLayout |
| `/admin/employee-tracker` | EmployeeTracker | AdminLayout |

### Employee Routes (Protected)
| Path | Component | Layout |
|------|-----------|--------|
| `/employee/assignments` | MyAssignments | AdminLayout |
| `/employee/verify` | VerificationSubmission | AdminLayout |

---

## 6. Component Library

### Layout Components (`src/components/layout/`)
| Component | Purpose |
|-----------|---------|
| `PublicNavbar` | Navigation for public pages |
| `CitizenNavbar` | Navigation for citizen pages |
| `AdminSidebar` | Sidebar navigation for admin panel |
| `MobileBottomNav` | Mobile bottom navigation (citizen) |
| `Footer` | Site footer |

### UI Components (`src/components/ui/`)
| Component | Purpose |
|-----------|---------|
| `Button` | Styled button component |
| `Input` | Form input component |
| `Badge` | Status/category badge |
| `GlassCard` | Glassmorphism card container |
| `StatCard` | Statistics display card |
| `DataText` | Monospace data text display |

Each UI component has paired `.tsx` and `.css` files for styling.

---

## 7. Design System

**Theme Name:** "The Neon Sentinel"

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--surface-lowest` | #090E1C | Darkest background |
| `--surface` | #0E1322 | Main background |
| `--primary` | #6EFFC0 | Primary accent (neon green) |
| `--primary-container` | #00E5A0 | Primary container |
| `--secondary` | #ADC6FF | Secondary accent (blue) |
| `--tertiary` | #FFE1C1 | Tertiary accent (peach) |
| `--error` | #FFB4AB | Error states |
| `--on-surface` | #DEE1F7 | Text color |

### Typography

| Token | Value |
|-------|-------|
| `--font-display` | Inter, system-ui |
| `--font-body` | Inter, system-ui |
| `--font-data` | JetBrains Mono, Fira Code |

### Effects

- **Glassmorphism:** `--glass-bg: rgba(255, 255, 255, 0.05)` with 20px blur
- **Shadows:** Ambient shadows with neon glow effects
- **Animations:** pulse-glow, float, fade-in, shimmer, radar-ping, scale-in

### Responsive Breakpoints

- Mobile: max-width 640px
- Tablet: max-width 1024px
- Desktop: min-width 1025px

---

## 8. Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  greenScore: number;
  reportsSubmitted: number;
  reportsVerified: number;
  joinDate: string;
  badge: string;
  city: string;
}
```

### HazardReport
```typescript
interface HazardReport {
  id: string;
  title: string;
  category: string;
  severity: 'critical' | 'warning' | 'low' | 'resolved';
  status: 'pending' | 'verified' | 'dispatched' | 'resolved' | 'dismissed';
  description: string;
  location: { lat: number; lng: number; address: string };
  reportedBy: string;
  reportedAt: string;
  aiConfidence: number;  // AI analysis confidence %
  imageUrl?: string;
  assignedTo?: string;
  updatedAt: string;
}
```

### EmployeeData
```typescript
interface EmployeeData {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'en-route' | 'off-duty';
  location: { lat: number; lng: number };
  assignedReports: number;
  completedToday: number;
  lastUpdate: string;
}
```

---

## 9. Hazard Categories

The system tracks 10 hazard types:

1. Water Contamination
2. Air Quality
3. Illegal Dumping
4. Noise Pollution
5. Soil Contamination
6. Chemical Spill
7. Gas Leak
8. Radiation
9. Biological Hazard
10. Other

---

## 10. Key Features

### Citizen Features
- **Hazard Reporting:** Submit reports with category, severity, location, and description
- **My Reports:** Track status of submitted reports
- **Green Score:** Gamification system rewarding citizen participation
- **Leaderboard:** Top contributors display

### Admin Features
- **Dashboard:** Overview of all metrics and KPIs
- **Reports Queue:** Manage pending/verified/dispatched reports
- **Analytics:** Monthly trends visualization with Recharts
- **Hotspot Map:** Geographic visualization of hazards (Leaflet)
- **Dispatch:** Assign reports to field employees
- **Employee Tracker:** Real-time field employee location tracking

### Employee Features
- **My Assignments:** View assigned hazard reports
- **Verification Submission:** Submit verification/resolution updates

---

## 11. Technical Highlights

### Strengths
- Clean separation of concerns (layout/page/component layers)
- Comprehensive TypeScript types for all data models
- Well-documented design system with CSS variables
- Responsive design with mobile-first approach
- Consistent component patterns (paired .tsx/.css files)

### Current Limitations
- **Mock Data Only:** All data is currently mocked; no backend integration
- **Firebase Not Integrated:** Firebase is installed but not configured
- **No API Layer:** No HTTP client setup despite axios dependency
- **Hardcoded Routes:** Public pages all render LandingPage

### Planned Integrations (from dependencies)
- Firebase (authentication, database)
- Leaflet maps (hazard visualization)
- Axios (API communication)
- React Hot Toast (notifications)

---

## 12. File Inventory

### Pages (14 total)
```
src/pages/
├── public/
│   ├── LandingPage.tsx
│   └── LoginPage.tsx
├── citizen/
│   ├── Dashboard.tsx
│   ├── ReportHazard.tsx
│   ├── MyReports.tsx
│   ├── HazardDetail.tsx
│   └── Profile.tsx
├── admin/
│   ├── AdminDashboard.tsx
│   ├── ReportsQueue.tsx
│   ├── AnalyticsDashboard.tsx
│   ├── HotspotMap.tsx
│   ├── DispatchDashboard.tsx
│   └── EmployeeTracker.tsx
├── employee/
│   ├── MyAssignments.tsx
│   └── VerificationSubmission.tsx
└── NotFound.tsx
```

### Components (12 total)
```
src/components/
├── layout/ (6)
│   ├── PublicNavbar.tsx
│   ├── CitizenNavbar.tsx
│   ├── AdminSidebar.tsx
│   ├── MobileBottomNav.tsx
│   ├── Footer.tsx
└── ui/ (6)
    ├── Button.tsx
    ├── Input.tsx
    ├── Badge.tsx
    ├── GlassCard.tsx
    ├── StatCard.tsx
    └── DataText.tsx
```

---

## 13. Recommendations

### Immediate Priorities

1. **Backend Integration**
   - Connect Firebase authentication
   - Replace mock data with real API calls
   - Set up Firestore collections for reports/users

2. **API Layer**
   - Create service modules using axios
   - Implement proper error handling
   - Add loading states to all data-fetching components

3. **Form Validation**
   - Add validation to ReportHazard form
   - Implement proper form submission handling

### Medium-Term

4. **Image Uploads**
   - Implement image capture/upload for hazard reports
   - Integrate with Firebase Storage or Vercel Blob

5. **Real-time Updates**
   - Use Firestore listeners for live report updates
   - Add toast notifications for status changes

6. **Map Enhancements**
   - Complete HotspotMap implementation
   - Add clustering for dense report areas

### Long-Term

7. **AI Integration**
   - Implement actual AI analysis for hazard classification
   - Use AI confidence scores for prioritization

8. **Performance**
   - Add code splitting for route-based lazy loading
   - Optimize bundle size

---

## 14. Conclusion

GreenAlert is a well-structured React application with a solid foundation. The codebase demonstrates good practices in component organization, TypeScript usage, and design system implementation. The primary gap is the lack of backend integration—all current functionality relies on mock data. The installed dependencies (Firebase, axios, react-leaflet, react-hot-toast) indicate planned features that need to be implemented.

The application's architecture is clean and maintainable, making it well-positioned for the addition of real data layers and production features.

---

**Report generated by Claude Code**
