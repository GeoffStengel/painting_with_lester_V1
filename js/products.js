const ORDER_EMAIL = "orders@paintingwithlester.com";
const LOCAL_DISCOUNT_ZIPS = ["00000", "12345", "90210"];

const products = [
  {
    id: "nocturne_ep4-print",
    title: "Nocturne ep.4",
    category: "print",
    type: "Fine Art Print",
    price: 300,
    size: "30 × 40 in",
    available: true,
    fulfillment: "Ships directly from Lester or local pickup can be arranged.",
    image: "images/nocturne_ep4_30x40acrylic_on_canvas.jpg",
    description: "A bold original full of warm color, layered texture, and neighborhood energy.",
    tags: ["Original", "Acrylic", "One of One"]
  },
  {
    id: "fighter-print",
    title: "Fighter",
    category: "print",
    type: "Fine Art Print",
    price: 720,
    size: "18 × 24 in",
    available: true,
    fulfillment: "Ships directly from Lester or local pickup can be arranged.",
    image: "images/fighter_24x36_acrylic_on_canvas.jpg",
    description: "Cool blues, expressive marks, and a quiet sense of place.",
    tags: ["Original", "Canvas", "Framed"]
  },
  {
    id: "single-mom-at-night-print",
    title: "Single Mom At Night",
    category: "print",
    type: "Fine Art Print",
    price: 250,
    size: "24 × 36 in",
    available: true,
    fulfillment: "Printed to order and shipped rolled or flat depending on size.",
    image: "images/single_Mom_At_Night_acrylic_on_canvas.jpg",
    description: "A colorful print inspired by movement, music, and street markets.",
    tags: ["Print", "Signed", "Limited Run"]
  },
  {
    id: "caramel-print",
    title: "Caramel",
    category: "print",
    type: "Fine Art Print",
    price: 250,
    size: "24 × 36 in",
    available: true,
    fulfillment: "Printed to order and shipped rolled or flat depending on size.",
    image: "images/caramel_24x36_acrylic_on_canvas.jpg",
    description: "A soft, nostalgic piece with warm evening tones.",
    tags: ["Print", "Open Edition"]
  },
  {
    id: "save_the_tree-print",
    title: "Save The Tree",
    category: "print",
    type: "Fine Art Print",
    price: 420,
    size: "48 × 36 in",
    available: true,
    fulfillment: "Printed to order and shipped rolled or flat depending on size.",
    image: "images/save_the_tree_nocturne _36x48_acrylic_on_canvas.jpg",
    description: "A soft, nostalgic piece with warm evening tones.",
    tags: ["Print", "Open Edition"]
  }
];

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}