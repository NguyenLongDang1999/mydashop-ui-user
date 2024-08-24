// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema
export const productAttribute = v.object({
    id: v.string(),
    name: v.string(),
    product_attribute_values: v.array(
        v.object({
            id: v.string(),
            value: v.string()
        })
    )
})

// ** Types
export type IProductAttribute = v.InferInput<typeof productAttribute>
