
import React from 'react';
import { UserRole } from './types';

const iconClasses = "h-6 w-6";

// FIX: Replaced JSX with React.createElement to resolve parsing errors in .ts file.
export const SIDEBAR_LINKS = {
  [UserRole.STUDENT]: [
    { name: 'Dashboard', path: '/student', icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: iconClasses, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' })) },
    { name: 'Agendar Aula', path: '/student/booking', icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: iconClasses, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })) },
    { name: 'Meu LADV', path: '/student/ladv', icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: iconClasses, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-6.5-1l-1.5 1.5' })) },
    { name: 'Suporte', path: '/support', icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: iconClasses, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })) },
  ],
  [UserRole.INSTRUCTOR]: [
    { name: 'Dashboard', path: '/instructor', icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: iconClasses, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' })) },
    { name: 'Meus Veículos', path: '/instructor/vehicles', icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: iconClasses, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }), React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z' })) },
    { name: 'Conteúdo EAD', path: '/instructor/ead', icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: iconClasses, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' })) },
    { name: 'Ganhos', path: '/instructor/earnings', icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: iconClasses, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01' })) },
    { name: 'Suporte', path: '/support', icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: iconClasses, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })) },
  ],
  [UserRole.ADMIN]: [
    { name: 'Dashboard', path: '/admin', icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: iconClasses, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' })) },
    { name: 'Validações', path: '/admin/validations', icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: iconClasses, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { fillRule: 'evenodd', d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z', clipRule: 'evenodd' })) },
    { name: 'Usuários', path: '/admin/users', icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: iconClasses, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125a4 4 0 00-6.44 0A6 6 0 003 20v1h12z' })) },
    { name: 'Personalização', path: '/admin/customize', icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: iconClasses, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' })) },
    { name: 'Suporte', path: '/support', icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', className: iconClasses, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })) },
  ],
};

// API Endpoint placeholders for documentation and future integration
export const API_ENDPOINTS = {
  // AUTH
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  
  // STUDENT
  GET_STUDENT_DASHBOARD: '/api/student/dashboard',
  UPLOAD_LADV: '/api/student/ladv',
  GET_INSTRUCTORS: '/api/instructors',
  BOOK_LESSON: '/api/student/book',
  GET_EAD_MODULES: '/api/ead/modules',
  RATE_INSTRUCTOR: '/api/student/rate',

  // INSTRUCTOR
  GET_INSTRUCTOR_DASHBOARD: '/api/instructor/dashboard',
  MANAGE_VEHICLES: '/api/instructor/vehicles',
  MANAGE_EAD: '/api/instructor/ead',
  GET_EARNINGS: '/api/instructor/earnings',
  CONFIRM_BOOKING: '/api/instructor/bookings/confirm',
  REJECT_BOOKING: '/api/instructor/bookings/reject',
  
  // ADMIN
  GET_ADMIN_DASHBOARD: '/api/admin/dashboard',
  GET_PENDING_VALIDATIONS: '/api/admin/validations',
  APPROVE_DOCUMENT: '/api/admin/validations/approve',
  REJECT_DOCUMENT: '/api/admin/validations/reject',
  GET_USERS: '/api/admin/users',
  MANAGE_USER: '/api/admin/users/:id',
  UPDATE_THEME: '/api/admin/theme',
};
