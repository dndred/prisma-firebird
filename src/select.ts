import { sqlifyWhere, whereSchema } from './where'
import { z } from 'zod'
import { columnRefSchema } from './columnRef'

export const selectSchema = z.object({
  type: z.literal('select'),
  columns: z.array(
    z.object({
      expr: columnRefSchema,
      as: z.string().nullable(),
    }),
  ),
  from: z.array(
    z.object({
      db: z.string().nullable(),
      table: z.string(),
    }),
  ),
  where: whereSchema.nullable(),
})

type Select = z.infer<typeof selectSchema>

export const sqlifySelect = (ast: Select) => {
  const columns = ast.columns.map((column) => column.expr.column).join(', ')
  const from = ast.from.map((f) => `${f.table}`).join(', ')
  const where = ast.where ? `where ${sqlifyWhere(ast.where)}` : ''
  return `SELECT ${columns} FROM ${from} ${where}`.trim()
}
