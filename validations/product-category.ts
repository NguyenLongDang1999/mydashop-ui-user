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

// ** Types
export type IProductCategoryBreadcrumb = v.InferInput<typeof productCategoryBreadcrumb>

export type IProductCategory = v.InferInput<typeof productCategory>
