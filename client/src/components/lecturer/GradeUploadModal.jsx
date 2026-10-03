import React, { useState } from 'react';
import { X, FileCheck, Save, CheckCircle2 } from 'lucide-react';

export default function GradeUploadModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [assessmentType, setAssessmentType] = useState('Mid-Term Test');
  const [maxMarks, setMaxMarks] = useState(50);
  const [isSaved, setIsSaved] = useState(false);

  const [grades, setGrades] = useState([
    { id: 'STU101', name: 'Alex Rivers', roll: '24BCA01', score: 42 },
    { id: 'STU102', name: 'Ananya Sharma', roll: '24BCA02', score: 48 },
    { id: 'STU103', name: 'David Miller', roll: '24BCA03', score: 35 },
    { id: 'STU104', name: 'Priya Patel', roll: '24BCA04', score: 45 },
  ]);

  const handleScoreChange = (id, val) => {
    const num = Math.min(maxMarks, Math.max(0, Number(val) || 0));
    setGrades(prev => prev.map(g => g.id === id ? { ...g, score: num } : g));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200 space-y-6">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-100 text-sky-600 rounded-2xl">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Upload Assessment Grades</h3>
            <p className="text-xs text-slate-400">Record internal assessment scores for active course sections.</p>
          </div>
        </div>

        {/* Form Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Assessment Type</label>
            <select
              value={assessmentType}
              onChange={(e) => setAssessmentType(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Mid-Term Test">Mid-Term Test</option>
              <option value="Assignment 1">Assignment 1</option>
              <option value="Assignment 2">Assignment 2</option>
              <option value="Lab Practical">Lab Practical</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Maximum Scale Marks</label>
            <input
              type="number"
              value={maxMarks}
              onChange={(e) => setMaxMarks(Number(e.target.value) || 0)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Score Inputs Table */}
        <div className="overflow-x-auto border border-slate-100 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Roll No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4 text-center">Score ({maxMarks})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {grades.map((student) => (
                <tr key={student.id}>
                  <td className="py-3 px-4 font-mono text-slate-500">{student.roll}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">{student.name}</td>
                  <td className="py-3 px-4 text-center">
                    <input
                      type="number"
                      max={maxMarks}
                      value={student.score}
                      onChange={(e) => handleScoreChange(student.id, e.target.value)}
                      className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-between items-center pt-2">
          {isSaved ? (
            <div className="text-xs font-semibold text-green-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" /> Assessment marks saved and published!
            </div>
          ) : (
            <span className="text-xs text-slate-400">Changes update student transcripts in real time.</span>
          )}

          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold rounded-2xl text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save & Publish Grades
          </button>
        </div>

      </div>
    </div>
  );
}