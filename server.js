import express from "express";
import recipeRouter from "./routes/recipe.js";
import userRouter from "./routes/user.js";
import authRoutes from "./routes/authRoutes.js"


export default async function createServer(){
    const app = express();

    app.use(express.json());

    setupJWTStrategy(passport);

    app.use("/auth", authRoutes)

    app.use("/user", userRouter())

    app.use("/recipe", recipeRouter())

    app.get("/protected", passport.authenticate("jwt", {session: false}), function (request, response) {
        console.log(request);
    
        response.status(200).json({
          success: true,
          message: "you're good!!"
        })
      })

    return app;
}