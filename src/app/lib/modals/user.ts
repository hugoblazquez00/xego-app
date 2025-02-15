import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // En un entorno real, asegúrate de cifrar las contraseñas
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // Puedes agregar más campos según sea necesario
});

const User = models.User || model("User", UserSchema, "users");

export default User; 