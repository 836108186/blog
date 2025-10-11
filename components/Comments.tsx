'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import siteMetadata from '@/data/siteMetadata'

interface CommentsProps {
  slug: string
  lang?: string | null
}

export default function Comments({ slug, lang }: CommentsProps) {
  const commentsConfig = siteMetadata.comments
  if (!commentsConfig?.provider) {
    return null
  }

  if (commentsConfig.provider === 'giscus') {
    const normalizedLang = lang?.toLowerCase().startsWith('zh') ? 'zh-CN' : lang ? 'en' : 'zh-CN'
    const giscusConfig = commentsConfig.giscusConfig ?? {}

    return (
      <CommentsComponent
        commentsConfig={{
          ...commentsConfig,
          giscusConfig: {
            ...giscusConfig,
            lang: normalizedLang,
          },
        }}
        slug={slug}
      />
    )
  }

  return <CommentsComponent commentsConfig={commentsConfig} slug={slug} />
}
