/* /=== CONFIG START ===/ */
const ORDER_EMAIL = "orders@paintingwithlester.com"; // TODO: replace before launch
const LOCAL_DISCOUNT_ZIPS = ["00000", "12345", "90210"];

let cart = [];

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
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80",
    description: "Bold warm acrylic movement with layered texture.",
    maxQty: 1,
    printOptions: []
  },
  {
    id: "blue-hour-dreams",
    title: "Blue Hour Dreams",
    category: "print",
    type: "Fine Art Print",
    price: 65,
    size: "Select size",
    available: true,
    fulfillment: "Ordered from the print company after customer confirmation.",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=900&q=80",
    description: "Museum-style print with dreamy blue movement.",
    maxQty: 10,
    printOptions: []
  },
  {
    id: "garden-wall-rhythm",
    title: "Garden Wall Rhythm",
    category: "print",
    type: "Fine Art Print",
    price: 65,
    size: "Select size",
    available: true,
    fulfillment: "Ordered from the print company after customer confirmation.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=80",
    description: "Colorful, playful print with soft brush motion.",
    maxQty: 10,
    printOptions: []
  },
  {
    id: "neighborhood-light-original",
    title: "Neighborhood Light",
    category: "original",
    type: "Original Painting",
    price: 1200,
    size: "30 × 40 in",
    available: true,
    fulfillment: "Ships directly from Lester or local pickup can be arranged.",
    image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=900&q=80",
    description: "One-of-one statement piece full of local color.",
    maxQty: 1,
    printOptions: []
  }
];
/* /=== CONFIG END ===/ */


/* /=== HELPERS START ===/ */
const $ = (selector) => document.querySelector(selector);

const money = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);

function safeScrollTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
  $("#contentCanvas")?.scrollTo({ top: 0, behavior: "instant" });
}

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

function getCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}
/* /=== HELPERS END ===/ */


