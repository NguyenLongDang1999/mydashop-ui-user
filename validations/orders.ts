// ** VeeValidate Imports
import * as v from 'valibot'

// ** Label
export const orderLabel = {
    email: 'Email',
    name: 'Họ và tên',
    phone: 'Số điện thoại',
    address: 'Địa chỉ giao hàng',
    note: 'Ghi chú'
}

// ** Schema
export const orderForm = v.object({
    email: v.pipe(
        v.string(`${orderLabel.email} không được bỏ trống.`),
        v.email(`${orderLabel.email} không đúng định dạng.`),
        v.nonEmpty(`${orderLabel.email} không được bỏ trống.`)
    ),
    name: v.pipe(
        v.string(`${orderLabel.name} không được bỏ trống.`),
        v.nonEmpty(`${orderLabel.name} không được bỏ trống.`)
    ),
    phone: v.pipe(
        v.string(`${orderLabel.phone} không được bỏ trống.`),
        v.nonEmpty(`${orderLabel.phone} không được bỏ trống.`)
    ),
    address: v.pipe(
        v.string(`${orderLabel.address} không được bỏ trống.`),
        v.nonEmpty(`${orderLabel.address} không được bỏ trống.`)
    )
})

export const orderFormSchema = toTypedSchema(orderForm)

// ** Types
export type IOrderForm = v.InferInput<typeof orderForm>
