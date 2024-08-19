// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema
export const productCategoryBreadcrumb = v.object({
    id: v.string(),
    slug: v.string(),
    name: v.string()
})

const productCategory = v.object({
    ...productCategoryBreadcrumb.entries,
    description: v.string(),
    parent_id: v.string(),
    image_uri: v.string(),
    defaultOpen: v.optional(v.boolean())
})

// ** Types
export type IProductCategoryBreadcrumb = v.InferInput<typeof productCategoryBreadcrumb>

export type IProductCategory = v.InferInput<typeof productCategory>
