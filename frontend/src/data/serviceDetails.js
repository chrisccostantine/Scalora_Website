export const serviceCategories = [
  {
    title: 'Growth & Advertising',
    description: 'Paid media that is planned, tested, and reported on — not just switched on.',
    slugs: ['meta-ads-management', 'google-tiktok-ads']
  },
  {
    title: 'Social Media & Creative',
    description: 'Content and creative direction that keeps a brand consistent across every post.',
    slugs: ['social-media-management', 'reels-production']
  },
  {
    title: 'E-commerce & Websites',
    description: 'Stores and sites built around conversion, not just visual polish.',
    slugs: ['shopify-website-development', 'custom-website-development']
  },
  {
    title: 'Software & Digital Products',
    description: 'Applications and internal tools built for a specific business need.',
    slugs: ['web-application-development', 'mobile-app-development']
  }
];

export const serviceDetails = [
  {
    slug: 'meta-ads-management',
    title: 'Meta Ads Management',
    shortTitle: 'Meta Ads',
    tagline: 'Campaigns built around a customer journey, not a boosted post.',
    problem: 'Ad spend without a tested funnel or clear tracking usually just spends the budget.',
    outcome: 'Structured campaigns, retargeting, and reporting tied to the numbers that matter to your business.',
    features: ['Campaign strategy & audience research', 'Creative testing', 'Retargeting setup', 'Weekly performance reporting'],
    metaDescription: 'Meta Ads management for businesses in Lebanon and the Gulf — campaign strategy, retargeting, and performance reporting.'
  },
  {
    slug: 'google-tiktok-ads',
    title: 'TikTok & Google Ads',
    shortTitle: 'TikTok & Google Ads',
    tagline: 'Search and short-form video demand, run from the same playbook as your Meta campaigns.',
    problem: 'Running ads on multiple platforms without a shared strategy usually means duplicated work and mixed messaging.',
    outcome: 'Google Search/Shopping and TikTok campaigns coordinated with your other channels and reported in one place.',
    features: ['Google Search & Shopping campaigns', 'TikTok Ads creative & targeting', 'Cross-channel reporting'],
    metaDescription: 'TikTok Ads and Google Ads management alongside your Meta campaigns, reported in one place.'
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    shortTitle: 'Social Media',
    tagline: 'A content calendar and posting cadence your brand can actually keep up with.',
    problem: 'Inconsistent posting and off-brand content quietly erodes trust with an audience.',
    outcome: 'A planned content calendar, on-brand visuals, and community management handled every week.',
    features: ['Content strategy & calendar', 'Post design', 'Community management', 'Monthly reporting'],
    metaDescription: 'Social media management in Lebanon — content strategy, design, and community management.'
  },
  {
    slug: 'reels-production',
    title: 'Reels Production',
    shortTitle: 'Reels',
    tagline: 'Scripted, shot, and edited vertical video, ready to post.',
    problem: 'Short-form video drives reach, but producing it consistently takes time most teams don’t have.',
    outcome: 'A batch of scripted, shot, and edited reels delivered on a schedule.',
    features: ['Concept & scripting', 'Filming', 'Editing & captions', '4, 6, or 8-reel packages'],
    metaDescription: 'Professional reels production in Lebanon — scripting, filming, and editing for Instagram and TikTok.'
  },
  {
    slug: 'shopify-website-development',
    title: 'Shopify Website Development',
    shortTitle: 'Shopify Websites',
    tagline: 'A store built for checkout completion, not just browsing.',
    problem: 'A store that looks good but is slow to check out on mobile loses sales at the last step.',
    outcome: 'A theme, product catalog, and checkout flow tuned for conversion, with analytics wired up at launch.',
    features: ['Theme setup & customization', 'Product & collection architecture', 'Checkout & analytics setup', 'Mobile performance'],
    metaDescription: 'Shopify website development in Lebanon — conversion-focused store setup, product architecture, and checkout optimization.'
  },
  {
    slug: 'custom-website-development',
    title: 'Custom Website Development',
    shortTitle: 'Custom Websites',
    tagline: 'A fast, modern site built around the goal it needs to serve.',
    problem: 'Template sites often fight the content instead of presenting it clearly.',
    outcome: 'A responsive, SEO-structured site built for the specific pages and content your business needs.',
    features: ['UX-first structure', 'SEO-ready markup', 'CMS-ready content', 'Performance-first build'],
    metaDescription: 'Custom website development agency in Lebanon — fast, SEO-structured websites built around your business.'
  },
  {
    slug: 'web-application-development',
    title: 'Web Application Development',
    shortTitle: 'Web Applications',
    tagline: 'Dashboards, portals, and internal tools built around a real workflow.',
    problem: 'Spreadsheets and generic tools eventually can’t keep up with a growing operation.',
    outcome: 'A secure, purpose-built application your team actually uses day to day.',
    features: ['Requirements & data modeling', 'Secure authentication & roles', 'Custom dashboards', 'API integrations'],
    metaDescription: 'Web application development agency — dashboards, booking systems, and internal tools built around your workflow.'
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    tagline: 'Customer-facing or operational apps designed around real usage.',
    problem: 'A mobile app built without a clear use case usually goes unused after launch.',
    outcome: 'An app scoped around the specific customer or operational flow it needs to support.',
    features: ['Product scoping', 'iOS & Android delivery', 'Backend & API integration', 'App store launch support'],
    metaDescription: 'Mobile app development agency — customer-facing and operational apps built for real usage.'
  }
];

export function getServiceBySlug(slug) {
  return serviceDetails.find((service) => service.slug === slug);
}
