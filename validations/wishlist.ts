// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema
export const wishlistSchema = v.object({
    product_id: v.string()
})

export const wishlistDataList = v.array(
    v.object({
        id: v.string(),
        product: product
    })
)

// ** Types
export type IWishlistForm = v.InferInput<typeof wishlistSchema>

export type IWishlistDataList = v.InferInput<typeof wishlistDataList>
