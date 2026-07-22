import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

/** The four content lanes. Three agency pillars plus the med spa lane. */
export type Pillar = 'manual-work' | 'preparation' | 'agency-economics' | 'med-spa'

export type PostMeta = {
  slug: string
  title: string
  description: string
  pillar: Pillar
  datePublished: string
  dateModified: string
  takeaways: string[]
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

/** Files that are scaffolding, not articles. */
function isArticleFile(filename: string): boolean {
  return filename.endsWith('.mdx') && !filename.startsWith('_')
}

/** Coerce raw frontmatter into a typed PostMeta, filling the slug from the filename. */
function toPostMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    pillar: (data.pillar as Pillar) ?? 'manual-work',
    datePublished: String(data.datePublished ?? ''),
    dateModified: String(data.dateModified ?? data.datePublished ?? ''),
    takeaways: Array.isArray(data.takeaways) ? data.takeaways.map(String) : [],
  }
}

/**
 * Reads every article in content/blog (ignoring the _template and any other
 * underscore-prefixed scaffolding), newest first. Runs at build time only.
 */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter(isArticleFile)
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data } = matter(raw)
      return toPostMeta(slug, data)
    })

  return posts.sort((a, b) => b.datePublished.localeCompare(a.datePublished))
}

/**
 * Returns a single post's frontmatter and MDX body, or null if the slug does
 * not resolve to an article file. Underscore-prefixed files never resolve.
 */
export function getPost(slug: string): { meta: PostMeta; content: string } | null {
  const filename = `${slug}.mdx`
  if (!isArticleFile(filename)) return null

  const fullPath = path.join(BLOG_DIR, filename)
  if (!fs.existsSync(fullPath)) return null

  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  return { meta: toPostMeta(slug, data), content }
}
