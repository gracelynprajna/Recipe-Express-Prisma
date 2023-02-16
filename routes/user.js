import express from "express";
import { prisma } from "../db/index.js";

export default function userRouter(){

    const router = express.Router();

    //localhost:8080/user
    router.get("/", async(request, response) => {

        //gets all the users
        const users = await prisma.user.findMany();

        response.status(200).json({
            success: true, 
            users //gets all the users back
        })
    })

    router.post("/", async(request, response) => {
        
        const user = await prisma.user.create({
            data: {
                username: request.body.username 
            },
        });

        response.status(201).json({
            success: true,
        });
    });


    return router;
}

