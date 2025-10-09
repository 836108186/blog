import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage({ params }: { params?: { locale?: string } }) {
  const resolvedParams = params ?? {}
  const locale =
    resolvedParams.locale && isLocale(resolvedParams.locale)
      ? resolvedParams.locale
      : DEFAULT_LOCALE
  const allPosts = allCoreContent(sortPosts(allBlogs))
  const localizedPosts = allPosts.filter((post) =>
    (post.lang ?? 'en').toLowerCase().startsWith(locale)
  )
  const pageNumber = 1
  const initialDisplayPosts = localizedPosts.slice(0, POSTS_PER_PAGE * pageNumber)
  const totalPages = Math.max(1, Math.ceil(localizedPosts.length / POSTS_PER_PAGE))
  const pagination = {
    currentPage: pageNumber,
    totalPages,
  }

  return (
    <ListLayout
      posts={localizedPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
