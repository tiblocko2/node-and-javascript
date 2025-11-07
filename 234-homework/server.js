const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  try {
    ctx.assert(ctx.query.message, 'Передайте строку в параметре message GET-запроса')

    ctx.status = 200
    ctx.body = `${ctx.query.message}`
  } catch (error) {
    ctx.status = 400
    ctx.body = 'Передайте строку в параметре message GET-запроса'
  }
  /* 
    TODO: напишите обработчик запроса.
    
    1. Ответом на запрос к /?message=<text> должна быть строка <text>.
       Статус ортвета - 200 (OK)
    2. Если параметр message не задан, в ответ должна быть выведена подсказка: "Передайте строку в параметре message GET-запроса".
       Статус ответа - 400 (BAD REQUEST)

    Подсказка: используйте ctx.assert, чтобы проверить наличие параметра message
    Подсказка: используйте ctx.query для доступа к параметрам GET-запроса
  */
  
})

module.exports = { app }


