const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
  it('get server at / returns status 200', async () => {
    const res = await request(server)
      .get('/')
    expect(res.status).toEqual(200)
  })
  it('get server at / returns message', async () => {
    const res = await request(server)
      .get('/')
    expect(res.body.message).toEqual('welcome to family secret recipe book')
  })
})

describe('users/router.js runs at /api/users', () => {
   it('get returns status 200 and a response array containing seeded users', async () => {
    const res = await request(server)
      .get('/api/users')
    const users = [
      {user_id: 11, username: 'username11', password: 'password11'},
      {user_id: 12, username: 'username12', password: 'password12'},
      {user_id: 13, username: 'username13', password: 'password13'}
    ]
    const responseUsers = res.body.map( ({user_id, username, password}) => {
      return {user_id, username, password}
    } )
    expect(res.status).toEqual(200)
    expect(responseUsers).toEqual(users)
  })
  it('post returns status 201 and a response of the newUser (ie a registration), with a user_id', async () => {
    const credentials =  {username: 'username10', password: 'password10'}
    const res = await request(server)
      .post('/api/users')
      .send( credentials )
    const { username, password } = res.body
    expect(res.status).toEqual(201)
    expect({username, password}).toEqual(credentials)
    expect(res.body.user_id).toExist()
  })
})

