import mongoose from 'mongoose';

const lecturerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teacherId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  invitationCode: { type: String, required: true },
  sections: { type: String, default: 'A, B' }
});

export default mongoose.model('LecturerProfile', lecturerProfileSchema);