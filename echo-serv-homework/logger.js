const winston = require('winston')

const transports = [
    new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
    new winston.transports.File({filename: 'logs/combined.log', level: 'info'})
]

if (process.env.NODE_ENV !== 'production') {
    transports.push(new winston.transports.Console({
        format: winston.format.simple()
    }))
}

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports
})

module.exports = logger