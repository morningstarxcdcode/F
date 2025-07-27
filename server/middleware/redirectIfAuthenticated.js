const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Check for token in cookies
    const token = req.cookies.token;
    
    if (!token) {
        // No token found
        if (req.originalUrl.includes('/dashboard')) {
            // Trying to access dashboard without being logged in
            return res.redirect('/login.html');
        }
        return next();
    }
    
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        // If trying to access login/register pages while logged in
        if (req.originalUrl === '/login.html' || req.originalUrl === '/register.html') {
            return res.redirect('/dashboard.html');
        }
        
        next();
    } catch (error) {
        // Invalid token
        res.clearCookie('token');
        if (req.originalUrl.includes('/dashboard')) {
            return res.redirect('/login.html');
        }
        next();
    }
};
