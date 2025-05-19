const express = require('express')
const app = express() // Initialize the express app

app.use(express.json())

let products = [
    {id:1, name:'Laptop'},
    {id:2, name:'Phone'},
    {id:3, name:'Tablet'}
]

// GET all products
app.get('/products', (req,res)=>{
    res.json(products);
})

// GET Product by ID
app.get('/products/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id===id);

    if(!product){
        res.status(404).json({message:'Product not found'});
    }

    res.json(product);
})

//POST - Create new product
app.post('/products',(req,res)=>{
    const {name} = req.body;

    if(!name){
        return res.status(400).json({message:'Product name is required'})
    }

    const newProduct = {
        id:products.length+1,
        name:name,
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
})

// PUT - Update a product
app.put('/products/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const {name} = req.body;
    const product = products.find(p => p.id === id);

    if(!product){
        return res.status(404).json({message:'Product not found'})
    }

    if(!name){
        return res.status(400).json({message:'Product name is required'})
    }

    product.name = name;
    res.json(product);
})

// DELETE - Remove a product
app.delete('/products/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const index = products.findIndex(p=>p.id===id)

    if(index===-1){
        return res.status(404).json({message:'Product not found'})
    }
    products.splice(index,1);
    res.json(({message:'Product deleted successfully.'}));
});


app.listen(3002,()=>{
    console.log("Server running at http://localhost:3002");
})
