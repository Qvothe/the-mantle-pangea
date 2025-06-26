// The Mantle - Type Definitions
import { ReactElement } from 'react'

// Value System Types
export interface GOAT {
  name: string;
  quote: string;
  image: string;
  achievement: string;
  videoUrl?: string;
}

export interface PangeaChampion {
  name: string;
  photo: string;
  achievement: string;
  month: string;
  department?: string;
}

export interface Value {
  letter: string;
  value: string;
  description: string;
  goat: GOAT;
  champion: PangeaChampion;
  icon: string;
  color: string;
}

// Event Types
export interface Event {
  id: string;
  type: 'team_outing' | 'all_hands' | 'fun_event';
  name: string;
  date: Date;
  description: string;
  location?: string;
  rsvpCount?: number;
}

// Must Watch Content Types
export interface MustWatchContent {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  uploadedBy: {
    id: string;
    name: string;
    photo: string;
  };
  category: 'learning' | 'fun' | 'inspiration';
  reactions: {
    likes: number;
    fire: number;
    mindblown: number;
  };
  uploadDate: Date;
  views: number;
}

// Competition Types
export interface Competition {
  id: string;
  type: 'tshirt' | 'open_challenge';
  title: string;
  description: string;
  deadline: Date;
  submissions: Submission[];
  prize?: string;
  status: 'active' | 'voting' | 'completed';
}

export interface Submission {
  id: string;
  competitionId: string;
  submittedBy: {
    id: string;
    name: string;
    photo: string;
  };
  content: string | { imageUrl: string; description: string };
  submittedAt: Date;
  votes: number;
}

// News Types
export interface NewsItem {
  id: string;
  category: 'announcement' | 'award' | 'new_client' | 'new_employee' | 'ai_news';
  title: string;
  summary: string;
  content: string;
  imageUrl?: string;
  author: {
    name: string;
    photo: string;
  };
  publishedAt: Date;
  featured: boolean;
  breaking?: boolean;
}

// Analytics Types
export interface Metric {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  unit?: string;
  trend: 'up' | 'down' | 'stable';
  sparklineData?: number[];
  icon: string;
  color: string;
}

export interface DashboardMetrics {
  linesOfCode: {
    total: number;
    byLanguage: { [key: string]: number };
    trend: number[];
  };
  agentHours: {
    saved: number;
    utilized: number;
    efficiency: number;
  };
  posts: {
    internal: number;
    social: number;
    engagement: number;
  };
  salesFunnel: {
    demos: number;
    conversions: number;
    pipeline: number;
  };
  sonorcaQueries: {
    total: number;
    uniqueUsers: number;
    topTopics: string[];
  };
}

// Award Types (Enhanced from existing)
export interface Award {
  id: number;
  name: string;
  icon: ReactElement;
  for: string;
  description: string;
  frequency: string;
  color: string;
  bgColor: string;
  sectionBg: string;
  darkSectionBg: string;
  iconColor: string;
  tagline: string;
  prize: {
    name: string;
    description: string;
    value: string;
    icon: string;
  };
  currentOdds?: number;
  predictions?: AwardPrediction[];
}

export interface AwardPrediction {
  userId: string;
  awardId: number;
  nomineeId: string;
  confidence: number;
  timestamp: Date;
}

// Leaderboard Types
export interface CricketStats {
  playerId: string;
  playerName: string;
  photo: string;
  ducks: number;
  catches: number;
  timedOut: number;
  manOfTheMatch: number;
  lastPlayed: Date;
}

export interface LaptopUnlock {
  id: string;
  userId: string;
  userName: string;
  photo: string;
  timestamp: Date;
  excuse: string;
  punishmentStatus: 'pending' | 'completed';
  punishment?: string;
  evidenceUrl?: string;
}

export interface HumanOfPangea {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  story: string;
  photos: string[];
  quote: string;
  publishedDate: Date;
  nominations: number;
}

export interface DesignationNomination {
  id: string;
  nomineeId: string;
  nomineeName: string;
  designation: string;
  reason: string;
  votes: number;
  nominatedBy: string;
  status: 'pending' | 'approved' | 'active';
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
  department: string;
  role: string;
  joinDate: Date;
  points: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Theme Types
export interface ProductTheme {
  name: 'sonorca' | 'turtlemoves' | 'turingxai' | 'pitchperfect';
  primaryColor: string;
  secondaryColor: string;
  gradient: string;
  icon: string;
  description: string;
}