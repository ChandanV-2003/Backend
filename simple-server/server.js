const http = require('http');
const port = 3000;
const server = http.createServer((request, response) => {
    // requestListner - this only gets called, whenever a request is made to the server
    if(request.url == '/'){
        response.end('Welcome to the website');
    } else if(request.url == '/about'){
        response.end('Banglore based company');
    } else if(request.url == '/contact'){
        response.end('Email: company@gmail.com');
    } else if(request.url == '/users'){
        const users = [
            { id: 1, name: 'jeevan'},
            { id: 2, name: 'ron'}
        ];
        response.end(JSON.stringify(users));
    } else {
        response.end('page not found')
    }
});



server.listen(port,()=>{
    console.log('server running on port' + port);
});