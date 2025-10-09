import { SUPPORTED_LOCALES } from '@/lib/i18n'

export const dynamicParams = false

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export { metadata, default } from '../../projects/page'
