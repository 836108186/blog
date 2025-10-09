import { genPageMetadata } from 'app/seo'

import TagListing from './TagListing'

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Things I blog about',
})

export default function TagsPage() {
  return <TagListing />
}
