import { useParams } from 'react-router-dom';

export function useSlug() {
  const { slug } = useParams<'slug'>();
  if (!slug) {
    throw new Error('Slug is missing');
  }
  return slug;
}
