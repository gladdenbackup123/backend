const http = require('http')

const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type', 'text/html');    

    if(req.url === '/'){
        res.end('<h1>Home Page</h1>');
    }
    else if(req.url === '/about'){
        res.end('<h1>About Page</h1>');
    }
    else{
        res.end('<h1>404 - Page Not Found</h1>');
    }
})

server.listen(3002, ()=>{
    console.log("Server running at http://localhost:3002");
});
