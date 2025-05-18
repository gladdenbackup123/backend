const express = require('express')
const app = express() // Initialize the express app

//Basic routes
app.get('/', (req,res) =>{
    res.send("Hello from Express!")
})

app.get('/about', (req,res) =>{
    res.send("<h1>About Us Page!</h1>")
})

app.get('/contact', (req,res) =>{
    res.send("<h1>Contact Us Page!</h1>")
})

//JSON route
app.get('/api',(req,res)=>{
    res.json({
        success : true,
        data : "Welcome to the JSON API"
    })
})

// Catch all routes
app.use((req,res)=>{
    res.status(404).send('<h1>404 - Page Not Found</h1>')
})

app.listen(3001,()=>{
    console.log("Server running at http://localhost:3001");
})

