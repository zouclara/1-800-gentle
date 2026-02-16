export function generateSlug(title: string): string {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return baseSlug;
}

export function generateUniqueSlug(title: string): string {
  const baseSlug = generateSlug(title);
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${baseSlug}-${randomSuffix}`;
}

export async function ensureUniqueSlug(
  title: string,
  checkExists: (slug: string) => Promise<boolean>
): Promise<string> {
  let slug = generateSlug(title);
  const exists = await checkExists(slug);
  
  if (exists) {
    slug = generateUniqueSlug(title);
  }
  
  return slug;
}
