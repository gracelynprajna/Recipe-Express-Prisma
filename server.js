import express from "express";
import todoRouter from "./routes/todo.js";

export default function createServer(){
    const app = express();

    app.use(express.json());

    app.use("/recipe", recipeRouter)

    return app;
}