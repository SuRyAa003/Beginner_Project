const http = require('http');

const server = http.createServer((req,res)=>{

    console.log(req.url);

    if(req?.url==='/'){
        res.writeHead(200,{"conent-type":"application/json"});
        res.end(`hello`)
    }else if(req?.url==='/text'){
        res.writeHead(200,{"conent-type":"application/json"});
        res.end(`textPage`)
    }else{
        res.writeHead(200,{"conent-type":"application/json"});
        res.end(`404Errorrrrr`)
    }

});
server.listen(1561);