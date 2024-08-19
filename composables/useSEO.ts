interface IMetaSEO {
    name: string
    image_uri: string
    meta_title: string
    meta_description: string
    system_website_name: string
    system_website_motto: string
}

export default function (data: IMetaSEO, path: string) {
    // ** useHooks
    const config = useRuntimeConfig()

    // ** Meta SEO
    useHead({
        title: data?.name,
        link: [
            {
                rel: 'canonical',
                href: config.public.domainUrl + path
            }
        ],
        titleTemplate: titleChunk => {
            return titleChunk ? `${titleChunk} · ${data.system_website_motto}` : data.system_website_name
        }
    })

    useServerSeoMeta({
        title: data?.name,
        robots: {
            index: true,
            follow: true
        },
        description: data?.meta_description,
        ogType: 'website',
        ogUrl: config.public.domainUrl + path,
        ogTitle: data?.meta_title,
        ogDescription: data?.meta_description,
        ogImage: getPathImageFile(data?.image_uri),
        ogImageAlt: data?.name,
        twitterTitle: data?.meta_title,
        twitterDescription: data?.meta_description,
        twitterImage: getPathImageFile(data?.image_uri),
        twitterImageAlt: data?.name,
        twitterCard: 'summary'
    })
}
