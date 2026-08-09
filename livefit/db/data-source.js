require('dotenv').config()
const { DataSource } = require('typeorm')
const Course =require('../entities/Course')
const Skill =require('../entities/Skill')
const User =require('../entities/User')


// ============================================================
// TODO：把你設計的 entity require 進來，然後加進下方的 entities 陣列
//（沒註冊的 entity，migration:generate 看不到它，所以這張資料表就不會被建出來）
// ============================================================

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'student',
  password: process.env.DB_PASSWORD || 'student666',
  database: process.env.DB_DATABASE || 'livefit',

  // ⚠️ 鐵律：synchronize 固定為 false，將 ORM 自動同步結構關閉，避免它動到正式資料；結構一律走 Migration
  synchronize: false,

  entities: [
    // TODO: 你的 entities
      Course,Skill,User
      
  ],
  migrations: ['db/migrations/*.js'],
})

module.exports = { dataSource }
