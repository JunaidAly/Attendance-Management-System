const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User'); // Mongoose User model
const Attendance = require('../models/Attendance');
const Leave = require('../models/LeaveRequest');
const authMiddleware = require('../middlewares/authMiddleware');

// Fetch all users (Admin only)
router.get('/users', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        const users = await User.find({}, { password: 0 }); // Exclude password field for security
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});


// Get all attendance records
router.get('/attendance', authMiddleware, async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.json({ attendance });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch attendance records.' });
    }
});

// Approve/Reject Leave Request
router.put('/leave/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // status: "approved" or "rejected"

    try {
        const leaveRequest = await Leave.findById(id);
        if (!leaveRequest) {
            return res.status(404).json({ message: 'Leave request not found.' });
        }

        leaveRequest.status = status;
        await leaveRequest.save();
        res.json({ message: `Leave request ${status}.` });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update leave request.' });
    }
});
// Generate Reports
router.get('/reports', async (req, res) => {
    const { type } = req.query;

    try {
        if (type === 'attendance') {
            const attendanceRecords = await Attendance.find();
            return res.json({ title: 'Attendance Report', data: attendanceRecords });
        } else if (type === 'leave') {
            const leaveRequests = await Leave.find();
            return res.json({ title: 'Leave Requests Report', data: leaveRequests });
        } else {
            return res.status(400).json({ message: 'Invalid report type' });
        }
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//edit profile


// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

router.post('/profile-picture', upload.single('profilePicture'), async (req, res) => {
    try {
        const adminId = req.user.id; // Assuming authentication middleware populates `req.user`
        const filePath = path.join('/uploads', req.file.filename);

        await Admin.findByIdAndUpdate(adminId, { profilePicture: filePath });

        res.json({ message: 'Profile picture updated successfully', url: filePath });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = router;
