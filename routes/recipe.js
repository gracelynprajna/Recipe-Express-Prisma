import express from "express";
import { prisma } from "../db/index.js"

export default function recipeRouter(){
    const router = express.Router();

//updates recipes 
router.put("/:recipeId", async (request, response) => {
    const addRecipe = await prisma.recipe.update({
        where: {
            id: parseInt(request.params.recipeId)
        },
        data: {
            name: request.body.recipe,
            description: request.body.description
        }
    });
    //sends back response if it works 
    response.status(200).json({
        success: true, 
        message: "recipe updated!"
    });
})

router.get("/", async (request, response) => {
    //Send back all recipe

    //tells prisma to talk to database and find stuff
    const allRecipes = await prisma.recipe.findMany({
        where: {
            userId: 1 //find recipe where userid is 1
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
    //creates a recipe
    
    const newRecipe = await prisma.recipe.create({
        data: {
            name: request.body.recipe,
            description: request.body.description,
            userId: 1
        }
    });
    console.log(newRecipe);

    response.status(201).json({
        success: true
    });
});


router.get("/userId/:recipeId", async(request, response) => {
    
    const specificRecipe = await prisma.recipe.findMany({
        where: {
            id: parseInt(request.params.recipeId), //dynamic 
        },
        user: {
            equals: parseInt(request.params.userId) //dynamic 
        }
    })
})

return router;
}