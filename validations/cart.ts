// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema
export const cartForm = v.object({
    id: v.optional(v.string()),
    product_variant_id: v.string(),
    quantity: v.number()
})

export const cartQuantityForm = v.object({
    cart_item_id: v.string(),
    quantity: v.number()
})

// ** Types
export type ICartForm = v.InferInput<typeof cartForm>

export type ICartQuantityForm = v.InferInput<typeof cartQuantityForm>
