const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming the User model is in models/User.js

const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;

        // Check if the Authorization header exists
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];

        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user in the database to ensure they still exist
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            // Check if the user's role matches one of the allowed roles
            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
            }

            // Attach the user object to the request for further use
            req.user = user;
            next();
        } catch (error) {
            console.error('Token verification failed:', error.message);
            res.status(401).json({ error: 'Invalid or expired token.' });
        }
    };
};

module.exports = authMiddleware;

