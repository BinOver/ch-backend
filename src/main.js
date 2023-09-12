import express from "express";
import routerProd from "./routes/products.routes.js";
import routerCarts from "./routes/carts.routes.js";
import userRouter from "./routes/users.routes.js";
import mongoose from 'mongoose';
import multer from "multer";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import path from "path";
import { ProductManager } from "./controllers/ProductManager.js";


const PORT = 4000;
const app = express();
const productManager = new ProductManager;

//Server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const io = new Server(server);

// Conexion con MongoDB Atlas
mongoose.connect(`mongodb+srv://binover:coderhouse@cluster0.0yn6sgp.mongodb.net/?retryWrites=true&w=majority`)
.then(() => console.log("DB conectada"))
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
app.use("/api/products", routerProd);
app.use("/api/carts", routerCarts);
app.use("/api/users", userRouter);

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

app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.status(200).send("Se envio correctamente");
});

