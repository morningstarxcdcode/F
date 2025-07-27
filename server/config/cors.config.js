const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://thelaconnect.com', 'https://www.thelaconnect.com']
        : ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // 24 hours
};

module.exports = corsOptions;