/* /=== SECTION TEMPLATES START ===/ */
const sections = {
  home: () => `
    <div class="canvas-section hero-grid">
      <div>
        <h1 class="hero-title">Step into <span class="paint-script">Lester's Studio.</span></h1>
        <p class="section-copy">
          A premium interactive art site built like a studio table: one palette,
          one canvas, clear paths for collectors, print buyers, and artists.
        </p>

        <div class="hero-actions">
          <button class="btn btn-primary" onclick="switchSection('shop')">Browse the Shop</button>
          <button class="btn btn-dark" onclick="switchSection('tools')">Try Artist Tools</button>
        </div>

        <div class="feature-row">
          <div class="feature-card"><strong>Originals</strong><p class="section-copy">Physical paintings ship from Lester.</p></div>
          <div class="feature-card"><strong>Prints</strong><p class="section-copy">Prints are ordered after confirmation.</p></div>
          <div class="feature-card"><strong>Orders</strong><p class="section-copy">Email sheets keep fulfillment simple.</p></div>
        </div>
      </div>

      <div class="featured-card">
        <div>
          <strong style="font-size:1.6rem;">Currently Mixing</strong>
          <p style="color:rgba(255,255,255,.82);">Golden Hour Serenity</p>
        </div>
      </div>
    </div>
  `,

  gallery: () => `
    <div class="canvas-section" style="padding:56px;">
      <h2 class="section-heading">A gallery with <span class="paint-script">presence.</span></h2>
      <p class="section-copy">Replace these panels with Lester’s real painting photos when ready.</p>

      <div class="gallery-grid">
        <article class="art-tile big" style="--bg: linear-gradient(135deg,#e63946,#fcbf49,#f77f00);"><strong>Sunburst Alley</strong></article>
        <div class="gallery-side">
          <article class="art-tile" style="--bg: linear-gradient(135deg,#277da1,#7b2cbf);"><strong>Blue Hour Dreams</strong></article>
          <article class="art-tile" style="--bg: linear-gradient(135deg,#2a9d8f,#277da1,#fcbf49);"><strong>Garden Wall Rhythm</strong></article>
        </div>
      </div>
    </div>
  `,

  shop: () => `
    <div class="shop-page">
      <section class="shop-hero">
        <div>
          <h2>Shop</h2>
          <p>Original paintings and fine art prints from Lester’s studio.</p>
        </div>

        <button class="cart-pill" type="button" onclick="showCart()">
          🛒 Cart <span id="cartCount">0</span>
          <strong id="cartTotalMini">$0.00</strong>
        </button>
      </section>

      <section class="shop-toolbar">
        <div class="shop-tabs">
          <button class="shop-tab active" data-filter="all">All Items</button>
          <button class="shop-tab" data-filter="Original Painting">Original Paintings</button>
          <button class="shop-tab" data-filter="Fine Art Print">Fine Art Prints</button>
        </div>

        <select id="shopSort">
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </section>

      <section class="shop-grid mockup-shop-grid" id="shopGrid"></section>

      <div class="shipping-banner">
        Checkout happens through the cart so Lester receives one clean email order sheet.
      </div>
    </div>
  `,

  tools: () => `
    <div class="canvas-section" style="padding:56px;">
      <h2 class="section-heading">Artist <span class="paint-script">toolbox.</span></h2>
      <p class="section-copy">Interactive tools give artists a reason to come back.</p>

      <div class="tools-grid">
        <article class="tool-card">
          <h3>Random Palette Maker</h3>
          <p class="section-copy">Generate colors. Click a swatch to copy.</p>
          <button class="btn btn-primary btn-small" id="paletteBtn">Generate Palette</button>
          <div class="swatches" id="paletteOutput"></div>
        </article>

        <article class="tool-card">
          <h3>Canvas Ratio Helper</h3>
          <p class="section-copy">Enter width and height for a simplified ratio.</p>
          <input id="canvasWidth" type="number" min="1" placeholder="Width" />
          <input id="canvasHeight" type="number" min="1" placeholder="Height" style="margin-top:10px;" />
          <button class="btn btn-primary btn-small" id="ratioBtn" style="margin-top:10px;">Calculate</button>
          <div class="tool-output" id="ratioOutput">Ratio appears here.</div>
        </article>

        <article class="tool-card">
          <h3>Quick Sketch Canvas</h3>
          <canvas class="sketch-canvas" id="sketchCanvas" width="600" height="320"></canvas>
          <div class="tool-actions">
            <input type="color" id="brushColor" value="#e63946" style="width:50px; height:42px; padding:3px;" />
            <button class="btn btn-small" id="thinBrush" type="button">Thin</button>
            <button class="btn btn-small" id="thickBrush" type="button">Thick</button>
            <button class="btn btn-small btn-dark" id="clearCanvas" type="button">Clear</button>
          </div>
        </article>

        <article class="tool-card">
          <h3>Painting Prompt</h3>
          <p class="section-copy">For blank canvas moments.</p>
          <button class="btn btn-primary btn-small" id="promptBtn">Give Me a Prompt</button>
          <div class="tool-output" id="promptOutput">Prompt appears here.</div>
        </article>
      </div>
    </div>
  `,

  about: () => `
    <div class="canvas-section" style="padding:56px;">
      <h2 class="section-heading">About <span class="paint-script">Lester.</span></h2>
      <p class="section-copy">Lester Maurer shares bold color, painting process, and creative storytelling through Painting With Lester.</p>
    </div>
  `,

  socials: () => `
    <div class="canvas-section" style="padding:56px;">
      <h2 class="section-heading">Follow the <span class="paint-script">paint trail.</span></h2>
      <p class="section-copy">Connect collectors, students, and fans to Lester’s channels.</p>

      <div class="social-grid">
        <a class="social-card" href="https://www.youtube.com/@PaintingWithLester" target="_blank" rel="noreferrer"><span class="emoji">▶️</span><strong>YouTube</strong><p class="section-copy">Watch Painting With Lester.</p></a>
        <a class="social-card" href="https://tiktok.com/@lestermaurerthepainter" target="_blank" rel="noreferrer"><span class="emoji">🎬</span><strong>TikTok</strong><p class="section-copy">Short-form studio moments.</p></a>
        <a class="social-card" href="https://www.instagram.com/lester.maurer" target="_blank" rel="noreferrer"><span class="emoji">📸</span><strong>Instagram</strong><p class="section-copy">Daily art and updates.</p></a>
      </div>
    </div>
  `
};
/* /=== SECTION TEMPLATES END ===/ */


