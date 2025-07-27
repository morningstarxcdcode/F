const Redis = require('ioredis');
const session = require('express-session');
const RedisStore = require('connect-redis').default;

// Initialize Redis client
const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
});

// Redis store configuration
const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'thelaconnect:',
});

// Session configuration
const sessionConfig = {
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    },
};

module.exports = { sessionConfig, redisClient };
