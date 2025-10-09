'use client'

import { useI18n } from '@/app/providers/I18nProvider'
import { useRouter, usePathname } from 'next/navigation'

export default function LocaleSwitch() {
  const { locale } = useI18n()
  const router = useRouter()
  const pathname = usePathname()
  const isZh = pathname?.toLowerCase().startsWith('/zh')
  const toggleLocale = () => {
    const nextPath = isZh ? pathname.replace(/^\/zh(-[a-z]{2})?/, '') || '/' : `/zh${pathname}`
    router.push(nextPath)
  }
  return (
    <button
      onClick={toggleLocale}
      className="rounded border px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      aria-label={locale === 'en' ? '切换到中文' : 'Switch to English'}
      title={locale === 'en' ? '切换到中文' : 'Switch to English'}
      type="button"
    >
      {locale === 'en' ? '中文' : 'EN'}
    </button>
  )
}