/* /=== SECTION SWITCHING START ===/ */
function switchSection(sectionName) {
  const canvas = $("#contentCanvas");
  if (!canvas) return;

  canvas.innerHTML = sections[sectionName] ? sections[sectionName]() : sections.home();

  document.querySelectorAll(".paint-well").forEach((button) => {
    button.classList.toggle("active", button.dataset.section === sectionName);
  });

  safeScrollTop();

  if (sectionName === "shop") initShop();
  if (sectionName === "tools") initTools();

  updateCartUI();
}
/* /=== SECTION SWITCHING END ===/ */


/* /=== CART LOGIC START ===/ */
function addToCart(productId) {
  const product = getProduct(productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);
  const maxQty = product.maxQty || 99;

  if (existingItem) {
    if (existingItem.quantity >= maxQty) return;
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      type: product.type,
      price: product.price,
      size: product.size,
      image: product.image,
      quantity: 1,
      maxQty
    });
  }

  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
  showCart();
}

function updateCartQuantity(productId, amount) {
  const item = cart.find((cartItem) => cartItem.id === productId);
  if (!item) return;

  const maxQty = item.maxQty || 99;
  item.quantity = Math.min(maxQty, Math.max(1, item.quantity + amount));

  updateCartUI();
  showCart();
}

function updateCartUI() {
  const count = getCartCount();
  const total = money(getCartTotal());

  const cartCount = $("#cartCount");
  const cartTotalMini = $("#cartTotalMini");
  const floatingCartCount = $("#floatingCartCount");
  const floatingCartTotal = $("#floatingCartTotal");

  if (cartCount) cartCount.textContent = String(count);
  if (cartTotalMini) cartTotalMini.textContent = total;

  if (floatingCartCount) {
    floatingCartCount.textContent = `${count} item${count !== 1 ? "s" : ""}`;
  }

  if (floatingCartTotal) {
    floatingCartTotal.textContent = total;
  }
}

function showCart() {
  $("#contentCanvas").innerHTML = `
    <div class="cart-page">
      <button class="back-to-shop" type="button" onclick="switchSection('shop')">
        ← Back to Shop
      </button>

      <h2 class="section-heading">Your Cart</h2>

      ${
        cart.length === 0
          ? `<p class="section-copy">Your cart is empty.</p>`
          : `
            <div class="cart-layout">
              <section class="cart-items">
                ${cart.map((item) => {
                  const isAtMax = item.quantity >= (item.maxQty || 99);

                  return `
                    <article class="cart-item">
                      <div class="cart-item-image" style="background-image:url('${item.image}');"></div>

                      <div>
                        <h3>${item.title}</h3>
                        <p>${item.type} · ${item.size}</p>
                        <strong>${money(item.price)} each</strong>
                        ${item.maxQty === 1 ? `<small>One-of-one original</small>` : `<small>Max quantity: ${item.maxQty}</small>`}
                      </div>

                      <div class="cart-qty">
                        <button type="button" onclick="updateCartQuantity('${item.id}', -1)">−</button>
                        <span>${item.quantity}</span>
                        <button type="button" onclick="updateCartQuantity('${item.id}', 1)" ${isAtMax ? "disabled" : ""}>+</button>
                      </div>

                      <button class="cart-remove" type="button" onclick="removeFromCart('${item.id}')">×</button>
                    </article>
                  `;
                }).join("")}
              </section>

              <aside class="cart-summary">
                <h3>Order Summary</h3>
                <div><span>Items</span><strong>${getCartCount()}</strong></div>
                <div><span>Subtotal</span><strong>${money(getCartTotal())}</strong></div>
                <div><span>Shipping</span><strong>Confirm by email</strong></div>
                <div class="cart-total"><span>Total</span><strong>${money(getCartTotal())}</strong></div>

                <button class="btn btn-primary" type="button" onclick="showCheckout()">
                  Continue to Order Sheet
                </button>
              </aside>
            </div>
          `
      }
    </div>
  `;

  safeScrollTop();
  updateCartUI();
}
/* /=== CART LOGIC END ===/ */


