import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion:"2024-12-01",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.SANITY_VIEWER_TOKEN,
  stega: {
    studioUrl: process.env.NODE_ENV === 'production'
    ? `https://${process.env.VERCEL_URL}/studio`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,

  },
  
})
