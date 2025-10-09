import { SUPPORTED_LOCALES } from '@/lib/i18n'

import { getTagStaticParams } from '../../../../(site)/tags/[tag]/page'

export { generateMetadata, default } from '../../../../(site)/tags/[tag]/page'

export const generateStaticParams = async () => {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    getTagStaticParams(locale).map((params) => ({ ...params, locale }))
  )
}