/* /=== PRODUCT DETAIL VIEW START ===/ */
function showProductDetail(productId) {
  const product = getProduct(productId);
  if (!product) return;

  $("#contentCanvas").innerHTML = `
    <div class="product-detail-page">
      <button class="back-to-shop" type="button" onclick="switchSection('shop')">
        ← Back to Shop
      </button>

      <section class="product-detail-grid">
        <div class="detail-gallery">
          <div class="detail-main-image" style="background-image:url('${product.image}');"></div>

          <div class="detail-thumbs">
            <button style="background-image:url('${product.image}');" type="button"></button>
            <button style="background-image:url('${product.image}'); filter:saturate(.7);" type="button"></button>
            <button style="background-image:url('${product.image}'); filter:sepia(.25);" type="button"></button>
          </div>
        </div>

        <div class="detail-info">
          <span class="detail-type">${product.type}</span>
          <h2>${product.title}</h2>
          <p>${product.description}</p>

          <ul class="detail-list">
            <li><strong>Size:</strong> ${product.size}</li>
            <li><strong>Availability:</strong> ${product.available ? "Available" : "Unavailable"}</li>
            <li><strong>Starting Price:</strong> ${money(product.price)}</li>
            <li><strong>Max Qty:</strong> ${product.maxQty}</li>
          </ul>

          <div class="detail-qty-row">
            <button type="button" onclick="adjustDetailQty(-1)">−</button>
            <input id="detailQty" type="number" min="1" max="${product.maxQty}" value="1" />
            <button type="button" onclick="adjustDetailQty(1, ${product.maxQty})">+</button>
          </div>

          <button class="btn btn-primary detail-add-btn" type="button" onclick="addDetailItemToCart('${product.id}')">
            Add to Cart
          </button>
        </div>

        <aside class="detail-order-box">
          <h3>Order Notes</h3>
          <p>${product.fulfillment}</p>

          <div class="detail-note">
            <strong>Originals</strong>
            <span>Original paintings are one-of-one and limited to one per order.</span>
          </div>

          <div class="detail-note">
            <strong>Prints</strong>
            <span>Prints can have limited quantities based on Lester’s chosen edition size.</span>
          </div>

          <div class="detail-note">
            <strong>Discounts</strong>
            <span>Local and artist discounts can be reviewed before final confirmation.</span>
          </div>
        </aside>
      </section>
    </div>
  `;

  safeScrollTop();
  updateCartUI();
}

function adjustDetailQty(amount, maxQty = 99) {
  const input = $("#detailQty");
  if (!input) return;

  const currentValue = Number(input.value) || 1;
  input.value = Math.min(maxQty, Math.max(1, currentValue + amount));
}

function addDetailItemToCart(productId) {
  const product = getProduct(productId);
  if (!product) return;

  const qty = Number($("#detailQty")?.value) || 1;
  const maxQty = product.maxQty || 99;
  const safeQty = Math.min(qty, maxQty);

  for (let i = 0; i < safeQty; i += 1) {
    addToCart(productId);
  }

  showCart();
}
/* /=== PRODUCT DETAIL VIEW END ===/ */


/* /=== SHOP START ===/ */
function initShop() {
  const shopGrid = $("#shopGrid");
  if (!shopGrid) return;

  renderShopProducts(products);

  document.querySelectorAll(".shop-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".shop-tab").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter;
      const filteredProducts =
        filter === "all"
          ? products
          : products.filter((product) => product.type === filter);

      renderShopProducts(filteredProducts);
      updateCartUI();
    });
  });

  $("#shopSort")?.addEventListener("change", (event) => {
    const sorted = [...products];

    if (event.target.value === "low") sorted.sort((a, b) => a.price - b.price);
    if (event.target.value === "high") sorted.sort((a, b) => b.price - a.price);

    renderShopProducts(sorted);
    updateCartUI();
  });

  updateCartUI();

  function renderShopProducts(productList) {
    shopGrid.innerHTML = productList.map((product) => `
      <article class="product-card">
        <button
          class="product-art product-image-button"
          data-type="${product.type}"
          style="background-image:url('${product.image}');"
          onclick="showProductDetail('${product.id}')"
          type="button"
          aria-label="View ${product.title} details">
        </button>

        <div class="product-body">
          <h3>${product.title}</h3>
          <p class="section-copy">${product.description}</p>

          <div class="product-meta">
            <span>${product.size}</span>
            <span class="price">${money(product.price)}</span>
          </div>

          <div class="product-footer-meta">
            <span>${product.type}</span>
          </div>

          <button class="btn btn-primary btn-small" onclick="addToCart('${product.id}')" type="button">
            Add to Cart
          </button>
        </div>
      </article>
    `).join("");
  }
}
/* /=== SHOP END ===/ */


