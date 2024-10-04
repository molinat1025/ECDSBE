import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;  // Heroku usará process.env.PORT, para desarrollo local usa 4000
// Lista de orígenes permitidos
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174', // Frontend administrativo en localhost
    'https://dsecommerce-pg2-b83249af3924.herokuapp.com' // Frontend de clientes en Heroku
  ];

// Middleware
app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
      // Permitir solicitudes sin origen (como Postman o cURL)
      if (!origin) return callback(null, true);
  
      // Verifica si el origen está permitido
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'El CORS policy no permite acceso desde este origen.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Si necesitas enviar cookies o autorizaciones
  }));

// DB connection
connectDB();

// API endpoints 
app.use("/api/product", productRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get('/', (req, res) => {
    res.send("API IS WORKING");
});

// Server listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
