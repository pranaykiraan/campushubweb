import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Clock, Bell } from 'lucide-react';
import StaggeredMenu from '../components/common/StaggeredMenu';
import GradesCalculator from '../components/student/GradesCalculator'; // 1. Import

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profile = user?.profile || {};

  const menuItems = [
    { label: 'Home Page', ariaLabel: 'Return to Home Page', link: '#', onClick: () => navigate('/') },
    { label: 'Dashboard', ariaLabel: 'Go to Dashboard', link: '#', onClick: () => {} },
    { label: 'Timetable', ariaLabel: 'View Timetable', link: '#', onClick: () => alert('Timetable view opened') },
    { label: 'Course Grades', ariaLabel: 'View Grades', link: '#', onClick: () => alert('Grades view opened') },
    { label: 'Notices', ariaLabel: 'View Announcements', link: '#', onClick: () => alert('Notices view opened') },
    { label: 'Sign Out', ariaLabel: 'Sign Out Account', link: '#', onClick: logout },
  ];

  const socialItems = [
    { label: 'Campus Portal', link: 'https://ssmrv.edu.in' },
    { label: 'Digital Library', link: '#' },
    { label: 'Student Support', link: '#' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col relative overflow-x-hidden font-sans">
      
      {/* Staggered Navigation Overlay */}
      <StaggeredMenu
        isFixed={true}
        position="left"
        colors={['#1e3a8a', '#2563eb', '#ffffff']}
        accentColor="#2563eb"
        items={menuItems}
        socialItems={socialItems}
      />

      {/* Top Header Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 pl-28 pt-6 pb-4 flex justify-between items-center z-10">
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 cursor-pointer group"
          title="Return to Home Page"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 rounded-2xl flex items-center justify-center font-extrabold text-white shadow-lg group-hover:scale-105 transition-transform">
            CH
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-white tracking-tight">CampusHub</h1>
            <p className="text-[10px] text-slate-400 font-medium">Student Portal</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 bg-slate-800/80 border border-slate-700/60 px-4 py-2 rounded-2xl">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xs text-white">
            {profile.fullName ? profile.fullName[0] : 'S'}
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-white leading-tight">{profile.fullName || 'Alex Rivers'}</p>
            <p className="text-[10px] text-slate-400">{profile.studentId || 'STU101'}</p>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-4 space-y-8 overflow-y-auto">
        
        {/* Blue Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-white/20 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide backdrop-blur-md">
              {profile.courseProgram || 'BCA'} • Sem {profile.semester || 5} ({profile.section || 'Sec A'})
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold mt-3">Good Morning, {profile.fullName || 'Alex Rivers'}!</h2>
            <p className="text-blue-100 text-xs md:text-sm mt-1">Here is your real-time academic overview for today.</p>
          </div>

          <div className="flex gap-4 w-full md:w-auto relative z-10">
            <div className="bg-white/15 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center flex-1 md:flex-none min-w-[130px]">
              <span className="text-[10px] uppercase font-semibold text-blue-100">Attendance</span>
              <div className="text-2xl md:text-3xl font-bold mt-0.5">{profile.attendance || '82%'}</div>
            </div>
            <div className="bg-white/15 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center flex-1 md:flex-none min-w-[130px]">
              <span className="text-[10px] uppercase font-semibold text-blue-100">Current CGPA</span>
              <div className="text-2xl md:text-3xl font-bold mt-0.5">{profile.gpa || '3.92'}</div>
            </div>
          </div>
        </div>

        {/* Schedule & Notice Board Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 text-slate-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" /> Today's Schedule
              </h3>
              <span className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline">Full Schedule</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 text-green-700 rounded-xl font-semibold text-xs">09:00 AM</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Advanced Calculus</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Prof. Sarah Miller • Room 302</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">In Progress</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-700 rounded-xl font-semibold text-xs">11:30 AM</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Quantum Computing</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Dr. Robert Chen • Lab 04</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-slate-200 text-slate-600 text-xs font-semibold rounded-full">Upcoming</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 text-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-blue-600" /> Notice Board
              </h3>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl space-y-2">
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-md uppercase">Important</span>
                <p className="text-xs font-bold text-blue-900">Mid-Semester Exam Schedule Posted</p>
                <p className="text-xs text-slate-600 leading-relaxed">Exams commence from November 10th. Please verify your admit card details on the campus portal.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">Department: <span className="text-slate-800 font-semibold">{profile.department || 'Computer Science'}</span></p>
            </div>
          </div>
        </div>

        {/* 2. Grades & Target CGPA Calculator Section */}
        <GradesCalculator />

      </main>
    </div>
  );
}