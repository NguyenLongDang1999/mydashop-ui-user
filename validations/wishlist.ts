// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema
export const wishlistSchema = v.object({
    product_id: v.string()
})

// ** Types
export type IWishlistForm = v.InferInput<typeof wishlistSchema>
