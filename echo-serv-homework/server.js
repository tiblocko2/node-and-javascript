const http = require('http');
const logger = require('./logger');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost`)
  console.log(url.searchParams)
  
  if (url.searchParams.get("message")){
    
    let mess = url.searchParams.get("message");

    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.statusCode = 200
    logger.info(`Message received: ${mess}`)
  }
  else {
    let mess = "Передайте строку в параметре message GET-запроса";
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.statusCode = 400
    logger.error(`${mess}`)
    //res.end(`${mess}`)
  }
  
});

module.exports = { server }
