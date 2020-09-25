const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: 'secret',
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        ExtractJwt.fromUrlQueryParameter('auth')
    ])
}

const Auth = function() {
    
    this.jwtFromHeader = ExtractJwt.fromAuthHeaderWithScheme('jwt').token;

    const strategy = new Strategy(params, (payload, done)=> {
      
        if(typeof payload.id !== 'undefined'){
            return done(null, payload);
        }
        return done(null, {
            token: 0
        });
    })

passport.use(strategy);
this.initialize = function(){
    return passport.initialize()
}

    this.authenticate = (req, res, next)=> {
        passport.authenticate('jwt', {session: false}, (a, info)=> {
            
            if(!info){
               return res.status(401).json({
                    message: 'unauthorized'
                })
            }
            req.user = info
            return next()
        })(req, res, next);
    }
}


module.exports = new Auth();