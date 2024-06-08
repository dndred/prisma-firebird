import { Parser } from 'node-sql-parser'
import { sqlify } from './index'
import { astSchema } from './ast-schema'

const sql = `select id, colorname from colors where (id = 1 and colorname = 'red')`
const parser = new Parser()
const ast = parser.astify(sql, {
  database: 'MySQL',
})
console.log(JSON.stringify(ast, null, 2))
// const parsedSchema = astSchema.parse(ast)
// console.log(sqlify(parsedSchema))
