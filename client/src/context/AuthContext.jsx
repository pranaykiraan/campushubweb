import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedSession = localStorage.getItem('campushub_session');
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch (err) {
        console.error('Failed to parse saved session:', err);
        localStorage.removeItem('campushub_session');
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ identifier, password, role }) => {
    try {
      // 1. Attempt Live Express Backend Call
      const response = await API.post('/auth/login', { identifier, password, role });
      const userData = response.data;
      localStorage.setItem('campushub_session', JSON.stringify(userData));
      setUser(userData);
      return { success: true, mode: 'api' };
    } catch (apiError) {

    // Demo Mode Offline Fallback Logic
    if (role === 'student' && identifier === 'STU101' && password === 'student123') {
      const demoData = {
        role: 'student',
        token: 'demo-student-token-12345',
        profile: {
          fullName: 'Alex Rivers',
          studentId: 'STU101',
          courseProgram: 'BCA',
          department: 'Computer Science',
          semester: 5,
          section: 'A',
          attendance: '82%',
          gpa: '3.92'
        }
      };
      localStorage.setItem('campushub_session', JSON.stringify(demoData));
      setUser(demoData);
      return { success: true, mode: 'demo' };
    }

    if (role === 'lecturer' && identifier === 'LEC202' && password === 'lecturer123') {
      const demoData = {
        role: 'lecturer',
        token: 'demo-lecturer-token-67890',
        profile: {
          fullName: 'Prof. Sarah Miller',
          teacherId: 'LEC202',
          department: 'Computer Science & Eng',
          designation: 'Senior Lecturer',
          subjects: ['Advanced Algorithms', 'Data Structures'],
          sections: 'A, B'
        }
      };
      localStorage.setItem('campushub_session', JSON.stringify(demoData));
      setUser(demoData);
      return { success: true, mode: 'demo' };
    }

    throw new Error('Invalid Credentials. Use Demo Mode (STU101 / student123 or LEC202 / lecturer123)');
    }
  };

  const logout = () => {
    localStorage.removeItem('campushub_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
