import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Megaphone, PlusCircle, FileCheck } from 'lucide-react';
import StaggeredMenu from '../components/common/StaggeredMenu';
import AttendanceMarker from '../components/lecturer/AttendanceMarker';
import GradeUploadModal from '../components/lecturer/GradeUploadModal'; // 1. Import

export default function LecturerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profile = user?.profile || {};

  // 2. Modal State
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);

  const [notice, setNotice] = useState('');
  const [noticesList, setNoticesList] = useState([
    'Assignment 2 submissions due by Friday at midnight.',
    'Lab session rescheduled to Thursday 2:00 PM.'
  ]);

  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!notice.trim()) return;
    setNoticesList([notice, ...noticesList]);
    setNotice('');
  };

  const menuItems = [
    { label: 'Home Page', ariaLabel: 'Return to Home Page', link: '#', onClick: () => navigate('/') },
    { label: 'Overview', ariaLabel: 'Go to Overview', link: '#', onClick: () => {} },
    { label: 'Attendance Entry', ariaLabel: 'Mark Attendance', link: '#', onClick: () => {} },
    { label: 'Grading & Marks', ariaLabel: 'Upload Marks', link: '#', onClick: () => setIsGradeModalOpen(true) },
    { label: 'Notice Publisher', ariaLabel: 'Publish Notice', link: '#', onClick: () => {} },
    { label: 'Sign Out', ariaLabel: 'Sign Out Account', link: '#', onClick: logout },
  ];

  const socialItems = [
    { label: 'Campus Website', link: 'https://ssmrv.edu.in' },
    { label: 'Faculty Portal', link: '#' },
    { label: 'Staff Support', link: '#' }
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
            <p className="text-[10px] text-slate-400 font-medium">Faculty Portal</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 bg-slate-800/80 border border-slate-700/60 px-4 py-2 rounded-2xl">
          <div className="w-8 h-8 bg-sky-500 rounded-xl flex items-center justify-center font-bold text-xs text-white">
            {profile.fullName ? profile.fullName[0] : 'L'}
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-white leading-tight">{profile.fullName || 'Prof. Sarah Miller'}</p>
            <p className="text-[10px] text-slate-400">{profile.teacherId || 'LEC202'}</p>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-4 space-y-8 overflow-y-auto">
        
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-white/20 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide backdrop-blur-md">
              {profile.designation || 'Senior Lecturer'} • {profile.department || 'Computer Science & Eng'}
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold mt-3">Faculty Management Dashboard</h2>
            <p className="text-blue-100 text-xs md:text-sm mt-1">Manage class attendance, student grading, and department announcements.</p>
          </div>

          {/* Action Button to trigger Modal */}
          <button
            onClick={() => setIsGradeModalOpen(true)}
            className="bg-white text-blue-700 hover:bg-slate-50 px-6 py-3.5 rounded-2xl font-bold text-xs shadow-lg flex items-center gap-2 transition-all active:scale-95"
          >
            <FileCheck className="w-4 h-4 text-blue-600" /> Upload Marks & Grades
          </button>
        </div>

        {/* Attendance Marker Roster */}
        <AttendanceMarker />

        {/* Announcement Publisher */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 text-slate-800">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-4">
            <Megaphone className="w-5 h-5 text-blue-600" /> Post New Announcement
          </h3>

          <form onSubmit={handlePostNotice} className="space-y-4">
            <textarea
              rows="3"
              placeholder="Broadcast a notice to students..."
              value={notice}
              onChange={(e) => setNotice(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
              >
                <PlusCircle className="w-4 h-4" /> Publish Notice
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Published Notices</p>
            {noticesList.map((item, index) => (
              <div key={index} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* 3. Render Modal */}
      <GradeUploadModal 
        isOpen={isGradeModalOpen} 
        onClose={() => setIsGradeModalOpen(false)} 
      />
    </div>
  );
}