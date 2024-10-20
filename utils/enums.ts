export enum ROUTE {
    HOME = 'home',
    CART = 'cart',
    AUTH = 'auth',
    PRODUCT = 'product',
    SYSTEM_SETTINGS = 'system-settings',
    PRODUCT_CATEGORY = 'product-category',
    WISHLIST = 'wishlist',
}

export enum IMAGE {
    DEFAULT = '/18.jpg'
}

export enum SPECIAL_PRICE {
    PRICE = 10,
    PERCENT = 20
}

export enum HTTP_CODE {
    CONFLICT = 409,
    UNAUTHORIZED = 401
}

export enum PRODUCT_TYPE {
    SINGLE = 10,
    VARIANT = 20
}

export enum MESSAGE {
    SUCCESS = 'Dữ liệu đã được lưu thành công!',
    ERROR = 'Đã xảy ra lỗi trong quá trình xử lý!',
    DELETE = 'Xóa dữ liệu thành công!',
    CONFLICT = 'Dữ liệu này đã tồn tại trong hệ thống!',
    WISHLISTS_CREATE = 'Sản phẩm đã được thêm vào danh sách yêu thích!',
    WISHLISTS_DELETE = 'Sản phẩm đã được xoá khỏi danh sách yêu thích!',
    CART_CREATE = 'Sản phẩm đã được thêm vào giỏ hàng!',
    CART_DELETE = 'Sản phẩm đã được xoá khỏi giỏ hàng!'
}

export enum AUTH {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
}

export enum PAGE {
    CURRENT = 1,
    SIZE = 12
}

export enum ROUTER {
    HOME = '/',
    AUTH_LOGIN = '/dang-nhap',
    SHOP = '/cua-hang',
    CHECKOUT = 'thanh-toan',
    USERS_OVERVIEW = '/thong-tin-tai-khoan',
    USERS_ORDER_HISTORY = '/thong-tin-tai-khoan/lich-su-don-hang',
    USERS_CHANGE_PASSWORD = '/thong-tin-tai-khoan/doi-mat-khau',
    USERS_WISHLIST = '/thong-tin-tai-khoan/san-pham-yeu-thich'
}
