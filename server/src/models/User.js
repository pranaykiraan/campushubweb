import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'lecturer'], required: true },
  fullName: { type: String, required: true },
}, { timestamps: true });

// Prevent re-declaring the model if it already exists in Mongoose instance
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;