export default defineAppConfig({
    ui: {
        primary: 'blue',
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
        }
    }
})
