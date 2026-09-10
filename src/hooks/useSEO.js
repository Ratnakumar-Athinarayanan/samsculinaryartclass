import { useEffect } from 'react';

/**
 * Custom hook to dynamically manage SEO tags (title, description, keywords).
 * Helps search engine indexing and handles misspelled/alternative search queries.
 */
export default function useSEO({ title, description, keywords }) {
  useEffect(() => {
    // 1. Set document title
    if (title) {
      document.title = title;
    }

    // 2. Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    if (description) {
      metaDesc.setAttribute('content', description);
    }

    // 3. Set meta keywords (handles misspellings, spaces, and half-spelled queries)
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    if (keywords) {
      metaKeywords.setAttribute('content', keywords);
    }
  }, [title, description, keywords]);
}
