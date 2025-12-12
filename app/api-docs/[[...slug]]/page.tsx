import { redirect, notFound } from 'next/navigation'
import ApiReference from '../../../components/ApiReference'

const VALID_SLUGS = ['jolli']

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['jolli'] }
  ]
}

export default async function ApiDocsPage(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const slugArray = params.slug || []

  // No slug provided - redirect to first API doc
  if (slugArray.length === 0) {
    redirect('/api-docs/jolli')
  }

  const slug = slugArray[0]

  // Invalid slug - return 404
  if (!VALID_SLUGS.includes(slug)) {
    notFound()
  }

  return <ApiReference slug={slug} />
}
