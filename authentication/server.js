const express = require('express')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const app = express();
app.use(express.json());
app.use(cookieParser());

const users = []
const secret = 'key123'

//Register
app.post('/register', async (req,res)=>{
    const {username,password} = req.body;
    const existing =  users.find(u=> u.username === username);

    if (existing) 
        return res.status(400).json('User already exists!')

    const hashed = await bcrypt.hash(password,10)
    users.push({username, password:hashed})
    res.json({message:'User registered'})
})

//Login
app.post('/login', async (req,res)=>{
    const {username,password} = req.body;
    const user =  users.find(u=> u.username === username);
    const passcheck = await bcrypt.compare(password, user.password);

    if (!user || !passcheck)
        return res.status(401).json({error:'Invalid credentials'})

    const token = jwt.sign({username},secret,{expiresIn:'1d'})
    res.cookie('token',token);
    res.json({message:'Login successful'})
})

//Protected Route - Profile 
app.get('/profile', async (req,res)=>{
    const token = req.cookies.token;
    if (!token) 
        return res.status(401).json({error:'Not Logged In'});
    
    const decoded = jwt.verify(token,secret);
    res.json({message:'Access Granted', user: decoded.username});
})

//Logout
app.post('/logout', async (req,res)=>{
    res.clearCookie('token');
    res.json({message:'User Logged Out'})
})


app.listen(3000, ()=> {
    console.log('Running on http://localhost:3000')
})