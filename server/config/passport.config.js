const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

// Passport configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    scope: ['profile', 'email'],
    state: true
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });
        
        if (!user) {
            // Create new user from Google data
            user = new User({
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                googleId: profile.id,
                verified: true
            });
            await user.save();
        } else if (!user.googleId) {
            // Link Google account to existing user
            user.googleId = profile.id;
            user.verified = true;
            await user.save();
        }
        
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

module.exports = passport;
