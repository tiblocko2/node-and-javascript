const { expect } = require('chai')
const request = require('supertest')
const uuid = require('uuid').v4
const sinon = require('sinon')

const { app } = require('../server.js')

describe('HTTP-server', () => {
  beforeEach(() => {
    sinon.stub(console, 'log')
  })

  afterEach(() => {
    sinon.restore()
  })

  it('Эхо-севрер должен работать', done => {
    const message = uuid()
    request(app.callback())
      .get(`/?message=${message}`)
      .expect('Content-Type', /text\/plain/)
      .expect(200)
      .then(res => {
        expect(res.text).to.equal(message)
        done()
      })
      .catch(done)
  })
})

describe('Logger middleware', () => {
  const startTime = Math.random()
  const endTime = startTime + Math.random()
  const message = uuid()

  beforeEach(() => {
    sinon.stub(Date, 'now')
      .onCall(0)
      .returns(startTime)
      .onCall(1)
      .returns(endTime)
  })

  /*
    Этот тест проверяет, что в стандартный поток вывода для GET-запроса записана строка *GET*,
    где * - это любая последовательность символов
  */
  it('HTTP-метод должен быть залогирован', async () => {
    sinon.stub(process.stdout, 'write')
    try {
      await request(app.callback()).get(`/?message=${message}`)
    }
    catch (err) {
      // пропускаес ошибки сервера
      // в этом тесте нам не важно, как завершится запрос
    } finally {
      // проверяем, что в логи записан метод доступа! 
      try {
        sinon.assert.calledWith(process.stdout.write, sinon.match(/GET/))
      } catch(err) {
        throw err
      } finally {
        sinon.restore()
      }
    }
  })

  /*
    Этот тест проверяет, что в стандартный поток вывода для GET-запроса записана строка вида *<длительность обработки запроса>*,
    где * - это любая последовательность символов
  */
  it('Длительность обработки запроса должна быть залогирована', async () => {
    sinon.stub(process.stdout, 'write')
    try {
      await request(app.callback()).get(`/?message=${message}`)
    }
    catch (err) {
      // пропускаем ошибки сервера
      // в этом тесте нам не важно, как завершится запрос
    } finally {
      // проверяем, что в логи записано время обработки запроса!
      try {
        sinon.assert.calledWith(process.stdout.write, sinon.match(new RegExp(endTime - startTime)))
      } catch(err) {
        throw err
      } finally {
        sinon.restore()
      }
    }
  })

  /*
    Этот тест проверяет, что в стандартный поток вывода для GET-запроса записана строка вида *<URL-адрес запроса>*,
    где * - это любая последовательность символов
  */
  it('URL-адрес должен быть залогирован', async () => {
    sinon.stub(process.stdout, 'write')
    try {
      await request(app.callback()).get(`/?message=${message}`)
    }
    catch (err) {
      // пропускаем ошибки сервера
      // в этом тесте нам не важно, как завершится запрос
    } finally {
      // проверяем, что в логи записано время обработки запроса!
      try {
        sinon.assert.calledWith(process.stdout.write, sinon.match(/\?message/))
      } catch(err) {
        throw err
      } finally {
        sinon.restore()
      }
    }
  })

  /*
    Этот тест проверяет, что логи пишутся даже для запросов, завершенных с ошибкой!
  */
 it('Запрос должен быть залогирован, даже если он завершен с ошибкой', async () => {
  sinon.stub(process.stdout, 'write')
  try {
    await request(app.callback()).get(`/`)
  }
  catch (err) {
    // пропускаем ошибки сервера
    // в этом тесте нам не важно, как завершится запрос
  } finally {
    // проверяем, что в логи записано время обработки запроса!
    try {
      sinon.assert.calledWith(process.stdout.write, sinon.match(new RegExp(endTime - startTime)))
    } catch(err) {
      throw err
    } finally {
      sinon.restore()
    }
  }
})
})