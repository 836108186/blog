'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Locale = 'en' | 'zh'

type Messages = {
  latest: string
  noPosts: string
  publishedOn: string
  readMore: string
  readMoreAria: string // e.g. Read more: "{title}"
  allPosts: string
  allPostsAria: string
  tags: string
  viewTagged: string // e.g. View posts tagged {tag},
  description:string
}

const messages: Record<Locale, Messages> = {
  en: {
    latest: 'XiaoYan Notes',
    noPosts: 'No posts found.',
    publishedOn: 'Published on',
    readMore: 'Read more →',
    readMoreAria: 'Read more: "{title}"',
    allPosts: 'All Posts →',
    allPostsAria: 'All posts',
    tags: 'Tags',
    viewTagged: 'View posts tagged {tag}',
    description:'Walking and writing, writing and reflecting.'
  },
  zh: {
    latest: '子小言记的的博客',
    noPosts: '暂无文章。',
    publishedOn: '发布于',
    readMore: '阅读全文 →',
    readMoreAria: '阅读全文：《{title}》',
    allPosts: '所有文章 →',
    allPostsAria: '所有文章',
    tags: '标签',
    viewTagged: '查看标签为 {tag} 的文章',
    description:'边走边写，边写边想',
  },
}

type I18nCtx = {
  locale: Locale
  t: (key: keyof Messages, vars?: Record<string, string | number>) => string
  setLocale: (l: Locale) => void
  toggleLocale: () => void
}

const Ctx = createContext<I18nCtx | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('locale')) as Locale | null
    if (saved === 'en' || saved === 'zh') {
      setLocale(saved)
    } else {
      const nav = typeof navigator !== 'undefined' ? navigator.language : 'en'
      setLocale(nav.toLowerCase().startsWith('zh') ? 'zh' : 'en')
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('locale', locale)
  }, [locale])

  const t: I18nCtx['t'] = (key, vars) => {
    const msg = messages[locale][key] as string
    if (!vars) return msg
    return msg.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))
  }

  const value = useMemo<I18nCtx>(
    () => ({
      locale,
      t,
      setLocale,
      toggleLocale: () => setLocale((p) => (p === 'en' ? 'zh' : 'en')),
    }),
    [locale]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

// 新增：默认导出，避免导入方式不一致
export default I18nProvider
