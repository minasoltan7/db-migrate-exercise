import express,{Request,Response} from "express";
import { Book, BookModel } from "../models/book";

const books_library = new BookModel()

// handlers functions

// index function to show al items in our database
const index= async(req:express.Request,res:express.Response)=>{
    const all_books=await books_library.index();
    try{
        res.json(all_books)
    }catch(err){

        res.status(400).send(`cant get books .Error :${err}`)
}
}
// Show function to show a specified book in our database

const show= async(req:express.Request,res:express.Response)=>{
    const id:unknown=req.params.id
    const specified_book=await books_library.show(id as number);
    try{
        res.json(specified_book)
    }catch(err){

        res.status(400).send(`Cant get book with id: ${id} .Error :${err}`)
}
}

const create =async(req:express.Request,res:express.Response)=>{
    try{

        const book_spec:Book={
            title: req.body.title,
            total_pages:req.body.total_pages,
            author: req.body.author,
            type: req.body.type,
            summary: req.body.summary,
        }
        const new_book =await books_library.create(book_spec)
        res.json(new_book);
    }catch(err){
        res.status(400).json(err)
    }
}

const destroy =async(req:express.Request,res:express.Response)=>{
    try{
        const id=parseInt(req.params.id);
        const deleted_book =await books_library.destroy(id)
        res.json(deleted_book);
    }catch(err){
        res.status(400).json(err)
    }
}

const book_routes=(app:express.Application)=>{
    app.get("/books",index)
    app.get("/book/:id",show)
    app.post("/newBook",create)
    app.delete("/delete/:id",destroy)
    }


export default book_routes;