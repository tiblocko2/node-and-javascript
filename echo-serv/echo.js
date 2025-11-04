const http = require('http');

const port = 2000;

const server = http.createServer((req,res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        protocol: url.protocol,
        hostname: url.hostname,
        prot: url.port,
        pathname: url.pathname,
        search: url.search
    }));

});

server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});