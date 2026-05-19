/* /=== CONFIG START ===/ */
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
    fulfillment: "Ships directly from Lester or can be arranged for local pickup.",
    bg: "linear-gradient(135deg,#e63946,#fcbf49,#f77f00)",
    description: "Bold warm acrylic movement with layered texture.",
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
    fulfillment: "Lester orders this from the print company after confirming the order.",
    bg: "linear-gradient(135deg,#277da1,#7b2cbf,#201510)",
    description: "Museum-style print with dreamy blue movement.",
    printOptions: [
      { label: "8 × 10 in", price: 45 },
      { label: "12 × 18 in", price: 65 },
      { label: "16 × 20 in", price: 85 },
      { label: "24 × 36 in", price: 145 }
    ]
  },
  {
    id: "garden-wall-rhythm",
    title: "Garden Wall Rhythm",
    category: "print",
    type: "Fine Art Print",
    price: 65,
    size: "Select size",
    available: true,
    fulfillment: "Lester orders this from the print company after confirming the order.",
    bg: "linear-gradient(135deg,#2a9d8f,#277da1,#fcbf49)",
    description: "Colorful, playful print with soft brush motion.",
    printOptions: [
      { label: "8 × 10 in", price: 45 },
      { label: "12 × 18 in", price: 65 },
      { label: "16 × 20 in", price: 85 },
      { label: "24 × 36 in", price: 145 }
    ]
  },
  {
    id: "neighborhood-light-original",
    title: "Neighborhood Light",
    category: "original",
    type: "Original Painting",
    price: 1200,
    size: "30 × 40 in",
    available: true,
    fulfillment: "Ships directly from Lester or can be arranged for local pickup.",
    bg: "linear-gradient(135deg,#f77f00,#e63946,#7b2cbf)",
    description: "One-of-one statement piece full of local color.",
    printOptions: []
  }
];

const DISCOUNT_CODES = {
  LOCAL10: { rate: 0.1, reason: "10% local neighborhood discount" },
  ARTIST10: { rate: 0.1, reason: "10% artist community discount" },
  LESTER15: { rate: 0.15, reason: "15% special Lester print discount" }
};
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

function getSelectedProduct() {
  const select = $("#productSelect");
  return products.find((product) => product.id === select?.value) || products[0];
}

function getDiscount(product) {
  const zip = $("#zipCode")?.value.trim() || "";
  const isLocal = $("#isLocal")?.checked || LOCAL_DISCOUNT_ZIPS.includes(zip);
  const isArtist = $("#isArtist")?.checked;

  if (product.type !== "Fine Art Print") {
    return { rate: 0, reason: "Discounts apply to prints only." };
  }

  if (isLocal) return { rate: 0.15, reason: "15% neighborhood local print discount." };
  if (isArtist) return { rate: 0.1, reason: "10% artist community print discount." };

  return { rate: 0, reason: "No discount selected." };
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
          <p>Original paintings, fine art prints, and artist tools created to inspire.</p>
        </div>

        <button class="cart-pill" type="button">
          🛒 Cart <span id="cartCount">0</span>
          <strong id="cartTotalMini">$0.00</strong>
        </button>
      </section>

      <section class="shop-toolbar">
        <div class="shop-tabs">
          <button class="shop-tab active" data-filter="all">All Items</button>
          <button class="shop-tab" data-filter="Original Painting">Original Paintings</button>
          <button class="shop-tab" data-filter="Fine Art Print">Fine Art Prints</button>
          <button class="shop-tab" data-filter="Artist Tool">Artist Tools</button>
        </div>

        <select id="shopSort">
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </section>

      <section class="shop-grid mockup-shop-grid" id="shopGrid"></section>

      <div class="shipping-banner">
        🚚 Free shipping on orders over $100 within the U.S.
      </div>

      <form class="order-form" id="orderForm">
        <h3 style="margin:0;">Order Sheet</h3>

        <label for="productSelect">Selected artwork</label>
        <select id="productSelect" required></select>

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

        <div class="total-box" id="totalBox"></div>

        <button class="btn btn-primary" type="submit">Create Email Order Sheet</button>
      </form>
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

  canvas.innerHTML = sections[sectionName] ? sections[sectionName]() : sections.home();

  document.querySelectorAll(".paint-well").forEach((button) => {
    button.classList.toggle("active", button.dataset.section === sectionName);
  });

  safeScrollTop();

  if (sectionName === "shop") initShop();
  if (sectionName === "tools") initTools();
}
/* /=== SECTION SWITCHING END ===/ */


