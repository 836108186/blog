import { SUPPORTED_LOCALES } from '@/lib/i18n'
import {
  generateMetadata as baseGenerateMetadata,
  generateStaticParams as baseGenerateStaticParams,
} from '../../../tags/[tag]/page'

export async function generateStaticParams() {
  const params = await baseGenerateStaticParams()
  return SUPPORTED_LOCALES.flatMap((locale) => params.map((param) => ({ ...param, locale })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>
}) {
  const awaited = await params
  const { locale: _locale, ...rest } = awaited
  return baseGenerateMetadata({ params: Promise.resolve(rest) })
}

export { default } from '../../../tags/[tag]/page'
