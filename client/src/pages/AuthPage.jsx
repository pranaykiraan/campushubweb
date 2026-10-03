import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, Lock, Mail, ShieldCheck, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';
import API from '../services/api';

export default function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('student');
  const [viewState, setViewState] = useState('login'); // 'login' | 'signup' | 'forgot' | 'reset'
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    email: '',
    otp: '',
    newPassword: '',
    fullName: '',
    department: '',
    courseProgram: '',
    designation: '',
    invitationCode: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      await login({
        identifier: formData.identifier,
        password: formData.password,
        role: role,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // Submit Forgot Password (Request OTP)
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      const res = await API.post('/auth/forgot-password', { email: formData.email });
      setSuccessMsg(res.data.message || `OTP sent to ${formData.email}`);
      if (res.data.demoOtp) {
        setFormData(prev => ({ ...prev, otp: res.data.demoOtp }));
      }
      setViewState('reset');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request OTP');
    }
  };

  // Submit Reset Password (Verify OTP & Update)
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      const res = await API.post('/auth/reset-password', {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword
      });
      setSuccessMsg(res.data.message || 'Password reset successfully!');
      setTimeout(() => {
        setViewState('login');
        setSuccessMsg('');
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 lg:p-12 relative font-sans">
      
      {/* Return to Home Link */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-xs text-slate-400 hover:text-white flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700/60 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Home
      </button>

      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side: Desktop Hero Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-400 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl mb-6 shadow-inner">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">CampusHub</h1>
            <p className="text-blue-100 text-xs md:text-sm mt-2 font-medium leading-relaxed max-w-sm">
              Unified academic management portal bridging students and faculty members.
            </p>
          </div>

          <div className="relative z-10 hidden md:block space-y-4 my-8">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
              <ShieldCheck className="w-5 h-5 text-sky-200" />
              <span className="text-xs font-medium text-blue-50">Token-Based Secure Single Sign-On</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
              <KeyRound className="w-5 h-5 text-sky-200" />
              <span className="text-xs font-medium text-blue-50">Instant OTP Verification Recovery</span>
            </div>
          </div>

          <div className="relative z-10 text-[11px] text-blue-100/80">
            © 2026 CampusHub Platform. All rights reserved.
          </div>

          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        {/* Right Side: Dynamic Form Area */}
        <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
          
          {/* Role Toggle Tabs (Only shown on Login/Signup) */}
          {(viewState === 'login' || viewState === 'signup') && (
            <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  role === 'student' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <User className="w-4 h-4" /> Student
              </button>
              <button
                type="button"
                onClick={() => setRole('lecturer')}
                className={`flex-1 py-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  role === 'lecturer' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <GraduationCap className="w-4 h-4" /> Faculty
              </button>
            </div>
          )}

          {/* Dynamic Header Titles */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              {viewState === 'login' && 'Welcome Back'}
              {viewState === 'signup' && `Register as ${role === 'student' ? 'Student' : 'Faculty'}`}
              {viewState === 'forgot' && 'Forgot Password'}
              {viewState === 'reset' && 'Reset Password'}
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              {viewState === 'login' && 'Please sign in using your portal ID.'}
              {viewState === 'signup' && 'Fill details to generate your institutional account.'}
              {viewState === 'forgot' && 'Enter your email to receive a 6-digit OTP.'}
              {viewState === 'reset' && 'Enter the OTP sent to your email along with a new password.'}
            </p>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="mb-4 p-3.5 bg-red-50 text-red-600 rounded-2xl text-xs font-medium border border-red-100 text-center">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 p-3.5 bg-green-50 text-green-700 rounded-2xl text-xs font-medium border border-green-100 text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" /> {successMsg}
            </div>
          )}

          {/* VIEW 1: LOGIN */}
          {viewState === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                <input
                  type="text"
                  name="identifier"
                  placeholder={role === 'student' ? 'Student ID (e.g., STU101)' : 'Teacher ID (e.g., LEC202)'}
                  value={formData.identifier}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setSuccessMsg('');
                    setViewState('forgot');
                  }}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 transition-all text-xs tracking-wider uppercase"
              >
                Sign In
              </button>
            </form>
          )}

          {/* VIEW 2: FORGOT PASSWORD (REQUEST OTP) */}
          {viewState === 'forgot' && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter institutional email..."
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 transition-all text-xs tracking-wider uppercase"
              >
                Send OTP Code
              </button>

              <button
                type="button"
                onClick={() => setViewState('login')}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                ← Back to Login
              </button>
            </form>
          )}

          {/* VIEW 3: RESET PASSWORD (ENTER OTP & NEW PASSWORD) */}
          {viewState === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                <input
                  type="text"
                  name="otp"
                  placeholder="6-Digit OTP Code"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter New Password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 transition-all text-xs tracking-wider uppercase"
              >
                Update Password
              </button>

              <button
                type="button"
                onClick={() => setViewState('login')}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                ← Back to Login
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}