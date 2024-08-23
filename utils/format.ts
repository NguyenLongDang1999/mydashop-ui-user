export const formatCurrency = (amount: number) => amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

export const formatSellingPrice = (row: IProduct, quantity = 1, isFormat = true) => {
    const formatPrice = Number(row.price)
    const formatSpecialPrice = Number(row.special_price)

    let discount = 0
    let sellingPrice = formatPrice

    switch (row.special_price_type) {
        case SPECIAL_PRICE.PERCENT:
            discount = (formatPrice * formatSpecialPrice) / 100
            sellingPrice = Math.round((formatPrice - discount) / 1000) * 1000
            break

        case SPECIAL_PRICE.PRICE:
            discount = formatSpecialPrice
            sellingPrice = formatPrice - discount
            break
    }

    const totalPrice = sellingPrice * quantity

    return isFormat ? formatCurrency(totalPrice) : totalPrice
}
