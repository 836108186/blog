import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export function createAboutMetadata(locale?: string) {
  return genPageMetadata({ title: 'About', locale })
}

export const metadata = createAboutMetadata()

export default function Page() {
  const author = (allAuthors.find((p) => p.slug === 'default') ?? allAuthors[0]) as
    | Authors
    | undefined
  if (!author) {
    throw new Error('Author profile "default" is missing. Please add data/authors/default.mdx.')
  }
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
