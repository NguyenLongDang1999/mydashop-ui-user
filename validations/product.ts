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
    short_description: v.string(),
    productCategory: v.object({
        id: v.string(),
        slug: v.string(),
        name: v.string()
    }),
    product_variant_id: v.string(),
    product_type: v.number(),
    isWishlist: v.boolean(),
    price: v.number(),
    special_price: v.number(),
    special_price_type: v.number(),
    selling_price: v.number()
})

export const productCollection = v.object({
    id: v.string(),
    title: v.string(),
    product: v.array(product)
})

export const productVariant = v.object({
    id: v.string(),
    price: v.number(),
    special_price: v.number(),
    special_price_type: v.number(),
    selling_price: v.number(),
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
    isWishlist: v.boolean(),
    product_type: v.number(),
    flashDeal: v.object({
        id: v.string(),
        title: v.string()
    }),
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

export const productRetrieve = v.object({
    id: v.string(),
    sku: v.string(),
    name: v.string(),
    slug: v.string(),
    image_uri: v.string(),
    technical_specifications: v.array(
        v.object({
            title: v.string(),
            content: v.string()
        })
    ),
    short_description: v.string(),
    description: v.string(),
    meta_title: v.string(),
    meta_description: v.string(),
    total_rating: v.number(),
    isWishlist: v.boolean(),
    product_type: v.number(),
    breadcrumb: v.array(
        v.object({
            id: v.string(),
            slug: v.string(),
            name: v.string()
        })
    ),
    flashDeal: v.object({
        id: v.string(),
        title: v.string()
    }),
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

export type IProductRetrieve = v.InferInput<typeof productRetrieve>