/* /=== SHOP START ===/ */
function initShop() {
  const shopGrid = $("#shopGrid");
  const productSelect = $("#productSelect");

  renderShopProducts(products);

  productSelect.innerHTML = products
    .map((product) => `<option value="${product.id}">${product.title} — ${product.type} — ${money(product.price)}</option>`)
    .join("");

  document.querySelectorAll(".shop-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".shop-tab").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter;
      const filteredProducts = filter === "all"
        ? products
        : products.filter((product) => product.type === filter);

      renderShopProducts(filteredProducts);
    });
  });

  $("#shopSort").addEventListener("change", (event) => {
    const sorted = [...products];

    if (event.target.value === "low") sorted.sort((a, b) => a.price - b.price);
    if (event.target.value === "high") sorted.sort((a, b) => b.price - a.price);

    renderShopProducts(sorted);
  });

  ["#productSelect", "#zipCode", "#isLocal", "#isArtist"].forEach((selector) => {
    $(selector).addEventListener("input", updateTotal);
    $(selector).addEventListener("change", updateTotal);
  });

  $("#orderForm").addEventListener("submit", buildOrderEmail);

  updateTotal();

  function renderShopProducts(productList) {
    shopGrid.innerHTML = productList.map((product) => `
      <article class="product-card">
        <div class="product-art" data-type="${product.type}" style="--bg-art:${product.bg};"></div>

        <div class="product-body">
          <h3>${product.title}</h3>
          <p class="section-copy">${product.description}</p>

          <div class="product-meta">
            <span>${product.size}</span>
            <span class="price">${money(product.price)}</span>
          </div>

          <p class="section-copy">
            <strong>${product.type}</strong><br>
            ${product.fulfillment}
          </p>

          <button class="btn btn-primary btn-small" data-product="${product.id}" type="button">
            Select Piece
          </button>
        </div>
      </article>
    `).join("");

    document.querySelectorAll("[data-product]").forEach((button) => {
      button.addEventListener("click", () => {
        productSelect.value = button.dataset.product;
        updateTotal();
        $("#orderForm").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }
}

function updateTotal() {
  const product = getSelectedProduct();
  const discount = getDiscount(product);
  const discountAmount = product.price * discount.rate;
  const subtotal = product.price - discountAmount;

  $("#totalBox").innerHTML = `
    <div>Selected: ${product.title}</div>
    <div>Base price: ${money(product.price)}</div>
    <div>Discount: ${money(discountAmount)} — ${discount.reason}</div>
    <div>Estimated subtotal before shipping/tax: ${money(subtotal)}</div>
  `;

  const cartCount = $("#cartCount");
  const cartTotalMini = $("#cartTotalMini");

  if (cartCount) cartCount.textContent = "1";
  if (cartTotalMini) cartTotalMini.textContent = money(subtotal);
}

function buildOrderEmail(event) {
  event.preventDefault();

  const product = getSelectedProduct();
  const discount = getDiscount(product);
  const subtotal = product.price - product.price * discount.rate;

  const body = `NEW ORDER — Painting With Lester

PRODUCT
Title: ${product.title}
Type: ${product.type}
Size: ${product.size}
Base Price: ${money(product.price)}
Fulfillment: ${product.fulfillment}

DISCOUNT
Discount: ${discount.rate * 100}%
Reason: ${discount.reason}
Estimated subtotal before shipping/tax: ${money(subtotal)}

CUSTOMER
Name: ${$("#customerName").value}
Email: ${$("#customerEmail").value}
Phone: ${$("#customerPhone").value || "Not provided"}
Shipping Address: ${$("#shippingAddress").value}
City/State/ZIP: ${$("#cityStateZip").value}
ZIP used for discount check: ${$("#zipCode").value || "Not provided"}
Local neighborhood?: ${$("#isLocal").checked ? "Yes" : "No"}
Artist/Painter?: ${$("#isArtist").checked ? "Yes" : "No"}

NOTES
${$("#notes").value || "None"}

NEXT STEPS
1. Confirm availability.
2. Confirm final shipping/tax/payment details.
3. If print, order it from the printing company.
4. Send confirmation to customer.
`;

  window.location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(`New art order: ${product.title}`)}&body=${encodeURIComponent(body)}`;
}
/* /=== SHOP END ===/ */


/* /=== ARTIST TOOLS START ===/ */
function initTools() {
  $("#paletteBtn").addEventListener("click", generatePalette);
  $("#ratioBtn").addEventListener("click", calculateRatio);
  $("#promptBtn").addEventListener("click", generatePrompt);

  initSketchCanvas();
  generatePalette();
}

function generatePalette() {
  const colors = Array.from({ length: 5 }, () =>
    `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`
  );

  $("#paletteOutput").innerHTML = colors.map((color) => `
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
  const width = Number($("#canvasWidth").value);
  const height = Number($("#canvasHeight").value);

  if (!width || !height || width <= 0 || height <= 0) {
    $("#ratioOutput").textContent = "Enter a valid width and height.";
    return;
  }

  const divisor = gcd(width, height);
  $("#ratioOutput").textContent = `Simplified ratio: ${width / divisor}:${height / divisor}`;
}

function generatePrompt() {
  const moods = ["quiet", "electric", "neighborhood", "sun-soaked", "stormy", "joyful", "cinematic"];
  const subjects = ["alleyway", "porch light", "flower market", "city window", "old doorway", "jazz musician", "corner store"];
  const styles = ["with thick texture", "using only three colors", "as a dream scene", "with wild brush strokes", "in golden-hour light", "with one neon surprise"];

  const pick = (list) => list[Math.floor(Math.random() * list.length)];

  $("#promptOutput").textContent = `Paint a ${pick(moods)} ${pick(subjects)} ${pick(styles)}.`;
}
/* /=== ARTIST TOOLS END ===/ */


/* /=== SKETCH CANVAS START ===/ */
function initSketchCanvas() {
  const canvas = $("#sketchCanvas");
  const ctx = canvas.getContext("2d");

  let drawing = false;
  let brushSize = 7;
  let lastX = 0;
  let lastY = 0;

  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = brushSize;
  ctx.strokeStyle = $("#brushColor").value;

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
    ctx.strokeStyle = $("#brushColor").value;

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

  $("#thinBrush").addEventListener("click", () => {
    brushSize = 4;
  });

  $("#thickBrush").addEventListener("click", () => {
    brushSize = 14;
  });

  $("#clearCanvas").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
}
/* /=== SKETCH CANVAS END ===/ */


/* /=== APP INIT START ===/ */
document.querySelectorAll(".paint-well").forEach((button) => {
  button.addEventListener("click", () => switchSection(button.dataset.section));
});

switchSection("shop");
/* /=== APP INIT END ===/ */