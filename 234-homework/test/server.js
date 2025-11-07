const { expect } = require('chai')
const request = require('supertest')
const uuid = require('uuid').v4

const { app } = require('../server.js')

describe('HTTP-server', () => {
  it('should return \'message\' attribute from GET-request', done => {
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

  it('should return help string if message is not specified', done => {
    request(app.callback())
      .get('/')
      .expect('Content-Type', /text\/plain/)
      .expect(400)
      .then(res => {
        expect(res.text).to.equal('Передайте строку в параметре message GET-запроса')
        done()
      })
      .catch(done)
  })
})