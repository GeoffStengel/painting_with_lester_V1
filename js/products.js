const ORDER_EMAIL = "orders@paintingwithlester.com";
const LOCAL_DISCOUNT_ZIPS = ["00000", "12345", "90210", "97402"];

const products = [
  {
    id: "save_the_tree-print",
    title: "Save The Tree",
    category: "print",
    type: "Fine Art Print",
    price: 420,
    size: "48 × 36 in",
    available: true,
    maxQty: 10,
    fulfillment: "Printed to order and shipped rolled or flat depending on size.",
    image: "images/save_the_tree_nocturne_36x48_acrylic_on_canvas.jpg",
    description: "Inspired by a neighborhood tree saved from being cut down.",
    tags: ["Print", "Open Edition"],
    printOptions: [
    { label: "12 × 16 in", price: 85 },
    { label: "18 × 24 in", price: 150 },
    { label: "24 × 36 in", price: 250 }
  ]
  },
  {
    id: "fighter-print",
    title: "Fighter",
    category: "print",
    type: "Fine Art Print",
    price: 250,
    size: "24 × 36 in",
    available: true,
    maxQty: 10,
    fulfillment: "Ships directly from Lester or local pickup can be arranged.",
    image: "images/fighter_24x36_acrylic_on_canvas.jpg",
    description: "Cool blues, expressive marks, and a quiet sense of place.",
    tags: ["Original", "Canvas", "Framed"],
    printOptions: [
    { label: "12 × 16 in", price: 85 },
    { label: "18 × 24 in", price: 150 },
    { label: "24 × 36 in", price: 250 }
  ]
  },  
  {
    id: "nocturne_ep4-print",
    title: "Nocturne ep.4",
    category: "print",
    type: "Fine Art Print",
    price: 300,
    size: "30 × 40 in",
    available: true,
    maxQty: 10,
    fulfillment: "Ships directly from Lester or local pickup can be arranged.",
    image: "images/nocturne_ep4_30x40acrylic_on_canvas.jpg",
    description: "A bold original full of warm color, layered texture, and neighborhood energy.",
    tags: ["Original", "Acrylic", "One of One"],
    printOptions: [
    { label: "12 × 16 in", price: 85 },
    { label: "18 × 24 in", price: 150 },
    { label: "30 × 40 in", price: 300 }
  ]
  },

  {
    id: "single-mom-at-night-print",
    title: "Single Mom At Night",
    category: "print",
    type: "Fine Art Print",
    price: 250,
    size: "24 × 36 in",
    available: true,
    maxQty: 10,
    fulfillment: "Printed to order and shipped rolled or flat depending on size.",
    image: "images/single_Mom_At_Night_acrylic_on_canvas.jpg",
    description: "A colorful print inspired by movement, music, and street markets.",
    tags: ["Print", "Signed", "Limited Run"],
        printOptions: [
    { label: "6 × 9 in", price: 42 },
    { label: "13 × 19.5 in", price: 100 },
    { label: "24 × 36 in", price: 300 }
  ]
  },
  {
    id: "caramel-print",
    title: "Caramel",
    category: "print",
    type: "Fine Art Print",
    price: 250,
    size: "24 × 36 in",
    available: true,
    maxQty: 10,
    fulfillment: "Printed to order and shipped rolled or flat depending on size.",
    image: "images/caramel_24x36_acrylic_on_canvas.jpg",
    description: "A soft, nostalgic piece with warm evening tones.",
    tags: ["Print", "Open Edition"],
        printOptions: [
    { label: "12 × 16 in", price: 85 },
    { label: "18 × 24 in", price: 150 },
    { label: "24 × 36 in", price: 250 }
  ]
  },
];

/* /=== GALLERY ONLY ARTWORK START ===/ */
const galleryArtwork = [
  {
    id: "autumn_trees_oil",
    title: "Autumn Trees",
    image: "images/autumn_Trees_oil_on _board.jpg",
    medium: "Oil on Board",
    size: "24 × 36 in",
    year: "2024"
  },    
  {
    id: "aaron_acrylic",
    title: "Aaron",
    image: "images/aaron_24x36_acrylic_on_canvas.jpg",
    medium: "Acrylic on Canvas",
    size: "24 × 36 in",
    year: "2024"
  },
  {
    id: "eugene_poetry_slam_acrylic",
    title: "Eugene Poetry Slam",
    image: "images/eugene_Poetry_Slam_soft_pastel_on_paper.jpg",
    medium: "Pastel on paper",
    size: "24 × 36 in",
    year: "2024"
  },    
  {
    id: "tim_lewis_acrylic",
    title: "Tim Lewis",
    image: "images/tim_Lewis_acrylic on_canvas_paper.jpg",
    medium: "Acrylic on Canvas",
    size: "24 × 36 in",
    year: "2024"
  },
 
  {
    id: "rode_tree_oil",
    title: "Rose Tree",
    image: "images/rose_Tree_5x7_oil_on_board.jpg",
    medium: "Oil on Board",
    size: "24 × 36 in",
    year: "2024"
  },
   
  {
    id: "dot_acrylic",
    title: "Dot Acrylic",
    image: "images/dot_acrylic_on_cabinet_door.jpg",
    medium: "Acrylic on Cabinet Door",
    size: "24 × 36 in",
    year: "2024"
  }, 
  
  {
    id: "electric_vomit_oil",
    title: "Electric Vomit",
    image: "images/electric_Vomit_5x7_oil_on_board.jpg",
    medium: "Oil on Board",
    size: "24 × 36 in",
    year: "2024"
  },
  {
    id: "shook_twins_soft_pastel",
    title: "Shook Twins",
    image: "images/shook_Twins_soft_pastel_on_paper.jpg",
    medium: "Pastel on Paper",
    size: "24 × 36 in",
    year: "2024"
  },
  {
    id: "trees_oil",
    title: "Trees",
    image: "images/trees_oil_on_board.jpg",
    medium: "Oil on Board",
    size: "24 × 36 in",
    year: "2024"
  }, 
  {
    id: "lefty_acrylic",
    title: "Lefty",
    image: "images/lefty_acrylic_on_canvas_paper.jpg",
    medium: "Acrylic on Canvas Paper",
    size: "24 × 36 in",
    year: "2024"
  },
   
  {
    id: "last_stand_coffee_oil",
    title: "Last Stand Coffee",
    image: "images/last_Stand_Coffee_12x16_oil_on_board.jpg",
    medium: "Oil on Board",
    size: "24 × 36 in",
    year: "2024"
  },  
];
/* /=== GALLERY ONLY ARTWORK END ===/ */

/* /=== FORM SERVICES START ===/ */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xbdbgaop";
/* /=== FORM SERVICES END ===/ */


function getProduct(productId) {
  return products.find((product) => product.id === productId);
}