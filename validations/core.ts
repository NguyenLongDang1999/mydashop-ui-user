// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema
export const paginationSchema = v.object({
    page: v.optional(
        v.number(),
        PAGE.CURRENT
    ),
    pageSize: v.optional(
        v.number(),
        PAGE.SIZE
    )
})

export const aggregationsSchema = v.required(
    v.object({
        aggregations: v.optional(v.number())
    })
)

export const options = v.object({
    id: v.number(),
    label: v.string()
})

export const sortOptions = v.object({
    id: v.string(),
    label: v.string()
})

// ** Types
export type IOptions = v.InferInput<typeof options>

export type ISortOptions = v.InferInput<typeof sortOptions>

export type IPagination = v.InferInput<typeof paginationSchema>

export interface ICrudTableOptions<T> {
    dataTable: T[]
    isFetching: boolean
    dataAggregations: number
}
