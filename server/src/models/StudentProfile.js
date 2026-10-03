import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentId: { type: String, required: true, unique: true },
  courseProgram: { type: String, default: 'BCA' },
  department: { type: String, default: 'Computer Science' },
  semester: { type: Number, default: 5 },
  section: { type: String, default: 'A' },
  attendance: { type: String, default: '85%' },
  gpa: { type: String, default: '3.80' }
}, { timestamps: true });

const StudentProfile = mongoose.models.StudentProfile || mongoose.model('StudentProfile', studentProfileSchema);
export default StudentProfile;