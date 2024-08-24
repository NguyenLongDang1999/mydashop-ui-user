// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema
export const systemSettings = v.object({
    key: v.string(),
    value: v.string()
})


export const homeSlider = v.object({
    image_uri: v.string(),
    image_link: v.string()
})

export const metadata = v.object({
    theme_colour: v.string(),
    system: v.array(systemSettings)
})

// ** Types
export type IHomeSlider = v.InferInput<typeof homeSlider>

export type ISystemSettings = v.InferInput<typeof systemSettings>

export type IMetadata = v.InferInput<typeof metadata>
