import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    const uri = process.env.MONGODB_URI; // Usar la variable de entorno para obtener el URI

    await mongoose.connect(uri, {
    }).then(() => console.log("DB Connected"))
      .catch((error) => console.error("DB Connection Error: ", error));
}
