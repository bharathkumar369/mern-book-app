import express from "express";
import { mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import Book from "./models/bookModel.js";


const app = express();

const port = 5500;

app.use(express.json());

app.get("/", (req,res)=>{
    // console.log(req);
    return res.status(234).send("welcome to MERN-BOOK-APP")
})

// Router for save a new book
app.post("/books",async(req,res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:"Send all required fields:title, author, publish Year"
            });
        }
        const newBook = {
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        }
        const book = await Book.create(newBook);
        
        return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

//Route to get all books from database

app.get("/books",async(req,res)=>{
    try {
        const books  = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data:books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
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