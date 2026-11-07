/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SupportedLanguage = 'en' | 'mni' | 'hi';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  script?: string;
}

export type AvatarState = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface ChatAttachment {
  name: string;
  type: string;
  size: number;
  dataUrl?: string;
  contentSnippet?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  language?: SupportedLanguage;
  attachments?: ChatAttachment[];
  suggestedFollowUps?: string[];
  audioAvailable?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
  language: SupportedLanguage;
}

export type KnowledgeCategory = 
  | 'history'
  | 'culture'
  | 'tourism'
  | 'education'
  | 'government'
  | 'agriculture'
  | 'emergency';

export interface KnowledgeItem {
  id: string;
  category: KnowledgeCategory;
  title: string;
  titleManipuri?: string;
  summary: string;
  content: string;
  verifiedSource: string;
  tags: string[];
  district?: string;
  coordinates?: { lat: number; lng: number };
  contactNumber?: string;
  officialLink?: string;
}

export interface TourismSpot {
  id: string;
  name: string;
  nativeName: string;
  district: string;
  significance: string;
  description: string;
  bestSeason: string;
  howToReach: string;
  distanceFromImphal: string;
  tags: string[];
  coordinates: { x: number; y: number; z: number }; // For 3D map
}

export interface HistoricalEvent {
  id: string;
  year: string;
  period: string;
  title: string;
  description: string;
  keyFigures: string[];
  significance: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  department: string;
  targetGroup: string;
  benefits: string;
  eligibility: string[];
  documentsRequired: string[];
  officialPortal: string;
}

export interface EmergencyService {
  id: string;
  service: string;
  helpline: string;
  alternateNumber?: string;
  category: 'police' | 'medical' | 'women' | 'disaster' | 'fire' | 'child';
  description: string;
  is24x7: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'student' | 'researcher' | 'tourist' | 'admin';
  preferredLanguage: SupportedLanguage;
  createdAt: string;
  avatar?: string;
}

export interface SQLColumnDef {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  references?: string;
  nullable: boolean;
  description: string;
}

export interface SQLTableSchema {
  tableName: string;
  description: string;
  columns: SQLColumnDef[];
  rowCount: number;
  records: Record<string, any>[];
}

export interface AdminStats {
  totalRegisteredUsers: number;
  activeUsersNow: number;
  totalConversations: number;
  totalMessagesProcessed: number;
  tokensConsumed: number;
  avgResponseLatencyMs: number;
  queriesByCategory: Record<string, number>;
  queriesByLanguage: Record<string, number>;
  systemHealth: {
    geminiApi: 'healthy' | 'degraded' | 'offline';
    database: 'healthy' | 'degraded';
    ttsService: 'healthy' | 'fallback';
    uptime: string;
  };
}

export interface UserFeedback {
  id: string;
  userId?: string;
  name?: string;
  userName?: string;
  rating: number;
  category: string;
  comment: string;
  createdAt: string;
  status?: 'reviewed' | 'pending' | 'resolved';
}

export type AppNavigationTab = 
  | 'home'
  | 'chat'
  | 'knowledge'
  | 'tourism-3d'
  | 'translator'
  | 'mobile-app'
  | 'admin';
