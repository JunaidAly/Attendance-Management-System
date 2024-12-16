const express = require('express');
const Attendance = require('../models/Attendance');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//attendance routes
router.post('/mark', async (req, res) => {
    const { status, userId } = req.body;

    if (!status || !userId) {
        return res.status(400).json({ message: 'Status and user ID are required' });
    }

    try {
        const attendance = new Attendance({
            userId,
            status,
            date: new Date(),
        });

        await attendance.save();

        res.status(200).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        console.error('Error marking attendance:', error.message);
        res.status(500).json({ message: 'Failed to mark attendance' });
    }
});

//verify id
router.get('/verify', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Token verification error:', error.message);
        res.status(401).json({ message: 'Invalid or expired token' });
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