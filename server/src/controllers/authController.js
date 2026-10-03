import StudentProfile from '../models/StudentProfile.js';
import LecturerProfile from '../models/LecturerProfile.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Registration Handler
export const registerUser = async (req, res) => {
  try {
    const { email, password, role, fullName, studentId, teacherId, courseProgram, department, designation, invitationCode } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role, fullName });

    if (role === 'student') {
      await StudentProfile.create({ user: user._id, studentId, courseProgram, department });
    } else {
      await LecturerProfile.create({ user: user._id, teacherId, department, designation, invitationCode });
    }

    res.status(201).json({ success: true, message: 'Account created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Handler
export const loginUser = async (req, res) => {
  try {
    const { identifier, password, role } = req.body;

    let profile;
    if (role === 'student') {
      profile = await StudentProfile.findOne({ studentId: identifier }).populate('user');
    } else {
      profile = await LecturerProfile.findOne({ teacherId: identifier }).populate('user');
    }

    if (!profile) return res.status(404).json({ message: 'Invalid ID or Credentials' });

    const isMatch = await bcrypt.compare(password, profile.user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const token = jwt.sign({ id: profile.user._id, role: profile.user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    res.json({
      role: profile.user.role,
      token,
      profile: {
        fullName: profile.user.fullName,
        ...(role === 'student' ? {
          studentId: profile.studentId,
          courseProgram: profile.courseProgram,
          department: profile.department,
          semester: profile.semester,
          section: profile.section,
          attendance: profile.attendance,
          gpa: profile.gpa
        } : {
          teacherId: profile.teacherId,
          department: profile.department,
          designation: profile.designation,
          sections: profile.sections
        })
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// In-memory OTP store (Use Redis/MongoDB in production)
const otpStore = new Map();

// 1. Request Password Reset OTP
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No account associated with this email.' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // 10 min expiration

    console.log(`[AUTH SERVICE] Simulated OTP email to ${email}: ${otp}`);

    res.json({
      success: true,
      message: 'OTP sent to your email! (Check server console during testing)',
      demoOtp: otp // Included for easy offline testing
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Verify OTP & Update Password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const record = otpStore.get(email);

    if (!record || record.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP code.' });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    const bcrypt = (await import('bcryptjs')).default;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    otpStore.delete(email);

    res.json({ success: true, message: 'Password updated successfully! Please log in.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};