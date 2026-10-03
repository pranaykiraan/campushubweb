import mongoose from 'mongoose';

const lecturerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teacherId: { type: String, required: true, unique: true },
  department: { type: String, default: 'Computer Science' },
  designation: { type: String, default: 'Senior Lecturer' },
  invitationCode: { type: String },
  sections: { type: String, default: 'Sections A, B, C' }
}, { timestamps: true });

const LecturerProfile = mongoose.models.LecturerProfile || mongoose.model('LecturerProfile', lecturerProfileSchema);
export default LecturerProfile;