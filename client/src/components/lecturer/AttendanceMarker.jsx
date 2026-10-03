import React, { useState } from 'react';
import { Users, CheckCircle2, XCircle, Clock, Save, Search, Filter, ShieldAlert } from 'lucide-react';

export default function AttendanceMarker() {
  const [selectedCourse, setSelectedCourse] = useState('BCA-501');
  const [selectedSection, setSelectedSection] = useState('Sec A');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample student roster state
  const [students, setStudents] = useState([
    { id: 'STU101', name: 'Alex Rivers', roll: '24BCA01', status: 'present' },
    { id: 'STU102', name: 'Ananya Sharma', roll: '24BCA02', status: 'present' },
    { id: 'STU103', name: 'David Miller', roll: '24BCA03', status: 'absent' },
    { id: 'STU104', name: 'Priya Patel', roll: '24BCA04', status: 'present' },
    { id: 'STU105', name: 'Rahul Verma', roll: '24BCA05', status: 'late' },
    { id: 'STU106', name: 'Sophia Chen', roll: '24BCA06', status: 'present' },
    { id: 'STU107', name: 'Vikram Rao', roll: '24BCA07', status: 'absent' },
  ]);

  const [isSaved, setIsSaved] = useState(false);

  // Toggle status for individual student
  const handleStatusChange = (id, newStatus) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
    setIsSaved(false);
  };

  // Bulk actions
  const markAll = (status) => {
    setStudents(prev => prev.map(student => ({ ...student, status })));
    setIsSaved(false);
  };

  // Filter students based on search input
  const filteredStudents = students.filter(
    s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.roll.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count calculations
  const total = students.length;
  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const lateCount = students.filter(s => s.status === 'late').length;
  const attendanceRate = Math.round(((presentCount + lateCount) / total) * 100);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100 text-slate-800 space-y-6">
      
      {/* Top Header & Section Selector */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs tracking-wide uppercase">
            <Users className="w-4 h-4" /> Class Roster Management
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mt-1">Mark Class Attendance</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="BCA-501">BCA-501: Web Architecture</option>
            <option value="BCA-502">BCA-502: Database Systems</option>
            <option value="BCA-503">BCA-503: Cloud Computing</option>
          </select>

          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Sec A">Section A</option>
            <option value="Sec B">Section B</option>
            <option value="Sec C">Section C</option>
          </select>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Enrolled</p>
          <p className="text-2xl font-extrabold text-slate-800 mt-0.5">{total}</p>
        </div>
        <div className="p-4 bg-green-50/70 rounded-2xl border border-green-100">
          <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Present</p>
          <p className="text-2xl font-extrabold text-green-700 mt-0.5">{presentCount}</p>
        </div>
        <div className="p-4 bg-red-50/70 rounded-2xl border border-red-100">
          <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Absent</p>
          <p className="text-2xl font-extrabold text-red-700 mt-0.5">{absentCount}</p>
        </div>
        <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-100">
          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Attendance Rate</p>
          <p className="text-2xl font-extrabold text-amber-700 mt-0.5">{attendanceRate}%</p>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by student name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => markAll('present')}
            className="px-3.5 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl text-xs font-semibold transition-colors"
          >
            Mark All Present
          </button>
          <button
            type="button"
            onClick={() => markAll('absent')}
            className="px-3.5 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl text-xs font-semibold transition-colors"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Roster Table */}
      <div className="overflow-x-auto border border-slate-100 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-3.5 px-4">Roll No</th>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4">Student ID</th>
              <th className="py-3.5 px-4 text-center">Attendance Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-500">{student.roll}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{student.name}</td>
                  <td className="py-3.5 px-4 text-slate-400">{student.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex justify-center items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'present')}
                        className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all flex items-center gap-1 ${
                          student.status === 'present'
                            ? 'bg-green-600 text-white shadow-sm shadow-green-500/30'
                            : 'bg-slate-100 text-slate-500 hover:bg-green-50 hover:text-green-600'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Present
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'late')}
                        className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all flex items-center gap-1 ${
                          student.status === 'late'
                            ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                            : 'bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-600'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" /> Late
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'absent')}
                        className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all flex items-center gap-1 ${
                          student.status === 'absent'
                            ? 'bg-red-600 text-white shadow-sm shadow-red-500/30'
                            : 'bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600'
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" /> Absent
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-slate-400">
                  No matching students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Save Submission Action */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
        {isSaved ? (
          <div className="text-xs font-semibold text-green-600 flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-100">
            <CheckCircle2 className="w-4 h-4 text-green-600" /> Attendance recorded and synced successfully!
          </div>
        ) : (
          <p className="text-xs text-slate-400">Review changes before submitting session records.</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold rounded-2xl text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Save className="w-4 h-4" /> Submit Session Attendance
        </button>
      </div>

    </div>
  );
}