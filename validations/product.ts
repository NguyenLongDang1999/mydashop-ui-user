// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema
export const product = v.object({
    id: v.string(),
    slug: v.string(),
    name: v.string(),
    image_uri: v.string(),
    flashDeal: v.object({
        id: v.string(),
        title: v.string()
    }),
    total_rating: v.number(),
    productCategory: v.object({
        id: v.string(),
        slug: v.string(),
        name: v.string()
    }),
    price: v.string(),
    special_price: v.string(),
    special_price_type: v.number()
})

export const productCollection = v.object({
    id: v.string(),
    title: v.string(),
    product: v.array(product)
})

export const productVariant = v.object({
    id: v.string(),
    price: v.string(),
    special_price: v.string(),
    special_price_type: v.number(),
    productVariantAttributeValues: v.array(
        v.object({
            productAttributeValues: v.object({
                id: v.string(),
                value: v.string(),
                productAttribute: v.object({
                    id: v.string(),
                    name: v.string()
                })
            })
        })
    )
})

export const flashDealProduct = v.object({
    id: v.string(),
    sku: v.string(),
    slug: v.string(),
    name: v.string(),
    image_uri: v.string(),
    total_rating: v.number(),
    short_description: v.string(),
    productBrand: v.object({
        id: v.string(),
        slug: v.string(),
        name: v.string()
    }),
    productCategory: v.object({
        id: v.string(),
        slug: v.string(),
        name: v.string()
    }),
    productImages: v.array(
        v.object({
            image_uri: v.string()
        })
    ),
    productAttributes: v.array(
        v.object({
            id: v.string(),
            name: v.string(),
            product_attribute_values: v.array(
                v.object({
                    id: v.string(),
                    value: v.string()
                })
            )
        })
    ),
    productVariants: v.array(productVariant)
})

export const productFlashDeals = v.object({
    id: v.string(),
    title: v.string(),
    flashDealProducts: v.array(flashDealProduct)
})

// ** Types
export type IProduct = v.InferInput<typeof product>

export type IProductCollection = v.InferInput<typeof productCollection>

export type IProductFlashDeals = v.InferInput<typeof productFlashDeals>

export type IFlashDealProduct = v.InferInput<typeof flashDealProduct>

export type IProductVariant = v.InferInput<typeof productVariant>
