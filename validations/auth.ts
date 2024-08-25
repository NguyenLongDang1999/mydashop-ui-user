// ** VeeValidate Imports
import * as v from 'valibot'

// ** Label
export const authLabel = {
    email: 'Email',
    password: 'Mật khẩu',
    name: 'Họ và tên',
    phone: 'Số điện thoại',
    confirm_password: 'Nhập lại mật khẩu'
}

// ** Schema
export const authLogin = v.object({
    email: v.pipe(
        v.string(`${authLabel.email} không được bỏ trống.`),
        v.email(`${authLabel.email} không đúng định dạng.`),
        v.nonEmpty(`${authLabel.email} không được bỏ trống.`)
    ),
    password: v.pipe(
        v.string(`${authLabel.password} không được bỏ trống.`),
        v.nonEmpty(`${authLabel.password} không được bỏ trống.`),
        v.minLength(6, `${authLabel.password} phải từ 6 - 20 ký tự.`),
        v.maxLength(20, `${authLabel.password} phải từ 6 - 20 ký tự.`)
    )
})

export const authRegister = v.pipe(
    v.object({
        name: v.pipe(
            v.string(`${authLabel.name} không được bỏ trống.`),
            v.nonEmpty(`${authLabel.name} không được bỏ trống.`),
            v.maxLength(30, `${authLabel.name} quá dài.`)
        ),
        phone: v.optional(v.string()),
        email: v.pipe(
            v.string(`${authLabel.email} không được bỏ trống.`),
            v.email(`${authLabel.email} không đúng định dạng.`),
            v.nonEmpty(`${authLabel.email} không được bỏ trống.`)
        ),
        password: v.pipe(
            v.string(`${authLabel.password} không được bỏ trống.`),
            v.nonEmpty(`${authLabel.password} không được bỏ trống.`),
            v.minLength(6, `${authLabel.password} phải từ 6 - 20 ký tự.`),
            v.maxLength(20, `${authLabel.password} phải từ 6 - 20 ký tự.`)
        ),
        confirm_password: v.pipe(
            v.string(`${authLabel.confirm_password} không được bỏ trống.`),
            v.nonEmpty(`${authLabel.confirm_password} không được bỏ trống.`)
        )
    }),
    v.forward(
        v.partialCheck(
            [['password'], ['confirm_password']],
            input => areValuesEqual(input.password, input.confirm_password),
            `${authLabel.confirm_password} không trùng khớp.`
        ),
        ['confirm_password']
    )
)

export const authForgotPassword = v.object({
    email: v.pipe(
        v.string(`${authLabel.email} không được bỏ trống.`),
        v.email(`${authLabel.email} không đúng định dạng.`),
        v.nonEmpty(`${authLabel.email} không được bỏ trống.`)
    )
})

export const authProfile = v.object({
    id: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    image_uri: v.string(),
    email_verified: v.string()
})

export const authLoginSchema = toTypedSchema(authLogin)

export const authRegisterSchema = toTypedSchema(authRegister)

export const authForgotPasswordSchema = toTypedSchema(authForgotPassword)

// ** Types
export type IAuthLoginForm = v.InferInput<typeof authLogin>

export type IAuthRegisterForm = v.InferInput<typeof authRegister>

export type IAuthForgotPasswordForm = v.InferInput<typeof authForgotPassword>

export type IAuthProfile = v.InferInput<typeof authProfile>
