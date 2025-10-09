import { SUPPORTED_LOCALES } from '@/lib/i18n'

import { getBlogPageStaticParams } from '../../../../../(site)/blog/page/[page]/page'

export { default } from '../../../../../(site)/blog/page/[page]/page'

export const generateStaticParams = async () => {
  const baseParams = getBlogPageStaticParams()
  return SUPPORTED_LOCALES.flatMap((locale) => baseParams.map((params) => ({ ...params, locale })))
}
