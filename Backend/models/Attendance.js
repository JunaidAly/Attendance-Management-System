const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Optional user ID
    status: { type: String, required: true, enum: ['Present', 'Absent'] },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
