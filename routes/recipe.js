import express from "express";
import { prisma } from "../db/index.js"

const router = express.Router();

//todo
router.get("/", async (request, response) => {
    //Send back all todos

    //tells prisma to talk to database and find stuff
    const allRecipes = await prisma.recipe.findMany({
        where: {
            userId: 1 //find todos where userid is 1
        },
        include: {
            user: true 
        }
    });
    
    //after that, it will send back a response
    response.status(200).json({
        succes: true,
        recipes: allRecipes
    });
})

router.post("/", async (request, response) => {
    //creates a todo
    
    const newRecipe = await prisma.recipe.create({
        data: {
            name: request.body.recipe,
            userId: 1
        }
    });
    console.log(newRecipe);

    response.status(201).json({
        success: true
    });
})

export default router;