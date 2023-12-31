const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const handlebars = require("express-handlebars").create({ defaultLayout: "main" });
const config = require("./dao/config");
const { errorHandler } = require("./middlewares/errorHandler");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const User = require("./models/user");

mongoose
  .connect(config.mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((error) => {
    console.error("Error de conexión a MongoDB:", error);
  });

const authRoutes = require("../routes/authRoutes");
const productRoutes = require("../routes/productRoutes");
const cartRoutes = require("../routes/cartRoutes");

// Agregado para las rutas de usuario
const userRoutes = require("../routes/userRoutes");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Api ecommerce",
      version: "1.0.0",
      description: "Tienda de materiales api.",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);

// Usar el nuevo router para las rutas de usuarios
app.use("/users", userRoutes);

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(
  session({
    secret: config.secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Credenciales inválidas" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Credenciales inválidas" });
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
      clientID: "54d2724607479c93c848",
      clientSecret: "5027fb806fdd520c09f97c4599b76e1ef628ae61",
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {}
  )
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const authController = require("./controllers/authController");
app.get("/register", authController.renderRegister);
app.post("/register", authController.handleRegister);
app.get("/login", authController.renderLogin);
app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
}));
app.get("/auth/github", passport.authenticate("github"));
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
app.get("/logout", authController.handleLogout);

app.use(errorHandler);

const PORT = 3000;
http.listen(PORT, () => {
  console.log("Servidor funcionando en el puerto:", PORT);
});
