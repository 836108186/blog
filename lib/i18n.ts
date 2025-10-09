export const SUPPORTED_LOCALES = ['zh', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'zh'

export function normalizeLocale(input?: string | null): Locale {
  if (!input) return DEFAULT_LOCALE
  const lower = input.toLowerCase()
  return lower.startsWith('zh') ? 'zh' : 'en'
}

export function getLocaleFromPath(pathname?: string | null): Locale {
  if (!pathname) return DEFAULT_LOCALE
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return DEFAULT_LOCALE
  return normalizeLocale(segments[0])
}

export function stripLocaleFromPath(pathname?: string | null): string {
  if (!pathname) return '/'
  const ensured = pathname.startsWith('/') ? pathname : `/${pathname}`
  const segments = ensured.split('/').filter(Boolean)
  if (segments.length === 0) return '/'
  if (SUPPORTED_LOCALES.includes(normalizeLocale(segments[0]))) {
    const rest = segments.slice(1)
    return rest.length ? `/${rest.join('/')}` : '/'
  }
  return ensured
}

export function localizePath(path: string, locale: Locale): string {
  const ensured = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) {
    return stripLocaleFromPath(ensured)
  }
  const withoutLocale = stripLocaleFromPath(ensured)
  if (withoutLocale === '/') {
    return `/${locale}`
  }
  return `/${locale}${withoutLocale}`
}
