const jwt = require('jsonwebtoken');

// Check login middleware
const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (!authorization || !authorization.startsWith('Bearer')) {
            throw new Error('Authorization header is missing or malformed');
        }
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'ahhshs');
        const { email, userId } = decoded;
        // Attach decoded data to request object for later use
        req.email = email;
        req.userId = userId;
        // Call next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Authorization failed' });
    }
};

module.exports = checkLogin;
