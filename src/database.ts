import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Intenta conectar a la base de datos usando la URI de Mongo en las variables de entorno
    await mongoose.connect(process.env.MONGO_URI ?? "");
    console.log("MongoDB connected"); // Confirmación exitosa de conexión
  } catch (error) {
    // Si falla la conexión, muestra el error y termina el proceso con código 1 (error)
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB; // Exporta la función para usarla en el servidor principal
