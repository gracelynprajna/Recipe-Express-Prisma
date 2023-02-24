import express from "express";
import { prisma } from "../db/index.js";
import jwt from "jsonwebtoken";
import  argon2  from "argon2";




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
router.post("/login", async (req, res) => {

    try {
  
      const foundUser = await prisma.user.findFirst({
        where: {
          username: req.body.username,
        },
      });
  
      if (foundUser) {
        try {
          const verifyPassword = await argon2.verify(
            foundUser.password,
            req.body.password
          );
  
          if (verifyPassword === true) {
            const token = jwt.sign(
              {
                username: foundUser.username,
                id: foundUser.id,
              },
              "thisisasecretkey"
            );
  
            res.status(200).json({
              success: true,
              token,
            });
          } else {
            res.status(401).json({
              success: false,
              message: "wrong username or password",
            });
          }
        } catch (error) {
          res.status(500).json({
            success: false,
            message: "something went wrong",
          });
        }
      }else{
        res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    }
  });
  
export default router;