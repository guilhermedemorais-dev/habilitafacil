
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import StudentDashboard from './pages/student/StudentDashboard';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import SupportPage from './pages/support/SupportPage';
import VideoCallPage from './pages/common/VideoCallPage';
import NotFoundPage from './pages/common/NotFoundPage';
import EADContent from './pages/student/EADContent';
import BookingPage from './pages/student/BookingPage';
import LADVUpload from './pages/student/LADVUpload';
import VehicleManagement from './pages/instructor/VehicleManagement';
import EADManagement from './pages/instructor/EADManagement';
import Earnings from './pages/instructor/Earnings';
import ValidationPage from './pages/admin/ValidationPage';
import UserManagement from './pages/admin/UserManagement';
import CustomizationPage from './pages/admin/CustomizationPage';
import MainLayout from './components/layout/MainLayout';
import { UserRole } from './types';
import LessonDetailPage from './pages/student/LessonDetailPage';

// A wrapper for protected routes that checks for authentication and role.
// FIX: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const ProtectedRoute: React.FC<{ children: React.ReactElement; role: UserRole }> = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== role) {
    // If logged in but wrong role, show unauthorized page
    return <NotFoundPage message="Acesso não autorizado para este perfil." />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/support" element={<SupportPage />} />

            {/* Student Routes */}
            <Route path="/student" element={<ProtectedRoute role={UserRole.STUDENT}><MainLayout><StudentDashboard /></MainLayout></ProtectedRoute>} />
            <Route path="/student/ead/:moduleId" element={<ProtectedRoute role={UserRole.STUDENT}><MainLayout><EADContent /></MainLayout></ProtectedRoute>} />
            <Route path="/student/booking" element={<ProtectedRoute role={UserRole.STUDENT}><MainLayout><BookingPage /></MainLayout></ProtectedRoute>} />
            <Route path="/student/ladv" element={<ProtectedRoute role={UserRole.STUDENT}><MainLayout><LADVUpload /></MainLayout></ProtectedRoute>} />
            <Route path="/student/lesson/:lessonId" element={<ProtectedRoute role={UserRole.STUDENT}><MainLayout><LessonDetailPage /></MainLayout></ProtectedRoute>} />

            {/* Instructor Routes */}
            <Route path="/instructor" element={<ProtectedRoute role={UserRole.INSTRUCTOR}><MainLayout><InstructorDashboard /></MainLayout></ProtectedRoute>} />
            <Route path="/instructor/vehicles" element={<ProtectedRoute role={UserRole.INSTRUCTOR}><MainLayout><VehicleManagement /></MainLayout></ProtectedRoute>} />
            <Route path="/instructor/ead" element={<ProtectedRoute role={UserRole.INSTRUCTOR}><MainLayout><EADManagement /></MainLayout></ProtectedRoute>} />
            <Route path="/instructor/earnings" element={<ProtectedRoute role={UserRole.INSTRUCTOR}><MainLayout><Earnings /></MainLayout></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute role={UserRole.ADMIN}><MainLayout><AdminDashboard /></MainLayout></ProtectedRoute>} />
            <Route path="/admin/validations" element={<ProtectedRoute role={UserRole.ADMIN}><MainLayout><ValidationPage /></MainLayout></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute role={UserRole.ADMIN}><MainLayout><UserManagement /></MainLayout></ProtectedRoute>} />
            <Route path="/admin/customize" element={<ProtectedRoute role={UserRole.ADMIN}><MainLayout><CustomizationPage /></MainLayout></ProtectedRoute>} />
            
            {/* Common Authenticated Routes */}
            <Route path="/videocall/:lessonId" element={
              <MainLayout>
                <VideoCallPage />
              </MainLayout>
             } />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
