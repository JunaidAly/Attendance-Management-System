const express = require('express');
const router = express.Router();
const Leave = require('../models/LeaveRequest'); // A Mongoose model for leave requests
const Attendance = require('../models/Attendance'); // A Mongoose model for attendance
const User = require('../models/User'); // A Mongoose model for users
const authMiddleware = require('../middlewares/authMiddleware');

// Submit a leave request
router.post('/leave', authMiddleware, async (req, res) => {
    // const { reason, fromDate, toDate } = req.body;

    // if (!reason || !fromDate || !toDate) {
    //     return res.status(400).json({ error: 'All fields are required.' });
    // }

    try {
        const { userId, reason, fromDate, toDate } = req.body;

        // Validate user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Save leave request
        const leave = new Leave({ userId, reason, fromDate, toDate });
        const savedLeave = await leave.save();

        res.status(201).json({ message: 'Leave request submitted successfully!', data: savedLeave });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error submitting leave request' });
    }
});

// View attendance
router.get('/attendance', authMiddleware, async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find({ userId: req.user.id });
        res.status(200).json({ attendance: attendanceRecords });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve attendance records.' });
    }
});

module.exports = router;
