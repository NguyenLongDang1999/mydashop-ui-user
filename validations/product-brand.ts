// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema
export const productBrand = v.object({
    id: v.string(),
    name: v.string()
})

// ** Types
export type IProductBrand = v.InferInput<typeof productBrand>
