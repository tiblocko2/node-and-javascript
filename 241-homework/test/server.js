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

describe('Error handler middleware', () => {
  const startTime = Math.random()
  const endTime = startTime + Math.random()
  const message = uuid()

  afterEach(() => {
    sinon.restore()
  })

  /*
    Этот тест проверяет, что в логи для запроса, завершившегося с ошибкой, записан статус ответа.
  */
  it('HTTP-статус должен быть залогирован', async () => {
    sinon.stub(process.stderr, 'write')
    try {
      await request(app.callback()).get(`/`)
    }
    catch (err) {
      // пропускаес ошибки сервера
      // в этом тесте нам не важно, как завершится запрос
    } finally {
      // проверяем, что в логи записан cтатус ответа! 
      try {
        sinon.assert.calledWith(process.stderr.write, sinon.match(/Передайте строку/))
      } catch (err) {
        throw err
      } finally {
        sinon.restore()
      }
    }
  })

  /*
    Этот тест проверяет, что в ответе на запрос, завершившийся с ошибкой 500, содержится строка
      "Наши специалисты уже работают над устранением ошибки".
  */
  it('Сообщение об ошибке (статус 500) должно быть показано', done => {
    sinon.stub(console, 'error')
    request(app.callback())
      .get(`/?error=500`)
      .expect('Content-Type', /text\/plain/)
      .then(res => {
        expect(res.text).to.match(/Наши специалисты уже работают над устранением ошибки/)
        done()
      })
      .catch(done)
  })

  /*
    Этот тест проверяет, что в ответе на запрос, завершившийся с ошибкой 500, содержится строка
      "Наши специалисты уже работают над устранением ошибки".
  */
  it('Сообщение об ошибке (статус 400) должно быть показано', done => {
    sinon.stub(console, 'error')
    request(app.callback())
      .get(`/error=400`)
      .expect('Content-Type', /text\/plain/)
      .then(res => {
        expect(res.text).to.match(/Ошибка формирования запроса/)
        done()
      })
      .catch(done)
  })
})