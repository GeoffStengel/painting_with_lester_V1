const ORDER_EMAIL = "orders@paintingwithlester.com";
const LOCAL_DISCOUNT_ZIPS = ["00000", "12345", "90210"];

const products = [
  {
    id: "sunburst-alley-original",
    title: "Sunburst Alley",
    category: "original",
    type: "Original Painting",
    price: 950,
    size: "24 × 36 in",
    available: true,
    fulfillment: "Ships directly from Lester or local pickup can be arranged.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1000&q=80",
    description: "A bold original full of warm color, layered texture, and neighborhood energy.",
    tags: ["Original", "Acrylic", "One of One"]
  },
  {
    id: "blue-window-original",
    title: "Blue Window",
    category: "original",
    type: "Original Painting",
    price: 720,
    size: "18 × 24 in",
    available: true,
    fulfillment: "Ships directly from Lester or local pickup can be arranged.",
    image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1000&q=80",
    description: "Cool blues, expressive marks, and a quiet sense of place.",
    tags: ["Original", "Canvas", "Framed"]
  },
  {
    id: "market-jazz-print",
    title: "Market Jazz",
    category: "print",
    type: "Fine Art Print",
    price: 85,
    size: "16 × 20 in",
    available: true,
    fulfillment: "Printed to order and shipped rolled or flat depending on size.",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1000&q=80",
    description: "A colorful print inspired by movement, music, and street markets.",
    tags: ["Print", "Signed", "Limited Run"]
  },
  {
    id: "porch-light-print",
    title: "Porch Light",
    category: "print",
    type: "Fine Art Print",
    price: 65,
    size: "12 × 16 in",
    available: true,
    fulfillment: "Printed to order and shipped rolled or flat depending on size.",
    image: "https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&w=1000&q=80",
    description: "A soft, nostalgic piece with warm evening tones.",
    tags: ["Print", "Open Edition"]
  }
];

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}