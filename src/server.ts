import express ,{Request,Response} from "express" ;
import cors from "cors";
import bodyParser from "body-parser"
import book_routes from "./handlers/book";
import users_routes from "./handlers/users";

const app =express()
app.use(bodyParser.json())


app.get("/",(req:express.Request,res:express.Response)=>{
    res.send("Our main route is working")
})


book_routes(app)
users_routes(app)

app.listen(process.env.HOST,()=>{
console.log(`App is running on port ${process.env.HOST}`)
    })


