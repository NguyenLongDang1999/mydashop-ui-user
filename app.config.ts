export default defineAppConfig({
    ui: {
        primary: 'blue',
        breadcrumb: {
            label: 'capitalize'
        },
        formGroup: {
            label: {
                base: 'capitalize'
            }
        },
        accordion: {
            item: {
                padding: 'p-0'
            }
        },
        modal: {
            container: 'items-center'
        },
        table: {
            thead: 'capitalize',
            default: {
                emptyState: {
                    icon: 'i-heroicons-face-frown',
                    label: 'Không tìm thấy kết quả nào!'
                }
            }
        },
        notifications: {
            position: 'top-0 end-0',
            width: 'w-full sm:w-80'
        }
    }
})
