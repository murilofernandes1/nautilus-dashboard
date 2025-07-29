import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import VendaMensal from "./VendaMensal.js";

dotenv.config();



const app = express();
const PORT = 3000;

app.use(express.json());

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao MongoDB")
        
    } catch (error) {
        console.log("Erro ao conectar com o MongoDB" , error)
    }
    
};

connectDB()

app.post("/vendas", async (req, res) => {

    try {

        const novaVendaMensal = await VendaMensal.create(req.body);
        res.json(novaVendaMensal);
        
    } catch (error) {
        res.json({error: error})
    }
}),
    
app.get("/vendas", async (req, res) => {

    try {

        const vendasMensais = await VendaMensal.find();
        res.json(vendasMensais)
        
    } catch (error) {
        
        res.json({error: error})
    }
}),

app.put("/vendas/:id", async (req, res) => {

    try {

        const novaVendaMensal = await VendaMensal.findByIdAndUpdate(req.params.id, req.body, {new:true} );
        res.json({novaVendaMensal})

    } catch (error) {
        
        res.json({error: error})
    }
}),
app.delete("/vendas/:id", async (req, res) => {

    try {

        const vendaMensalExcluida = await VendaMensal.findByIdAndDelete(req.params.id, req.body, {new:true} );
        res.json({vendaMensalExcluida})

    } catch (error) {
        
        res.json({error: error})
    }
}),

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});