/* /=== CHECKOUT / EMAIL ORDER SHEET START ===/ */
function showCheckout() {
  if (cart.length === 0) {
    showCart();
    return;
  }

  $("#contentCanvas").innerHTML = `
    <div class="cart-page">
      <button class="back-to-shop" type="button" onclick="showCart()">
        ← Back to Cart
      </button>

      <h2 class="section-heading">Order Sheet</h2>
      <p class="section-copy">This creates an email order sheet for Lester to confirm availability, shipping, and payment.</p>

      <form class="order-form" id="orderForm">
        <h3 style="margin:0;">Customer Info</h3>

        <label for="customerName">Customer name</label>
        <input id="customerName" autocomplete="name" required placeholder="Customer name" />

        <label for="customerEmail">Customer email</label>
        <input id="customerEmail" type="email" autocomplete="email" required placeholder="customer@email.com" />

        <label for="customerPhone">Phone</label>
        <input id="customerPhone" autocomplete="tel" placeholder="Optional" />

        <label for="shippingAddress">Shipping address</label>
        <textarea id="shippingAddress" rows="3" required placeholder="Street address, apartment, etc."></textarea>

        <label for="cityStateZip">City / State / ZIP</label>
        <input id="cityStateZip" required placeholder="City, ST 12345" />

        <label for="zipCode">ZIP for local discount check</label>
        <input id="zipCode" inputmode="numeric" placeholder="12345" />

        <label class="check-row">
          <input type="checkbox" id="isLocal" />
          <span>Customer is local to the neighborhood</span>
        </label>

        <label class="check-row">
          <input type="checkbox" id="isArtist" />
          <span>Customer is an artist / painter</span>
        </label>

        <label for="notes">Order notes</label>
        <textarea id="notes" rows="3" placeholder="Frame request, pickup question, delivery note, etc."></textarea>

        <div class="total-box">
          <div>Cart items: ${getCartCount()}</div>
          <div>Estimated subtotal before shipping/tax: ${money(getCartTotal())}</div>
          <div>Shipping/tax/payment will be confirmed by Lester.</div>
        </div>

        <button class="btn btn-primary" type="submit">Create Email Order Sheet</button>
      </form>
    </div>
  `;

  $("#orderForm")?.addEventListener("submit", buildOrderEmail);

  safeScrollTop();
  updateCartUI();
}

