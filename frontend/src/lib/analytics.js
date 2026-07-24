// Analytics loaders are inert until a real ID is supplied via env vars.
// Nothing is hardcoded and nothing loads unless VITE_* is set at build/deploy time.

function injectScript(src, attrs = {}) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
  document.head.appendChild(script);
  return script;
}

export function initAnalytics() {
  const gaId = import.meta.env.VITE_GA_ID;
  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID;
  const tiktokPixelId = import.meta.env.VITE_TIKTOK_PIXEL_ID;

  if (gaId) {
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', gaId);
    window.gtag = gtag;
  }

  if (metaPixelId) {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', metaPixelId);
    window.fbq('track', 'PageView');
  }

  if (tiktokPixelId) {
    injectScript(`https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${tiktokPixelId}&lib=ttq`);
  }
}

export function trackEvent(name, params = {}) {
  if (window.gtag) window.gtag('event', name, params);
  if (window.fbq) window.fbq('trackCustom', name, params);
}
