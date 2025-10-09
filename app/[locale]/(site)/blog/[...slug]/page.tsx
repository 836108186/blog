import { SUPPORTED_LOCALES } from '@/lib/i18n'

import { getBlogStaticParams } from '../../../../(site)/blog/[...slug]/page'

export { generateMetadata, default } from '../../../../(site)/blog/[...slug]/page'

export const generateStaticParams = async () => {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    getBlogStaticParams(locale).map((params) => ({ ...params, locale }))
  )
}