function buildOrderEmail(event) {
  event.preventDefault();

  const zip = $("#zipCode")?.value.trim() || "";
  const isLocal = $("#isLocal")?.checked || LOCAL_DISCOUNT_ZIPS.includes(zip);
  const isArtist = $("#isArtist")?.checked || false;

  const discountNote = [
    isLocal ? "Customer marked local / ZIP matched local list." : "No local discount selected.",
    isArtist ? "Customer marked artist / painter." : "No artist discount selected."
  ].join("\n");

  const cartSummary = cart.map((item) => {
    const lineTotal = item.price * item.quantity;
    return `${item.title} — ${item.type} — ${item.size} — Qty: ${item.quantity} — ${money(lineTotal)}`;
  }).join("\n");

  const body = `NEW ORDER — Painting With Lester

CART ITEMS
${cartSummary}

CART TOTAL
${money(getCartTotal())}

DISCOUNT CHECK
${discountNote}

CUSTOMER
Name: ${$("#customerName").value}
Email: ${$("#customerEmail").value}
Phone: ${$("#customerPhone").value || "Not provided"}
Shipping Address: ${$("#shippingAddress").value}
City/State/ZIP: ${$("#cityStateZip").value}
ZIP used for discount check: ${zip || "Not provided"}
Local neighborhood?: ${isLocal ? "Yes" : "No"}
Artist/Painter?: ${isArtist ? "Yes" : "No"}

NOTES
${$("#notes").value || "None"}

NEXT STEPS
1. Confirm availability.
2. Confirm final shipping/tax/payment details.
3. If print, order it from the printing company.
4. Send confirmation to customer.
`;

  window.location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent("New art order: Painting With Lester")}&body=${encodeURIComponent(body)}`;
}
/* /=== CHECKOUT / EMAIL ORDER SHEET END ===/ */


/* /=== ARTIST TOOLS START ===/ */
function initTools() {
  $("#paletteBtn")?.addEventListener("click", generatePalette);
  $("#ratioBtn")?.addEventListener("click", calculateRatio);
  $("#promptBtn")?.addEventListener("click", generatePrompt);

  if ($("#sketchCanvas")) initSketchCanvas();
  generatePalette();
}

function generatePalette() {
  const output = $("#paletteOutput");
  if (!output) return;

  const colors = Array.from({ length: 5 }, () =>
    `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`
  );

  output.innerHTML = colors.map((color) => `
    <button
      class="swatch"
      title="Copy ${color}"
      style="background:${color}"
      onclick="navigator.clipboard?.writeText('${color}')"
      type="button"
    ></button>
  `).join("");
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function calculateRatio() {
  const width = Number($("#canvasWidth")?.value);
  const height = Number($("#canvasHeight")?.value);

  if (!width || !height || width <= 0 || height <= 0) {
    $("#ratioOutput").textContent = "Enter a valid width and height.";
    return;
  }

  const divisor = gcd(width, height);
  $("#ratioOutput").textContent = `Simplified ratio: ${width / divisor}:${height / divisor}`;
}

function generatePrompt() {
  const output = $("#promptOutput");
  if (!output) return;

  const moods = ["quiet", "electric", "neighborhood", "sun-soaked", "stormy", "joyful", "cinematic"];
  const subjects = ["alleyway", "porch light", "flower market", "city window", "old doorway", "jazz musician", "corner store"];
  const styles = ["with thick texture", "using only three colors", "as a dream scene", "with wild brush strokes", "in golden-hour light", "with one neon surprise"];

  const pick = (list) => list[Math.floor(Math.random() * list.length)];

  output.textContent = `Paint a ${pick(moods)} ${pick(subjects)} ${pick(styles)}.`;
}
/* /=== ARTIST TOOLS END ===/ */


/* /=== SKETCH CANVAS START ===/ */
function initSketchCanvas() {
  const canvas = $("#sketchCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let drawing = false;
  let brushSize = 7;
  let lastX = 0;
  let lastY = 0;

  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = brushSize;
  ctx.strokeStyle = $("#brushColor")?.value || "#e63946";

  function getPoint(event) {
    const rect = canvas.getBoundingClientRect();
    const source = event.touches ? event.touches[0] : event;

    return {
      x: (source.clientX - rect.left) * (canvas.width / rect.width),
      y: (source.clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function start(event) {
    event.preventDefault();
    const point = getPoint(event);

    drawing = true;
    lastX = point.x;
    lastY = point.y;
  }

  function draw(event) {
    if (!drawing) return;

    event.preventDefault();
    const point = getPoint(event);

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = $("#brushColor")?.value || "#e63946";

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    lastX = point.x;
    lastY = point.y;
  }

  function stop() {
    drawing = false;
  }

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", draw);
  window.addEventListener("mouseup", stop);

  canvas.addEventListener("touchstart", start, { passive: false });
  canvas.addEventListener("touchmove", draw, { passive: false });
  window.addEventListener("touchend", stop);

  $("#thinBrush")?.addEventListener("click", () => {
    brushSize = 4;
  });

  $("#thickBrush")?.addEventListener("click", () => {
    brushSize = 14;
  });

  $("#clearCanvas")?.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
}
/* /=== SKETCH CANVAS END ===/ */


/* /=== APP INIT START ===/ */
document.querySelectorAll(".paint-well").forEach((button) => {
  button.addEventListener("click", () => switchSection(button.dataset.section));
});

switchSection("shop");
updateCartUI();
/* /=== APP INIT END ===/ */