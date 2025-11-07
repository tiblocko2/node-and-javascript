/**
 * Logs given arguments to the standard output
 * 
 * @returns {undefined}
 */
function log() {
  return console.log(new Date(), ...arguments)
}

module.exports = async function logger(ctx, next) {
  const start = Date.now();
  /*
    Это хорошее место, чтобы добавить в логи сведения о входящем запросе.
    Используйте функцию `log`, чтобы вывести логи в стандартный поток вывода.
    Например, log({ method: ctx.method }) запишет в логи HTTP-метод входящего запроса.
  */
  log({
    method: ctx.method,
    url: ctx.url

    /*
      TODO:
        Добавьте в логи запись, содержащую следующие сведения:
        * HTTP-метод входящего запроса
        * URL-адрес входящего запроса
    */
  })

  try{
    await next();
    const duration = Date.now() - start;

    log({
      method: ctx.method,
      url: ctx.url,
      duration
    })
  } catch (error) {
    log({
      method: ctx.method,
      url: ctx.url,
      error
    })
  }
  /*
    TODO:
      Добавьте в логи запись, содержащую следующие сведения:
      * HTTP-метод входящего запроса
      * URL-адрес входящего запроса
      * длительность обработки запроса (duration)

    ВАЖНО:
      Обязательно используйте функцию log для записи логов, иначе автоматические тесты могут не сработать!
      Учтите, что запись о запросе должна быть добавленя в логи, даже если запрос завершился с ошибкой.

    Подсказкка:
      Используйте блок try {...} finally {...} вокруг вызова следующего middleware,
      чтобы вывести логи даже в случае ошибки
  */
}