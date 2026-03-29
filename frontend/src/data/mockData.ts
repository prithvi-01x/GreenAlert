export type UserRole = 'citizen' | 'admin' | 'employee';

export interface User {
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

export interface HazardReport {
  id: string;
  title: string;
  category: string;
  severity: 'critical' | 'warning' | 'low' | 'resolved';
  status: 'pending' | 'verified' | 'dispatched' | 'resolved' | 'dismissed';
  description: string;
  location: { lat: number; lng: number; address: string };
  reportedBy: string;
  reportedAt: string;
  aiConfidence: number;
  imageUrl?: string;
  assignedTo?: string;
  updatedAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  badge: string;
  score: number;
  avatar?: string;
}

export interface AnalyticsData {
  month: string;
  reports: number;
  verified: number;
  resolved: number;
}

export interface EmployeeData {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'en-route' | 'off-duty';
  location: { lat: number; lng: number };
  assignedReports: number;
  completedToday: number;
  lastUpdate: string;
}

/* ── Mock Users ── */
export const mockUsers: Record<UserRole, User> = {
  citizen: {
    id: 'u-001',
    name: 'Alex Mercer',
    email: 'alex.mercer@email.com',
    role: 'citizen',
    greenScore: 847,
    reportsSubmitted: 23,
    reportsVerified: 18,
    joinDate: '2024-03-15',
    badge: 'Green Guardian',
    city: 'San Francisco, CA',
  },
  admin: {
    id: 'u-002',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@greenalert.gov',
    role: 'admin',
    greenScore: 0,
    reportsSubmitted: 0,
    reportsVerified: 412,
    joinDate: '2023-11-01',
    badge: 'System Admin',
    city: 'San Francisco, CA',
  },
  employee: {
    id: 'u-003',
    name: 'Marcus Rivera',
    email: 'marcus.r@greenalert.gov',
    role: 'employee',
    greenScore: 0,
    reportsSubmitted: 0,
    reportsVerified: 156,
    joinDate: '2024-01-10',
    badge: 'Field Inspector',
    city: 'San Francisco, CA',
  },
};

/* ── Mock Reports ── */
export const mockReports: HazardReport[] = [
  {
    id: 'RPT-2024-001',
    title: 'Chemical Runoff in Mission Creek',
    category: 'Water Contamination',
    severity: 'critical',
    status: 'dispatched',
    description: 'Unusual discoloration and strong chemical odor detected near Mission Creek drainage outlet. Water appears to have an oily sheen with greenish tint.',
    location: { lat: 37.7649, lng: -122.3894, address: '200 Channel St, San Francisco, CA 94158' },
    reportedBy: 'Alex Mercer',
    reportedAt: '2024-12-15T09:23:00Z',
    aiConfidence: 94.2,
    assignedTo: 'Marcus Rivera',
    updatedAt: '2024-12-15T10:45:00Z',
  },
  {
    id: 'RPT-2024-002',
    title: 'Illegal Dumping at Bayview Park',
    category: 'Illegal Dumping',
    severity: 'warning',
    status: 'verified',
    description: 'Large pile of construction debris and potentially hazardous materials dumped near the park entrance. Approximately 2 cubic meters of waste.',
    location: { lat: 37.7344, lng: -122.3852, address: '701 3rd St, San Francisco, CA 94107' },
    reportedBy: 'Sarah Lin',
    reportedAt: '2024-12-14T14:10:00Z',
    aiConfidence: 87.6,
    updatedAt: '2024-12-14T16:30:00Z',
  },
  {
    id: 'RPT-2024-003',
    title: 'Air Quality Alert — Industrial Zone',
    category: 'Air Quality',
    severity: 'critical',
    status: 'pending',
    description: 'Strong industrial emissions detected from the southeast sector. Visible smoke plume and sulfurous odor reported by multiple citizens.',
    location: { lat: 37.7489, lng: -122.3881, address: '888 Brannan St, San Francisco, CA 94103' },
    reportedBy: 'Jordan Park',
    reportedAt: '2024-12-15T11:05:00Z',
    aiConfidence: 91.3,
    updatedAt: '2024-12-15T11:05:00Z',
  },
  {
    id: 'RPT-2024-004',
    title: 'Noise Pollution — Construction Site',
    category: 'Noise Pollution',
    severity: 'low',
    status: 'resolved',
    description: 'Excessive nighttime construction noise exceeding 85dB measured from residential area. Operating outside permitted hours.',
    location: { lat: 37.7749, lng: -122.4194, address: '350 Market St, San Francisco, CA 94102' },
    reportedBy: 'Elena Garcia',
    reportedAt: '2024-12-13T22:30:00Z',
    aiConfidence: 72.8,
    updatedAt: '2024-12-14T08:00:00Z',
  },
  {
    id: 'RPT-2024-005',
    title: 'Soil Contamination Near School',
    category: 'Soil Contamination',
    severity: 'critical',
    status: 'verified',
    description: 'Dark discoloration and unusual plant die-off observed in soil adjacent to elementary school playground. Possible industrial legacy contamination.',
    location: { lat: 37.7599, lng: -122.4148, address: '1234 Valencia St, San Francisco, CA 94110' },
    reportedBy: 'David Kim',
    reportedAt: '2024-12-14T08:45:00Z',
    aiConfidence: 96.1,
    updatedAt: '2024-12-14T12:00:00Z',
  },
  {
    id: 'RPT-2024-006',
    title: 'Overflowing Storm Drain',
    category: 'Water Contamination',
    severity: 'warning',
    status: 'pending',
    description: 'Storm drain at intersection completely blocked, causing flooding and potential sewage backup into residential area.',
    location: { lat: 37.7849, lng: -122.4094, address: '567 Pine St, San Francisco, CA 94108' },
    reportedBy: 'Alex Mercer',
    reportedAt: '2024-12-15T07:15:00Z',
    aiConfidence: 83.4,
    updatedAt: '2024-12-15T07:15:00Z',
  },
  {
    id: 'RPT-2024-007',
    title: 'Abandoned Vehicle Leaking Fluids',
    category: 'Chemical Spill',
    severity: 'low',
    status: 'dispatched',
    description: 'Abandoned vehicle leaking motor oil and coolant into gutter drain. Vehicle has been stationary for approximately 2 weeks.',
    location: { lat: 37.7700, lng: -122.4200, address: '890 Guerrero St, San Francisco, CA 94110' },
    reportedBy: 'Marcus Thompson',
    reportedAt: '2024-12-12T15:20:00Z',
    aiConfidence: 68.5,
    assignedTo: 'Marcus Rivera',
    updatedAt: '2024-12-13T09:00:00Z',
  },
  {
    id: 'RPT-2024-008',
    title: 'Gas Leak Detected on Haight Street',
    category: 'Gas Leak',
    severity: 'critical',
    status: 'dispatched',
    description: 'Strong natural gas odor detected near intersection. Multiple residents have reported the smell. PG&E notified but response pending.',
    location: { lat: 37.7694, lng: -122.4484, address: '1600 Haight St, San Francisco, CA 94117' },
    reportedBy: 'Nina Patel',
    reportedAt: '2024-12-15T13:45:00Z',
    aiConfidence: 97.8,
    assignedTo: 'Team Alpha',
    updatedAt: '2024-12-15T14:00:00Z',
  },
];

/* ── Leaderboard ── */
export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Alex V.', badge: 'Active Responder', score: 1247 },
  { rank: 2, name: 'Sarah L.', badge: 'Green Guardian', score: 1156 },
  { rank: 3, name: 'Marcus T.', badge: 'Elite Scout', score: 1089 },
  { rank: 4, name: 'Elena G.', badge: 'Watchman', score: 923 },
  { rank: 5, name: 'David K.', badge: 'Patrol Member', score: 847 },
];

