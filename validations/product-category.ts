// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema
export const productCategoryBase = {
    id: v.string(),
    slug: v.string(),
    name: v.string()
}

export const productCategoryBreadcrumb = v.object(productCategoryBase)

export const productCategory = v.object({
    ...productCategoryBreadcrumb.entries,
    description: v.string(),
    parent_id: v.string(),
    image_uri: v.string(),
    children: v.array(v.object(productCategoryBase)),
    defaultOpen: v.optional(v.boolean())
})

export const productCategoryRetrieve = v.object({
    id: v.string(),
    name: v.string(),
    image_uri: v.string(),
    description: v.string(),
    meta_title: v.string(),
    meta_description: v.string(),
    product: product,
    productBrands: v.array(productBrand),
    productAttributes: v.array(productAttribute),
    aggregations: v.number()
})

export const productCategoryFilter = v.object({
    ...paginationSchema.entries,
    sort: v.optional(v.number()),
    productBrands: v.optional(v.array(v.string())),
    productRating: v.optional(v.array(v.string())),
    productAttributes: v.optional(v.array(v.string()))
})

export const productCategoryListShop = v.object({
    ...aggregationsSchema.entries,
    data: product
})

// ** Types
export type IProductCategoryBreadcrumb = v.InferInput<typeof productCategoryBreadcrumb>

export type IProductCategory = v.InferInput<typeof productCategory>

export type IProductCategoryRetrieve = v.InferInput<typeof productCategoryRetrieve>

export type IProductCategoryFilter = v.InferInput<typeof productCategoryFilter>

export type IProductCategoryListShop = v.InferInput<typeof productCategoryListShop>
