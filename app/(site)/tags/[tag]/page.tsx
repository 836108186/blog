import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'

const POSTS_PER_PAGE = 5

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

const countsByLocale = tagData as Record<string, Record<string, number>>

export const getTagStaticParams = (locale?: string) => {
  const targetLocale = locale && isLocale(locale) ? locale : DEFAULT_LOCALE
  const tags = countsByLocale[targetLocale] ?? {}
  return Object.keys(tags).map((tag) => ({
    tag: encodeURI(tag),
  }))
}

export const generateStaticParams = async () => {
  return getTagStaticParams()
}

export default async function TagPage(props: {
  params: Promise<{ tag: string; locale?: string }>
}) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const locale = params.locale && isLocale(params.locale) ? params.locale : DEFAULT_LOCALE
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  ).filter((post) => (post.lang ?? 'en').toLowerCase().startsWith(locale))
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
    />
  )
}
