const express = require('express')
const cors = require('cors')

const app = express()
let quotes = [] //temporary DB

app.use(cors())
app.use(express.json())

// fetch all the quotes
app.get('/api/quotes', (req,res)=>{
    res.json(quotes);
})

// Add new Quote - text and author
app.post('/api/quotes',(req,res)=>{
    const {text,author} = req.body;

    const newQuote = {id:Date.now(), text, author};
    quotes.push(newQuote);
    res.status(200).json(newQuote);
})

app.listen(5001, ()=>{
    console.log("server running at http://localhost:5001")
})