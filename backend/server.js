import express from "express";
import { mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import Book from "./models/bookModel.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

const port = 5500;

app.use(express.json());
app.use("/books", bookRoutes )

// app.use(cors({
//     origin: "http://localhost:5500",
//     methods: ["GET","POST","PUT","DELETE"],
//     allowedHeaders: ["Content-Type"]
// }))

app.get("/", (req,res)=>{
    // console.log(req);
    return res.status(234).send("welcome to MERN-BOOK-APP")
})



mongoose.connect(mongoDBURL)
    .then(()=> {
        console.log("App connected to Database");
        app.listen(port, () =>{
            console.log(`App is listening on http://localhost:${port}`)
        })        
    })
    .catch((error)=>{
        console.log(error);
    })