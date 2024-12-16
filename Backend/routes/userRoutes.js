const express = require('express');
const Attendance = require('../models/Attendance');
const LeaveRequest = require('../models/LeaveRequest');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Mark Attendance
router.post('/attendance', authMiddleware, async (req, res) => {
    const { userId, date, status } = req.body;
    try {
        const existingAttendance = await Attendance.findOne({ userId, date });
        if (existingAttendance) return res.status(400).json({ error: 'Attendance already marked' });

        const attendance = new Attendance({ userId, date, status });
        await attendance.save();
        res.status(201).json({ message: 'Attendance marked' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Submit Leave Request
router.post('/leave', authMiddleware, async (req, res) => {
    const { userId, startDate, endDate, reason } = req.body;
    try {
        const leaveRequest = new LeaveRequest({ userId, startDate, endDate, reason });
        await leaveRequest.save();
        res.status(201).json({ message: 'Leave request submitted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//attendance routes

// Mark attendance
router.post('/mark', authMiddleware, async (req, res) => {
    const { status } = req.body;

    try {
        const existingAttendance = await Attendance.findOne({
            userId: req.user.id,
            date: { $gte: new Date().setHours(0, 0, 0, 0) } // Check for today's date
        });

        if (existingAttendance) {
            return res.status(400).json({ message: 'Attendance already marked for today' });
        }

        const attendance = new Attendance({
            userId: req.user.id,
            status
        });

        await attendance.save();
        res.status(200).json({ message: 'Attendance marked successfully', attendance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get attendance (Admin or User)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const attendance = req.user.role === 'admin'
            ? await Attendance.find().populate('userId', 'username email') // Admin can see all attendance
            : await Attendance.find({ userId: req.user.id }); // Users can only see their attendance

        res.status(200).json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
