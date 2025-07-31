import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Posts, Users } from "./DB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar com o MongoDB", error);
  }
};

connectDB();

// Rotas Posts
app.post("/posts", async (req, res) => {
  try {
    const novoPost = await Posts.create(req.body);
    res.status(201).json(novoPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const todosPosts = await Posts.find();
    res.json(todosPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const postDeletado = await Posts.findByIdAndDelete(req.params.id);
    if (!postDeletado) {
      return res.status(404).json({ error: "Post não encontrado" });
    }
    res.json(postDeletado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rotas Users
app.post("/users", async (req, res) => {
  try {
    const novoUsuario = await Users.create(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const usuarios = await Users.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
