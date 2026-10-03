import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentId: { type: String, required: true, unique: true },
  courseProgram: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: Number, default: 1 },
  section: { type: String, default: 'A' },
  attendance: { type: String, default: '100%' },
  gpa: { type: String, default: '4.00' }
});

export default mongoose.model('StudentProfile', studentProfileSchema);