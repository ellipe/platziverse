const chalk = require('chalk')

let db = null
let config = {
  logging: function() {}
}

describe('Building testing pattern', () => {
  beforeAll(async () => {
    const setupDatabase = require('../')
    db = await setupDatabase(config)
  })

  test('Agent exists', () => {
    expect(db.Agent).toBeTruthy()
  })
})
