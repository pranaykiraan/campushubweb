import React, { useState } from 'react';
import { BookOpen, Award, TrendingUp, Calculator, CheckCircle2 } from 'lucide-react';

export default function GradesCalculator() {
  const [courses, setCourses] = useState([
    { id: 'BCA-501', title: 'Web Architecture', credits: 4, internalMarks: 22, maxInternal: 25, examGrade: 85, targetGrade: 85 },
    { id: 'BCA-502', title: 'Database Systems', credits: 4, internalMarks: 20, maxInternal: 25, examGrade: 78, targetGrade: 78 },
    { id: 'BCA-503', title: 'Cloud Computing', credits: 3, internalMarks: 24, maxInternal: 25, examGrade: 90, targetGrade: 90 },
    { id: 'BCA-504', title: 'Cyber Security', credits: 3, internalMarks: 19, maxInternal: 25, examGrade: 72, targetGrade: 72 },
  ]);

  // Convert raw percentage (0-100) to 4.0 GPA scale grade point
  const getGradePoint = (mark) => {
    if (mark >= 90) return 4.0;
    if (mark >= 80) return 3.5;
    if (mark >= 70) return 3.0;
    if (mark >= 60) return 2.5;
    if (mark >= 50) return 2.0;
    return 0.0;
  };

  const handleTargetChange = (id, value) => {
    const val = Math.min(100, Math.max(0, Number(value) || 0));
    setCourses(prev => prev.map(c => c.id === id ? { ...c, targetGrade: val } : c));
  };

  // Calculate Current vs Projected CGPA
  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
  const currentWeightedPoints = courses.reduce((acc, c) => acc + (getGradePoint(c.examGrade) * c.credits), 0);
  const currentGPA = (currentWeightedPoints / totalCredits).toFixed(2);

  const projectedWeightedPoints = courses.reduce((acc, c) => acc + (getGradePoint(c.targetGrade) * c.credits), 0);
  const projectedGPA = (projectedWeightedPoints / totalCredits).toFixed(2);

  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100 text-slate-800 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs tracking-wide uppercase">
            <BookOpen className="w-4 h-4" /> Academic Transcript & Projection
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mt-1">Course Grades & Target GPA Calculator</h2>
        </div>

        <div className="flex items-center gap-3 bg-blue-50/80 px-4 py-2.5 rounded-2xl border border-blue-100">
          <Award className="w-5 h-5 text-blue-600" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Current Semester GPA</span>
            <div className="text-lg font-black text-blue-700">{currentGPA} / 4.00</div>
          </div>
        </div>
      </div>

      {/* Target Simulator Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1">
          <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Interactive Simulator
          </span>
          <h3 className="text-xl font-bold mt-2">Projected CGPA Goal</h3>
          <p className="text-blue-100 text-xs">Adjust expected course scores below to simulate your final semester CGPA target.</p>
        </div>

        <div className="bg-white/15 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 text-center min-w-[160px]">
          <span className="text-[10px] uppercase font-semibold text-blue-100">Simulated Target GPA</span>
          <div className="text-3xl font-black mt-1">{projectedGPA}</div>
        </div>
      </div>

      {/* Course Grade Ledger Table */}
      <div className="overflow-x-auto border border-slate-100 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-3.5 px-4">Course ID</th>
              <th className="py-3.5 px-4">Subject Name</th>
              <th className="py-3.5 px-4 text-center">Credits</th>
              <th className="py-3.5 px-4 text-center">Internal Marks</th>
              <th className="py-3.5 px-4 text-center">Current Score (%)</th>
              <th className="py-3.5 px-4 text-center">Simulated Score (%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-4 px-4 font-mono font-medium text-slate-500">{course.id}</td>
                <td className="py-4 px-4 font-bold text-slate-800">{course.title}</td>
                <td className="py-4 px-4 text-center font-semibold">{course.credits}</td>
                <td className="py-4 px-4 text-center font-medium">
                  <span className="text-blue-600 font-bold">{course.internalMarks}</span> / {course.maxInternal}
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-2.5 py-1 bg-slate-100 font-bold rounded-lg text-slate-800">
                    {course.examGrade}%
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={course.targetGrade}
                      onChange={(e) => handleTargetChange(course.id, e.target.value)}
                      className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg font-bold text-center text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-[11px] text-slate-400 font-semibold">%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}