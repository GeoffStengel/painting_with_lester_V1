let activeShopFilter = "all";

function openShopCategory(category) {
  activeShopFilter = category;
  switchSection("shop");
}

function initShop() {
  const grid = document.querySelector("#shopGrid");
  const filterButtons = [...document.querySelectorAll(".filter-btn")];

  if (!grid) return;

  function renderProducts(filter) {
    const filteredProducts =
      filter === "all"
        ? products
        : products.filter((product) => product.category === filter);

    grid.innerHTML = filteredProducts.map((product) => `
      <article class="product-card">
        <button class="product-image-btn" type="button" onclick="showProductDetail('${product.id}')">
          <img src="${product.image}" alt="${product.title}">
        </button>

        <div class="product-card-body">
          <span>${product.type}</span>
          <h3>${product.title}</h3>
          <p>${product.size}</p>
          <strong>$${product.price.toLocaleString()}</strong>

          <div class="product-actions">
            <button class="btn btn-dark" type="button" onclick="showProductDetail('${product.id}')">View</button>
            <button class="btn btn-primary" type="button" onclick="addToCart('${product.id}')">Add</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === activeShopFilter);

    button.addEventListener("click", () => {
      activeShopFilter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        btn.classList.toggle("active", btn === button);
      });

      renderProducts(activeShopFilter);
    });
  });

  renderProducts(activeShopFilter);
}

function showCart() {
  const canvas = document.querySelector("#contentCanvas");

  if (!canvas) return;

  const subtotal = getCartTotal();

  canvas.innerHTML = `
    <div class="content-section">
      <div class="cart-page">
        <button class="back-to-shop" type="button" onclick="switchSection('shop')">← Back to Shop</button>

        <h2 class="section-heading">Your Cart</h2>

        ${
          cart.length === 0
            ? `<p class="section-copy">Your cart is empty.</p>`
            : `
              <div class="cart-list">
                ${cart.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return "";

                  return `
                    <article class="cart-item">
                      <img src="${product.image}" alt="${product.title}">

                      <div>
                        <h3>${product.title}</h3>
                        <p>${product.type}</p>
                        <strong>$${product.price.toLocaleString()}</strong>
                      </div>

                      <input
                        type="number"
                        min="1"
                        value="${item.quantity}"
                        onchange="updateCartQuantity('${item.productId}', this.value)"
                      >

                      <button type="button" class="remove-btn" onclick="removeFromCart('${item.productId}')">
                        Remove
                      </button>
                    </article>
                  `;
                }).join("")}
              </div>

              <div class="cart-summary">
                <p>Subtotal</p>
                <strong>$${subtotal.toLocaleString()}</strong>
                <button class="btn btn-primary" type="button" onclick="showCheckout()">Start Checkout</button>
              </div>
            `
        }
      </div>
    </div>
  `;

  safeScrollTop();
}

function showProductDetail(productId) {
  const product = getProduct(productId);
  const canvas = document.querySelector("#contentCanvas");

  if (!product || !canvas) return;

  canvas.innerHTML = `
    <div class="content-section">
      <div class="product-detail-page">
        <button class="back-to-shop" type="button" onclick="switchSection('shop')">← Back to Shop</button>

        <section class="product-detail-grid">
          <div class="detail-gallery">
            <div class="detail-image-frame">
              <img src="${product.image}" alt="${product.title}">
            </div>
          </div>

          <div class="detail-info">
            <p class="eyebrow">${product.type}</p>
            <h2>${product.title}</h2>
            <p class="detail-price">$${product.price.toLocaleString()}</p>
            <p>${product.description}</p>
            <p><strong>Size:</strong> ${product.size}</p>
            <p><strong>Fulfillment:</strong> ${product.fulfillment}</p>

            <div class="tag-row">
              ${product.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>

            <div class="detail-actions">
              <button class="qty-btn" type="button" onclick="adjustDetailQty(-1)">−</button>
              <span id="detailQty">1</span>
              <button class="qty-btn" type="button" onclick="adjustDetailQty(1)">+</button>
            </div>

            <button
              class="btn btn-primary"
              type="button"
              onclick="addDetailItemToCart('${product.id}')"
              ${product.available ? "" : "disabled"}
            >
              ${product.available ? "Add to Cart" : "Sold"}
            </button>
          </div>
        </section>
      </div>
    </div>
  `;

  safeScrollTop();
}

function adjustDetailQty(change) {
  const qtyEl = document.querySelector("#detailQty");

  if (!qtyEl) return;

  const currentQty = Number(qtyEl.textContent) || 1;
  const nextQty = Math.max(1, currentQty + change);

  qtyEl.textContent = nextQty;
}

function addDetailItemToCart(productId) {
  const qtyEl = document.querySelector("#detailQty");
  const quantity = Number(qtyEl?.textContent) || 1;

  for (let i = 0; i < quantity; i += 1) {
    addToCart(productId);
  }

  showCart();
}

function showCheckout() {
  const canvas = document.querySelector("#contentCanvas");

  if (!canvas) return;

  if (cart.length === 0) {
    showCart();
    return;
  }

  canvas.innerHTML = `
    <div class="content-section">
      <div class="checkout-page">
        <button class="back-to-shop" type="button" onclick="showCart()">← Back to Cart</button>

        <p class="eyebrow">Checkout</p>
        <h2 class="section-heading">Request Purchase</h2>
        <p class="section-copy">
          This creates an email order request. Lester can confirm availability, delivery, and payment details.
        </p>

        <form id="checkoutForm" class="checkout-form">
          <label>
            Name
            <input name="name" required>
          </label>

          <label>
            Email
            <input name="email" type="email" required>
          </label>

          <label>
            ZIP Code
            <input name="zip" required>
          </label>

          <label>
            Notes
            <textarea name="notes" rows="4" placeholder="Pickup, delivery questions, framing requests, etc."></textarea>
          </label>

          <button class="btn btn-primary" type="submit">Email Order Request</button>
        </form>

        <p id="checkoutMessage" class="tool-output"></p>
      </div>
    </div>
  `;

  document.querySelector("#checkoutForm")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const zip = String(formData.get("zip") || "").trim();
    const notes = String(formData.get("notes") || "").trim();

    const message = document.querySelector("#checkoutMessage");

    if (!name || !email || !zip) {
      if (message) message.textContent = "Please fill out name, email, and ZIP.";
      return;
    }

    window.location.href = buildOrderEmail({ name, email, zip, notes });

    if (message) {
      message.textContent = "Your email app should open with the order request.";
    }
  });

  safeScrollTop();
}