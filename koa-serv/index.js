const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const end = Date.now()
    console.log(ctx.path, end - start)
})

app.use(async (ctx, next) => {
    ctx.body = 'Hello, World!';
})

app.listen(3000)