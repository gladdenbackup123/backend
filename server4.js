const http = require('http')

const server = http.createServer((req,res)=>{
    if(req.url=='/api'){
        res.setHeader('Content-Type', 'application/json');    
        const data = {
            message:"Welcome to the API",
            status:"success",
        };
        res.end(JSON.stringify(data));
    }
    else{
        res.setHeader('Content-Type', 'text/plain');  
        res.end('Not a valid API route!') 
    }
    
});

server.listen(3003, ()=>{
    console.log("Server running at http://localhost:3003");
});