/* ── Analytics Data ── */
export const mockAnalytics: AnalyticsData[] = [
  { month: 'Jul', reports: 45, verified: 38, resolved: 32 },
  { month: 'Aug', reports: 62, verified: 51, resolved: 44 },
  { month: 'Sep', reports: 58, verified: 49, resolved: 41 },
  { month: 'Oct', reports: 71, verified: 63, resolved: 55 },
  { month: 'Nov', reports: 84, verified: 72, resolved: 64 },
  { month: 'Dec', reports: 93, verified: 81, resolved: 68 },
];

/* ── Employees ── */
export const mockEmployees: EmployeeData[] = [
  { id: 'emp-001', name: 'Marcus Rivera', role: 'Field Inspector', status: 'active', location: { lat: 37.7649, lng: -122.3894 }, assignedReports: 3, completedToday: 2, lastUpdate: '2 min ago' },
  { id: 'emp-002', name: 'Olivia Santos', role: 'Hazmat Specialist', status: 'en-route', location: { lat: 37.7749, lng: -122.4194 }, assignedReports: 1, completedToday: 4, lastUpdate: '5 min ago' },
  { id: 'emp-003', name: 'James Walker', role: 'Environmental Inspector', status: 'active', location: { lat: 37.7344, lng: -122.3852 }, assignedReports: 2, completedToday: 1, lastUpdate: '8 min ago' },
  { id: 'emp-004', name: 'Priya Sharma', role: 'Air Quality Analyst', status: 'off-duty', location: { lat: 37.7599, lng: -122.4148 }, assignedReports: 0, completedToday: 3, lastUpdate: '1 hr ago' },
  { id: 'emp-005', name: 'Tom Nguyen', role: 'Field Inspector', status: 'active', location: { lat: 37.7849, lng: -122.4094 }, assignedReports: 4, completedToday: 2, lastUpdate: '1 min ago' },
];

/* ── Hazard Categories ── */
export const hazardCategories = [
  'Water Contamination',
  'Air Quality',
  'Illegal Dumping',
  'Noise Pollution',
  'Soil Contamination',
  'Chemical Spill',
  'Gas Leak',
  'Radiation',
  'Biological Hazard',
  'Other',
];

/* ── Dashboard Stats ── */
export const dashboardStats = {
  totalReports: 1247,
  activeCases: 89,
  resolvedThisMonth: 68,
  averageAQI: 42,
  greenScore: 847,
  citiesMonitored: 12,
  aiAccuracy: 94.2,
  responseTime: '2.4 hrs',
};
