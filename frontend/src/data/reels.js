import websiteLaunchVideo from '../assets/reels/website-launch.mp4';
import websiteLaunchPoster from '../assets/reels/website-launch-poster.jpg';
import postReelVideo from '../assets/reels/post-reel.mp4';
import postReelPoster from '../assets/reels/post-reel-poster.jpg';
import scaloraReelVideo from '../assets/reels/scalora-reel-1.mp4';
import scaloraReelPoster from '../assets/reels/scalora-reel-1-poster.jpg';

import brandGrowthEra from '../assets/creative/brand-growth-era.webp';
import brandScaleWorld from '../assets/creative/brand-scale-world.webp';
import salesHook from '../assets/creative/sales-hook.webp';
import shopifyHook from '../assets/creative/shopify-hook.webp';
import customersHook from '../assets/creative/customers-hook.webp';
import tipsCarousel1 from '../assets/creative/tips-carousel-1.webp';
import tipsCarousel2 from '../assets/creative/tips-carousel-2.webp';

export const reelClips = [
  { id: 'website-launch', label: 'Website Launch', video: websiteLaunchVideo, poster: websiteLaunchPoster },
  { id: 'post-reel', label: 'Social Reel', video: postReelVideo, poster: postReelPoster },
  { id: 'scalora-reel-1', label: 'Brand Reel', video: scaloraReelVideo, poster: scaloraReelPoster }
];

export const creativeGallery = [
  { id: 'brand-growth-era', label: 'Brand Positioning Creative', category: 'Ad Creative', image: brandGrowthEra },
  { id: 'brand-scale-world', label: 'Performance Marketing Creative', category: 'Ad Creative', image: brandScaleWorld },
  { id: 'sales-hook', label: 'Lead Generation Creative', category: 'Ad Creative', image: salesHook },
  { id: 'shopify-hook', label: 'E-commerce Ad Creative', category: 'Ad Creative', image: shopifyHook },
  { id: 'customers-hook', label: 'Customer Acquisition Creative', category: 'Ad Creative', image: customersHook },
  { id: 'tips-carousel-1', label: 'Educational Content Series', category: 'Content Design', image: tipsCarousel1 },
  { id: 'tips-carousel-2', label: 'Educational Content Series', category: 'Content Design', image: tipsCarousel2 }
];
