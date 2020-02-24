'use strict'

const db = require('./')
const inquirer = require('inquirer')
const chalk = require('chalk')

const prompt = inquirer.createPromptModule()

async function setup() {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This is going to drop the databse, are you sure ?'
    }
  ])

  if (!answer.setup) {
    return console.log('Nothing happened.')
  }

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'admin',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => console.info(s),
    setup: true
  }
  await db(config).catch(handleFatalError)
  console.log('Success')
  process.exit(0)
}

function handleFatalError(err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

function handleFatalError(err) {
  console.error(`${chalk.red('[Fatal error] ')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
