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

// Middleware
app.use(express.json());
app.use(cors());

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
