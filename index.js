const express = require("express");
const session = require("express-session");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const productsRouters = require('./routers/productsRouters');
const handlebars = require("express-handlebars").create({ defaultLayout: "main" });
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const cartsRouters = require('./routers/cartsRouters');
const routerProducts = express.Router();

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('Conexión a MongoDB exitosa');
}).catch(error => {
  console.error('Error de conexión a MongoDB:', error);
});

const products = [];
const todoslosProductos = JSON.parse(fs.readFileSync("./dao/filemanager/productos.json", "utf8"));
products.push(...todoslosProductos);

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use('/api/products', productsRouters);
app.use('/api/cart', cartsRouters);

app.get("/", (req, res) => {
  const cartId = obtenerCartIdAlgunComo(); // Reemplaza esto con cómo obtienes el cartId
  res.render("inicio", { products, cartId });
});

app.get("/ProductosTreal", (req, res) => {
  res.render("ProductosTreal", { products });
});

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

app.post("/api/products", (req, res) => {
  const newProduct = { ...req.body, id: uuidv4() };
  products.push(newProduct);
  fs.writeFileSync("./dao/filemanager/productos.json", JSON.stringify(products), (err) => {
    if (err) {
      throw new Error(err);
    }
  });
  io.emit('updateProducts', products);
  res.json(newProduct);
});

const authController = require('./controllers/authController');
app.get('/register', authController.renderRegister);
app.post('/register', authController.handleRegister);
app.get('/login', authController.renderLogin);
app.post('/login', authController.handleLogin);
app.get('/logout', authController.handleLogout);
app.post("/logout", (req, res) => {
});

const productsController = require('./controllers/productsController');
app.get('/products', productsController.renderProducts);

const PORT = 3000;
http.listen(PORT, () => {
  console.log("servidor funciona en el puerto:", PORT);
});

module.exports = routerProducts;
