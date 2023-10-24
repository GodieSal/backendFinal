const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;


passport.use(
  'local-register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return done(null, false, { message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'Credenciales inválidas' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return done(null, false, { message: 'Credenciales inválidas' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: '54d2724607479c93c848',
      clientSecret: '5027fb806fdd520c09f97c4599b76e1ef628ae61',
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'Usuario no registrado' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

exports.registerUser = passport.authenticate('local-register', {
  successRedirect: '/productos', 
  failureRedirect: '/login', 
});

exports.loginUser = passport.authenticate('local-login', {
  successRedirect: '/productos', 
  failureRedirect: '/login', 
});

exports.githubLogin = passport.authenticate('github', { scope: ['user:email'] });

exports.githubCallback = passport.authenticate('github', {
  successRedirect: '/productos',
  failureRedirect: '/login',
});

exports.handleLogout = (req, res) => {
  req.logout();
  res.redirect('/login');
};
