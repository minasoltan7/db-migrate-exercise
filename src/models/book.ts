import Client from "../database";

export type Book= {
    readonly id?:number,
    title:string,
    total_pages:number,
    author:string,
    type:string
    summary:string,
}

// books (plural) table in the database, but the book (singular) file for the model?
//  That's because the database table will hold many books, but the model file is defining what a book is for our application. 
// The model is represented as a class, each book row in the database will be an instance of the book model. 
export class BookModel {
    async index(): Promise<Book[]> {
        try {
          const conn = await Client.connect()
          const sql = 'SELECT * FROM books'
          const result = await conn.query(sql)
          conn.release()
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get books. Error: ${err}`)
        }
      }
    
    async show(id:number):Promise <Book[]>{
        try{

            const conn=await Client.connect();
            // the $1 refer to the first argument in the array of argument(s) we pass in the .query() method in line 28
            const sql='SELECT * FROM books WHERE id=($1)';
            const result =await conn.query(sql,[id]);
            conn.release();
            // returning first row in the book table
            return result.rows[0]
        }catch(err){
            throw new Error(`Cant get Book with id=${id}.Error:${err}`)
        }
    }
    async create(b:Book):Promise <Book[]>{
        try{

            const conn=await Client.connect();
            // the $1,$2,$3,$4,$5 refer to the arguments number in the array of argument(s) we pass in the .query() method in line 28
            const sql='INSERT INTO books (title,total_pages,author,type,summary)VALUES($1,$2,$3,$4,$5)';
            const result =await conn.query(sql,[b.title,b.total_pages,b.author,b.type,b.summary]);
            conn.release();
            // returning the row of the book we created
            return result.rows[0]
        }catch(err){
            throw new Error(`Can't create new Book. Error ${err}`)
    
        }
    }
    async destroy(id:number):Promise <Book[]>{
        try{

            const conn=await Client.connect();
            // the $1, refer to the first argument in the array of argument(s) we pass in the .query() method in line 28
            const sql='DELETE FROM book WHERE id=($1)';
            const result =await conn.query(sql,[id]);
            conn.release();
            return result.rows
        }catch(err){
            throw new Error(`Can't delete Book with id=${id}. Error ${err}`)
    
        }
    }
}


