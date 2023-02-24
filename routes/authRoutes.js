import express from "express";
import { prisma } from "../db/index.js";
import jwt from "jsonwebtoken";
import { argon2 } from "argon2";

const router = express.Router(); 

router.post("/signup", async (request, response) => {
    //handle signup
    try{

      const foundUser = await prisma.user.findFirst({
        where: {
          username: request.body.username
        }
      });
      if(foundUser){
        response.status(401).json({
          success: false,
          message: "User already exists"
        });
      } else {
        try{
          const hashedPassword = await argon2.hash(request.body.password);
  
          const newUser = await prisma.user.create({
            data: {
              username: request.body.username,
              password: hashedPassword
            }
          });
          if (newUser){
            response.status(201).json({
              success: true,
              message: "User successfully created!"
            });
          } else {
            response.status(500).json({
              success: false,
              message: "user was not created, something happened"
            })
          }
        }catch(e){
          response.status(500).json({
            success: false,
            message: "user was not created, something happened"
        })
      }
    }
  } catch(e){
    response.status(500).json({
      success: false,
      message: "something went wrong"
      });
    }
  });

//login route
router.post("/signup", async (request, response) => {
    try{
  
      const foundUser = await prisma.user.findFirst({
        where: {
          username: request.body.username
        }
      });
      if(foundUser){
        response.status(401).json({
          success: false,
          message: "User already exists"
        });
      } else {
        try{
          const hashedPassword = await argon2.hash(request.body.password);
  
          const newUser = await prisma.user.create({
            data: {
              username: request.body.username,
              password: hashedPassword
            }
          });
          if (newUser){
            response.status(201).json({
              success: true,
              message: "User successfully created!"
            });
          } else {
            response.status(500).json({
              success: false,
              message: "user was not created, something happened"
            })
          }
        }catch(e){
          response.status(500).json({
            success: false,
            message: "user was not created, something happened"
        })
      }
    }
  } catch(e){
    response.status(500).json({
      success: false,
      message: "something went wrong"
      });
    }
  });
  
export default router;