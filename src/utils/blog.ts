import readingTime from 'reading-time'
import type { CollectionEntry } from 'astro:content'

export function getReadingTime(post: CollectionEntry<'blog'>) {
  // Get the raw content from the post body
  const content = post.body
  const stats = readingTime(content)
  return stats.text
}

export function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}
