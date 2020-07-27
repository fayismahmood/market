const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const sessionDb = new FileSync('session')

const db = low(adapter)
const sessionDB = low(sessionDb)




exports.db=db
exports.sessionDB=sessionDB
