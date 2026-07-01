function createProductImage(title, category, background, accent) {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeCategory = category.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 675" role="img" aria-label="${safeTitle}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.9" />
          <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="900" height="675" fill="url(#bg)" />
      <circle cx="690" cy="160" r="220" fill="url(#glow)" />
      <circle cx="210" cy="560" r="170" fill="${accent}" fill-opacity="0.12" />
      <rect x="64" y="64" width="772" height="547" rx="42" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" />
      <text x="96" y="146" fill="#ffffff" font-size="28" font-family="Arial, Helvetica, sans-serif" letter-spacing="5">UNLOX SHOP</text>
      <text x="96" y="254" fill="#ffffff" font-size="62" font-family="Arial, Helvetica, sans-serif" font-weight="700">${safeTitle}</text>
      <text x="96" y="310" fill="${accent}" font-size="28" font-family="Arial, Helvetica, sans-serif">${safeCategory}</text>
      <rect x="96" y="382" width="240" height="12" rx="6" fill="rgba(255,255,255,0.36)" />
      <rect x="96" y="412" width="310" height="12" rx="6" fill="rgba(255,255,255,0.25)" />
      <rect x="96" y="442" width="210" height="12" rx="6" fill="rgba(255,255,255,0.2)" />
      <circle cx="720" cy="390" r="92" fill="${accent}" fill-opacity="0.2" />
      <circle cx="720" cy="390" r="48" fill="${accent}" fill-opacity="0.65" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const products = [
  {
    id: 1,
    title: 'Astra Wireless Headphones',
    description:
      'Crisp audio, deep bass, and all-day comfort with active noise cancellation for work and travel.',
    image: createProductImage('Astra Wireless Headphones', 'Audio', '#0f62fe', '#60a5fa'),
    category: 'Audio',
    price: 129.99,
    rating: 4.7,
  },
  {
    id: 2,
    title: 'Nova Smart Watch',
    description:
      'Track fitness, notifications, and heart rate in a lightweight design with a bright OLED display.',
    image: createProductImage('Nova Smart Watch', 'Wearables', '#1d4ed8', '#f59e0b'),
    category: 'Wearables',
    price: 159.0,
    rating: 4.5,
  },
  {
    id: 3,
    title: 'Vertex Laptop Pro',
    description:
      'Thin, powerful, and ready for creators with a fast processor, crisp screen, and all-day battery life.',
    image: createProductImage('Vertex Laptop Pro', 'Computing', '#0f172a', '#38bdf8'),
    category: 'Computing',
    price: 1299.0,
    rating: 4.9,
  },
  {
    id: 4,
    title: 'Orbit Mechanical Keyboard',
    description:
      'Responsive keys, customizable backlighting, and a compact layout built for productivity and gaming.',
    image: createProductImage('Orbit Mechanical Keyboard', 'Accessories', '#312e81', '#a78bfa'),
    category: 'Accessories',
    price: 89.99,
    rating: 4.6,
  },
  {
    id: 5,
    title: 'Pulse Fitness Band',
    description:
      'An affordable fitness companion with sleep tracking, step counts, and weather notifications.',
    image: createProductImage('Pulse Fitness Band', 'Wearables', '#166534', '#34d399'),
    category: 'Wearables',
    price: 59.99,
    rating: 4.3,
  },
  {
    id: 6,
    title: 'Luma Desk Lamp',
    description:
      'Soft adjustable lighting with a minimal profile that fits beautifully into modern workspaces.',
    image: createProductImage('Luma Desk Lamp', 'Home', '#7c2d12', '#f97316'),
    category: 'Home',
    price: 44.5,
    rating: 4.4,
  },
  {
    id: 7,
    title: 'Trail Water Bottle',
    description:
      'Double-wall insulation keeps drinks cold or hot while the durable build handles active days.',
    image: createProductImage('Trail Water Bottle', 'Lifestyle', '#0f766e', '#2dd4bf'),
    category: 'Lifestyle',
    price: 24.0,
    rating: 4.8,
  },
  {
    id: 8,
    title: 'Halo Bluetooth Speaker',
    description:
      'Room-filling sound in a compact speaker with rich mids and punchy bass for home or outdoor use.',
    image: createProductImage('Halo Bluetooth Speaker', 'Audio', '#7c3aed', '#c084fc'),
    category: 'Audio',
    price: 74.99,
    rating: 4.6,
  },
  {
    id: 9,
    title: 'Atlas Travel Backpack',
    description:
      'Smart compartments, weather-resistant fabric, and padded support for daily commuting or trips.',
    image: createProductImage('Atlas Travel Backpack', 'Travel', '#1f2937', '#fbbf24'),
    category: 'Travel',
    price: 96.0,
    rating: 4.7,
  },
  {
    id: 10,
    title: 'Pixel Action Camera',
    description:
      'Capture sharp action footage with stabilization, waterproof housing, and ultra-wide recording.',
    image: createProductImage('Pixel Action Camera', 'Cameras', '#111827', '#fb7185'),
    category: 'Cameras',
    price: 219.99,
    rating: 4.5,
  },
  {
    id: 11,
    title: 'Bloom Indoor Plant Kit',
    description:
      'An easy starter kit that adds fresh style to your space while keeping plant care simple.',
    image: createProductImage('Bloom Indoor Plant Kit', 'Home', '#14532d', '#86efac'),
    category: 'Home',
    price: 34.99,
    rating: 4.2,
  },
  {
    id: 12,
    title: 'Studio Noise-Cancel Earbuds',
    description:
      'Pocket-sized earbuds with clear calls, strong battery life, and adaptive sound modes.',
    image: createProductImage('Studio Noise-Cancel Earbuds', 'Audio', '#0f172a', '#f472b6'),
    category: 'Audio',
    price: 99.99,
    rating: 4.6,
  },
];

export const featuredProducts = products.slice(0, 4);

export const categories = ['All', ...new Set(products.map((product) => product.category))];