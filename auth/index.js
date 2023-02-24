import { Strategy, ExtractJwt } from "passport-jwt";

export default async function setupJWTStrategy(passport){
    //takes out data out from our token
    passport.use(new Strategy({
        //gets jwt from request headers
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "thisisasecretkey"
    }, function(payload, done){
        try{
            //no errors, just returning user data
            return done(null, { username: payload.username, id: payload.id });
        } catch(e){
            //it will return an error and not return user data
            return done(e, null);
        }
    }))
}
