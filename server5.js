const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req,res)=>{
    let filePath = "";

    if (req.url == '/' || req.url == '/home'){
        filePath = path.join(__dirname, 'home.html');
        res.statusCode = 200;
    }
    else if (req.url == '/about'){
        filePath = path.join(__dirname, 'about.html');
        res.statusCode = 200;
    }
    else{
        filePath = path.join(__dirname, 'notFound.html');
        res.statusCode = 404;
    }

    res.setHeader('Content-Type', 'text/html');

    fs.readFile(filePath, (err,content) => {
        if (err){
            res.end('<h1>Error Loading Page!</h1>');
        }
        else{
            res.end(content);
        }
    })
    
});

server.listen(3000, () =>{
    console.log("Server running at http://localhost:3000")
})