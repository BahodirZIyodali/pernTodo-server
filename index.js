const express =require("express")
const app=express() 
const cors =require("cors")
const pool =require("./db")

 
// middleware

app.use(cors())
app.use(express.json())


//Router

//create a todo

app.post("/todos",async(req,res)=>{
try {
    const {description}=req.body
    const newTodo=await pool.query(
        "INSERT INTO todo(description)VALUES($1) RETURNING *",[description]
    );
    res.json(newTodo.rows[0])
} catch (error) {
    console.log(error)
}

})

// get all todos

app.get("/todos",async(_,res)=>{
    try {
       const allTodos= await pool.query("SELECT * FROM todo");
       res.json(allTodos.rows)
    } catch (error) {
        console.log(error.message)
    }
})


//get a todo

app.get("/todos/:id",async (req,res)=>{
    try {
       const {id} =req.params;
       const todo=await pool.query("SELECT * FROM todo WHERE todo_id=$1",[id]);
       if (todo.rows.length === 0) {
        res.status(404).send({ message: "Todo not found" });
      } else {
        res.json(todo.rows[0]);
      }  
    } catch (error) {
        console.log(error)
    }
})

//update a todo

app.put("/todos/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {description}=req.body;
        const updateTodo=await pool.query("UPDATE todo SET description =$1 WHERE todo_id =$2",[description,id]);
         if (updateTodo.rowCount === 0) {
            res.status(404).send({ message: "Todo not found" });
          } else {
            res.json({ message: "Todo was  updated" });
          }
        } catch (error) {
                console.log(error)
        }
})
    
//delete a todo

app.delete("/todos/:id", async(req,res)=>{
    try {
        const {id} =req.params;
        const deleteTodo =await pool.query("DELETE FROM todo WHERE todo_id =$1",[id])
        if (deleteTodo.rowCount === 0) {
            res.status(404).send({ message: "Todo not found" });
          } else {
            res.json({ message: "Todo was  deteled" });
          }
    } catch (error) {
        console.log(error)
    }
})

app.listen(port=5000,()=>{
    console.log(`${port}`)
})
