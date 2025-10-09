import { ReactNode } from 'react'

import { SUPPORTED_LOCALES, isLocale, normalizeLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  if (!isLocale(params.locale)) {
    notFound()
  }
  const normalized = normalizeLocale(params.locale)
  if (!SUPPORTED_LOCALES.includes(normalized)) {
    notFound()
  }
  return <>{children}</>
}
