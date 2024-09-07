// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema
export const cartItem = v.object({
    id: v.string(),
    quantity: v.number(),
    product,
    cartItemProductAttribute: v.string()
})

export const cart = v.object({
    id: v.string(),
    cartItem: v.array(cartItem)
})

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

export type ICart = v.InferInput<typeof cart>

export type ICartItem = v.InferInput<typeof cartItem>
