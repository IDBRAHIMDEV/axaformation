const http = require('http');

const server = http.createServer(function(req, res) {

    if(req.url === '/') {
        res.write('home page');
        res.end();
    }

    if(req.url === '/api/courses') {

        res.write(JSON.stringify(['laravel', 'symfony', 'nodejs', 'vuejs', 'reactjs']));
        res.end();
    }
});

server.on('connection', function(socket) {
    console.log('new Connection...');
})

server.listen(3000);