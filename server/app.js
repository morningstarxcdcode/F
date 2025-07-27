require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const session = require('express-session');
const compression = require('compression');
const hpp = require('hpp');
const passport = require('./config/passport.config');

const corsOptions = require('./config/cors.config');
const { sessionConfig } = require('./config/redis.config');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                "https://apis.google.com",
                "https://www.google-analytics.com",
            ],
            connectSrc: ["'self'", "https://api.thelaconnect.com"],
            frameSrc: ["'self'", "https://accounts.google.com"],
        },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
}));

// Enable CORS
app.use(cors(corsOptions));

// Data sanitization
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks

// Prevent parameter pollution
app.use(hpp({
    whitelist: ['price', 'rating', 'category']
}));

// Enable compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// Session handling
app.use(session(sessionConfig));

// Standard middleware
app.use(logger('dev'));
app.use(express.json({ limit: '10kb' })); // Body limit is 10kb
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());

// Authentication check middleware
app.use(redirectIfAuthenticated);

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '..', 'client')));

// Routes
// API routes
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// Handle 404s
app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);
});

// Global error handling
app.use(errorHandler);

module.exports = app;
