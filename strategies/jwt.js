import { createRequire } from "module";
const require = createRequire(import.meta.url);
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET_KEY'; //normally store this in process.env.secret
import db from '../db/queries.js';

export default new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await db.getUser(jwt_payload.username);
    if (user) {
        return done(null, true)
    }
    return done(null, false)
}) 