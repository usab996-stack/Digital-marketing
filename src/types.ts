export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  authProvider: 'credentials' | 'google' | 'phone';
  joinedDate: string;
  isVip: boolean;
  savedItemIds: string[];
}

export type ResourceType = 'course' | 'software';

export interface CourseItem {
  id: string;
  type: 'course';
  title: string;
  category: string;
  description: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Masterclass';
  duration: string;
  modulesCount: number;
  rating: number;
  studentsCount: number;
  primaryLink: string;
  mirrorLink?: string;
  telegramLink?: string;
  thumbnail: string;
  tags: string[];
  syllabus: { title: string; duration: string; topics: string[] }[];
  isFeatured?: boolean;
  order: number;
}

export interface SoftwareItem {
  id: string;
  type: 'software';
  title: string;
  category: string;
  description: string;
  version: string;
  fileSize: string;
  platform: 'Windows' | 'macOS' | 'Multi-Platform' | 'Android';
  verifiedClean: boolean;
  downloadUrl: string;
  mirrorUrl?: string;
  torrentUrl?: string;
  thumbnail: string;
  tags: string[];
  installSteps: string[];
  systemRequirements: string;
  isFeatured?: boolean;
  order: number;
}
