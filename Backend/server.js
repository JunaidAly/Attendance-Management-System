require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const attendanceRoutes = require('./routes/attendanceRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const Leave = require('./routes/leaveRoutes');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaveReq', Leave);

app.use(express.static(path.join(__dirname, "frontend")));
// Catch-all 404 handler (add this at the end)
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});



const createAdminIfNotExists = async () => {
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        const admin = new User({
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: 'admin',
        });
        await admin.save();
        console.log('Admin user created');
    }
};

createAdminIfNotExists();



// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
