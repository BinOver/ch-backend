import 'dotenv/config';
import express from "express";
import session from 'express-session';
import productRouter from "./routes/products.routes.js"
import cartRouter from "./routes/carts.routes.js";
import userRouter from "./routes/users.routes.js";
import sessionRouter from './routes/sessions.routes.js';
import multer from "multer";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import path from "path";
import { ProductManager } from "./controllers/ProductManager.js";
import cookieParser from "cookie-parser";
import cartModel from "./models/carts.model.js";
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
//import FileStorage from "session-file-store";
// import routerProd from "./routes/products.routes.js";
// import routerCarts from "./routes/carts.routes.js";


const PORT = 4000;
const app = express();
const productManager = new ProductManager;
//const fileStorage = FileStorage(session);

//Server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const io = new Server(server);

// Conexion con MongoDB Atlas
mongoose.connect( process.env.MONGO_URL )
.then(async () => {
  console.log("DB conectada")
  // await cartModel.create({})
})
.catch(err => console.log("Error en conexion a MongoDB Atlas: ", err))

// Configuracion multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SIGNED_COOKIE));
app.use(session({
    //store: new fileStorage ({path:'./sessions', ttl:10000,retries:1}),
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 90
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
function auth(req, res, next) {
  console.log(req.session.email)
  if (req.session.email ==='admin@admin.com') {
    return next();
  }else{
    res.send("No se tiene acceso al contenido.");
  }
}
app.engine('handlebars',engine());
app.set('view engine','handlebars');
app.set('views', path.resolve(__dirname, './views'))
const upload = multer({ storage: storage });


//Conexion de Socket.io
io.on("connection", (socket) => {
  console.log("Conecion con socket.io");
  socket.on("newProduct", (prod) =>{
    productManager.addProduct(prod);
    socket.emit("createdProduct", "El producto ha sido creado");
  })
  socket.on("products", async () => {
    const products = await productManager.getProducts();
    socket.emit("listProds", products);
  })
})

//Routes
app.use("/static", express.static(path.join(__dirname, "/public")));
app.use("/realtimeproducts", express.static(path.join(__dirname, "/public")));
app.use("/login", express.static(path.join(__dirname, "/public")));
app.use("/logout", express.static(path.join(__dirname, "/public")));
app.use("/register", express.static(path.join(__dirname, "/public")));
app.use("/login", sessionRouter);
app.use("/logout", sessionRouter);
app.use("/register", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);

//Cookies
app.get('/setCookie',(req,res) => {
  res.cookie('CookieCookie', 'Esto es el valor de una cookie',{maxAge:30000,signed:true}).send('Cookie creada');
});

app.get('/getCookie', (req, res) => {
  res.send(req.signedCookies)
})

//Sessions
app.get('/login2', (req, res) => {
  const{email, password} = req.body;

  if(email === "admin@admin.com" && password === "1234"){
    req.session.email = email;
    req.session.password = password;

    return res.send("Usuario logeado");
  }else{
    return res.send("Usuario Fallido");
  }
})

app.get('/admin', auth,(req,res) => {
  res.send('Sos admin')
})

app.get('/session',(req,res) => {
  if(req.session.counter) {
    req.session.counter++;
    res.send(`Has entrado ${req.session.counter} veces`);
  }else{
    req.session.counter = 1;
    res.send(`Has entrado por primera vez`);
  }
})

app.get('/logout2',(req,res) => {
  req.session.destroy(() => {
    res.send("Has salido de la sesion");
  });
})


//HBS
app.get('/static', async(req,res) => {
  try {
    const prods = await productManager.getProducts();
    console.log(prods)
    res.render("home", {
      rutaCSS: "home.css",
      rutaScript: "home.js",
      titulo: "Productos",
      productos: prods
    })
  }
  catch (err) {
    console.log("Error al obtener los productos: ", err);
  }
});

app.get('/realtimeproducts',async (req,res) => {
  try {
    const prods = await productManager.getProducts();
    res.render("realTimeProducts", {
      rutaCSS: "realTimeProducts.css",
      rutaScript: "realTimeProducts.js",
      titulo: "Productos dinamicos",
    })
  }
  catch (err) {
    console.error("Error al obtener productos: ",err);
  }
});

app.get('/login',async (req,res) => {
  try {
    res.render("login", {
      rutaCSS: "login.css",
      rutaScript: "login.js",
      titulo: "Login",
    })
  }
  catch (err) {
    console.error("Error: ",err);
  }
});

app.get('/logout',async (req,res) => {
  try {
    res.render("logout", {
      rutaCSS: "logout.css",
      rutaScript: "logout.js",
      titulo: "Logout",
    })
  }
  catch (err) {
    console.error("Error: ",err);
  }
});

app.get('/register/user',async (req,res) => {
  try {
    res.render("register", {
      rutaCSS: "register.css",
      rutaScript: "register.js",
      titulo: "Register",
    })
  }
  catch (err) {
    console.error("Error: ",err);
  }
});


app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.status(200).send("Se envio correctamente");
});

