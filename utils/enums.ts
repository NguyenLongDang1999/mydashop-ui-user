export enum ROUTE {
    HOME = 'home',
    AUTH = 'auth',
    PRODUCT = 'product',
    SYSTEM_SETTINGS = 'system-settings',
    PRODUCT_CATEGORY = 'product-category'
}

export enum IMAGE {
    DEFAULT = '/default.jpg'
}

export enum SPECIAL_PRICE {
    PRICE = 10,
    PERCENT = 20
}

export enum HTTP_CODE {
    CONFLICT = 409,
    UNAUTHORIZED = 401
}

export enum MESSAGE {
    SUCCESS = 'Dữ liệu đã được lưu thành công!',
    ERROR = 'Đã xảy ra lỗi trong quá trình xử lý!',
    DELETE = 'Xóa dữ liệu thành công!',
    CONFLICT = 'Dữ liệu này đã tồn tại trong hệ thống!'
}

export enum AUTH {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
}

export enum PAGE {
    CURRENT = 1,
    SIZE = 12
}
