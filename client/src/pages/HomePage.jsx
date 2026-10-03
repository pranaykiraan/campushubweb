import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  Clock,
  BookOpen,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  const announcementText =
    'IMPORTANT FACULTY ANNOUNCEMENT: Mid-Semester Examinations commence from November 10th. Please check your assigned exam halls on the student portal.';

  const featureDetails = {
    schedules: {
      title: 'Real-Time Timetables & Schedules',
      badge: 'Student Feature',
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      description:
        'Automated schedule mapping ensures students never miss a lecture or room reassignment.',
      highlights: [
        'Live synchronisation with faculty lecture updates',
        'Automated collision detection for elective courses',
        'Interactive room numbers and faculty contact info',
        'Export timetable sync to personal mobile calendars',
      ],
    },
    assessments: {
      title: 'Assessment & Grade Analytics',
      badge: 'Academic Tracking',
      icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
      description:
        'Comprehensive grade ledger tracking internal assessments, lab marks, and overall GPA trajectory.',
      highlights: [
        'Instant calculation of internal weighted averages',
        'Visual GPA progress trends over active semesters',
        'Direct feedback commentary from course lecturers',
        'Automated attendance threshold alerts (<75% warning)',
      ],
    },
    announcements: {
      title: 'Broadcasting & Notice Publisher',
      badge: 'Faculty Communication',
      icon: <Megaphone className="w-8 h-8 text-sky-600" />,
      description:
        'Targeted announcement engine for department heads and lecturers.',
      highlights: [
        'Broadcast to specific departments, courses, or sections',
        'Push notification alerts for urgent assignment deadlines',
        'Attachment support for assignment briefs and resources',
        'Read receipts and student interaction analytics',
      ],
    },
  };

  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        .animate-spin-slow {
          animation: spinSlow 12s linear infinite;
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 rounded-2xl flex items-center justify-center font-extrabold text-white shadow-md group-hover:scale-105 transition-transform">
                CH
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                  CampusHub
                </span>
                <p className="text-[10px] text-slate-400 font-medium">Higher Education Portal</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/auth')}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold rounded-2xl text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 active:scale-95"
            >
              Access Portal <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </header>

        <div className="w-full bg-[#e0f2fe] border-y border-sky-200/80 py-3 overflow-hidden relative flex items-center shadow-inner">
          <div className="absolute left-0 z-20 bg-[#e0f2fe] pl-6 pr-4 py-1 flex items-center gap-2.5 shadow-md border-r border-sky-200/60">
            <div className="relative w-5 h-5 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-600 animate-spin-slow"></div>
              <Megaphone className="w-3 h-3 text-slate-900" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-900 border-l border-sky-300 pl-2">
              Exam Alert
            </span>
          </div>

          <div className="whitespace-nowrap flex overflow-hidden pl-40">
            <div className="animate-marquee flex items-center gap-12 font-bold text-xs text-slate-900 tracking-wide">
              <span>{announcementText}</span>
              <span className="text-sky-400">•</span>
              <span>{announcementText}</span>
              <span className="text-sky-400">•</span>
              <span>{announcementText}</span>
              <span className="text-sky-400">•</span>
              <span>{announcementText}</span>
            </div>
          </div>
        </div>

        <main className="flex-1 max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-16">
          <div className="relative rounded-[3rem] bg-gradient-to-br from-blue-700 via-indigo-600 to-sky-500 text-white p-8 md:p-16 shadow-2xl shadow-blue-500/20 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide text-blue-100">
                <Sparkles className="w-3.5 h-3.5 text-sky-200" /> Unified Educational Architecture
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Smart Academic Management for Students & Faculty
              </h1>

              <p className="text-blue-100/90 text-sm md:text-base leading-relaxed max-w-2xl font-normal">
                CampusHub eliminates disjointed campus portals by combining real-time timetable tracking, automated attendance logging, and course assessment grading into one responsive ecosystem.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => navigate('/auth')}
                  className="px-8 py-4 bg-white text-blue-700 hover:bg-slate-50 font-bold rounded-2xl shadow-xl transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-95"
                >
                  Launch Portal <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Core Capabilities</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Click any card below to expand detailed operational workflows.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => setActiveModal('schedules')}
                className="group bg-white p-8 rounded-[2.5rem] border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    <Clock className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    Real-Time Timetables
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Interactive lecture schedules, active room directions, and live schedule adjustments.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-blue-600">
                  Explore details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => setActiveModal('assessments')}
                className="group bg-white p-8 rounded-[2.5rem] border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    <BookOpen className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    Grades & Attendance
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Calculated course percentages, attendance tracking, and semester GPA metrics.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-indigo-600">
                  Explore details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => setActiveModal('announcements')}
                className="group bg-white p-8 rounded-[2.5rem] border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="p-4 bg-sky-50 border border-sky-100 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    <Megaphone className="w-7 h-7 text-sky-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                    Faculty Announcements
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Targeted notice publishing for specific departments, sections, and active courses.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-sky-600">
                  Explore details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-white to-blue-50/50 rounded-[3rem] p-8 md:p-12 border border-slate-200/80 shadow-md space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">Designed for Both Portals</h2>
              <p className="text-xs text-slate-500">
                Dedicated feature sets engineered for Students and Faculty members.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Student Portal</h3>
                    <p className="text-xs text-slate-400">Personal Academic Hub</p>
                  </div>
                </div>
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" /> Monitor overall attendance percentage per course
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" /> Access daily lecture schedules and room maps
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" /> View internal assessment scores and overall CGPA
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Faculty Portal</h3>
                    <p className="text-xs text-slate-400">Lecturer Control Workspace</p>
                  </div>
                </div>
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Mark and record section attendance
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Submit test scores and assignment grades
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Publish department notices and news directly
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        {activeModal && featureDetails[activeModal] && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    {featureDetails[activeModal].icon}
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {featureDetails[activeModal].badge}
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 mt-1">
                      {featureDetails[activeModal].title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {featureDetails[activeModal].description}
                </p>

                <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Key Capabilities</h4>
                  <ul className="space-y-2">
                    {featureDetails[activeModal].highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setActiveModal(null);
                    navigate('/auth');
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold rounded-2xl text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                >
                  Go to Portal Login <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-slate-200/80 text-center text-xs text-slate-400">
          CampusHub Higher Education Portal • Built with React & Node.js
        </footer>
      </div>
    </>
  );
}
