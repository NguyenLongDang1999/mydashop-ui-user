export enum ROUTE {
    HOME = 'home',
    SYSTEM_SETTINGS = 'system-settings'
}

export enum IMAGE {
    DEFAULT = '/default.jpg'
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
    ACCESS_TOKEN = 'accessTokenAdmin',
    REFRESH_TOKEN = 'refreshTokenAdmin',
}
