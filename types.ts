
export enum UserRole {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  token?: string; // This would be handled by the auth context, not stored here long-term
}

export enum DocumentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface Document {
  id: string;
  name: string;
  url: string;
  status: DocumentStatus;
  uploadedAt: string;
}

export interface Student extends User {
  ladv: Document | null;
  kycStatus: DocumentStatus;
}

export interface Instructor extends User {
  certifications: Document[];
  kycStatus: DocumentStatus;
  rating: number;
}

export interface Vehicle {
  id: string;
  instructorId: string;
  model: string;
  plate: string;
  year: number;
  category: 'A' | 'B' | 'C' | 'D' | 'E';
  crlv: Document;
  insurance: Document;
  teachingVehicleId: Document;
  status: DocumentStatus;
  imageUrl: string;
}

export enum LessonType {
  THEORETICAL = 'theoretical',
  PRACTICAL_PRESENTIAL = 'practical_presential',
  PRACTICAL_ONLINE = 'practical_online',
  VEHICLE_RENTAL = 'vehicle_rental',
}

export interface Lesson {
  id: string;
  studentId: string;
  instructorId: string;
  studentName?: string;
  instructorName?: string;
  vehicleId?: string;
  type: LessonType;
  date: string;
  duration: number; // in minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending_approval';
  notes?: string;
}

export enum EADContentType {
  VIDEO = 'video',
  TEXT = 'text',
  QUIZ = 'quiz',
  SIMULATION = 'simulation',
}

export interface EADModuleContent {
  type: EADContentType;
  url?: string; // for video
  text?: string; // for text
  questions?: QuizQuestion[];
}

export interface EADModule {
  id: string;
  title: string;
  description: string;
  content: EADModuleContent[];
  instructorId: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
}

export interface SystemKPIs {
  totalStudents: number;
  totalInstructors: number;
  totalLessons: number;
  pendingValidations: number;
}

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

// Types for Admin Validation Page
export enum ValidationType {
  STUDENT_KYC = 'KYC Aluno',
  INSTRUCTOR_KYC = 'KYC Instrutor',
  LADV = 'LADV Aluno',
  INSTRUCTOR_CERTIFICATE = 'Certificado Instrutor',
  VEHICLE_CRLV = 'CRLV Veículo',
}

export interface ValidationItem {
    id: string;
    type: ValidationType;
    user: string;
    date: string;
    documentUrl?: string; // Mock URL to an image
}


// Types for Forms
export interface VehicleFormData {
    model: string;
    plate: string;
    year: string;
    category: 'A' | 'B' | 'C' | 'D' | 'E';
}

export interface EADModuleFormData {
    title: string;
    description: string;
}
