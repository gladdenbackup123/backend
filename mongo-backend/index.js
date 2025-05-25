const express = require('express')
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express()
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/backendDB')
    .then(()=> console.log('MongoDB connected'))
    .catch((err) => console.error('Connection failed: ',err)); 


app.get('/', (req,res)=>{
    res.send('Welcome to the API');
})

app.use('/users',userRoutes); 

app.listen(3000, ()=>{
    console.log('Server running at http://localhost:3000')
})