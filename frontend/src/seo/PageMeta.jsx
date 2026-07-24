import { useEffect } from 'react';

const SITE_URL = 'https://www.scalora-agency.com';
const SITE_NAME = 'Scalora';

function setMetaTag(attr, key, content) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(path) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', `${SITE_URL}${path}`);
}

export default function PageMeta({ title, description, path = '/' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Growth & Technology Agency`;
    document.title = fullTitle;
    setMetaTag('name', 'description', description);
    setCanonical(path);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', `${SITE_URL}${path}`);
  }, [title, description, path]);

  return null;
}
