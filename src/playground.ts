import { Parser } from 'node-sql-parser'
import { sqlify } from './index'
import { astSchema } from './ast-schema'

const sql = 'select id, colorname from colors limit 10 offset 5'
const parser = new Parser()
const ast = parser.astify(sql, {
  database: 'MySQL',
})
console.log(JSON.stringify(ast, null, 2))
const parsedSchema = astSchema.parse(ast)
console.log(sqlify(parsedSchema))
