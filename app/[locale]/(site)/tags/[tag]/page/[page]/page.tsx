import { SUPPORTED_LOCALES } from '@/lib/i18n'

import { getTagPageStaticParams } from '../../../../../../(site)/tags/[tag]/page/[page]/page'

export { default } from '../../../../../../(site)/tags/[tag]/page/[page]/page'

export const generateStaticParams = async () => {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    getTagPageStaticParams(locale).map((params) => ({ ...params, locale }))
  )
}
