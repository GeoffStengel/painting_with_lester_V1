/* /=== SHOP STATE START ===/ */
/*
  Tracks which shop filter is active.
  Used by homepage stat buttons and shop filter buttons.
*/
let activeShopFilter = "all";
/* /=== SHOP STATE END ===/ */


/* /=== SHOP CATEGORY NAV START ===/ */
/*
  Lets buttons outside the shop open a specific category.
  Example: homepage "Prints" button.
*/
function openShopCategory(category) {
  activeShopFilter = category;
  switchSection("shop");
}
/* /=== SHOP CATEGORY NAV END ===/ */


/* /=== SHOP GRID START ===/ */
/*
  Renders product cards in the Shop section.
  Product detail page handles print-size options.
*/
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
        <button
          class="product-image-btn"
          type="button"
          onclick="showProductDetail('${product.id}')"
        >
          <img src="${product.image}" alt="${product.title}">
        </button>

        <div class="product-card-body">
          <span>${product.type}</span>
          <h3>${product.title}</h3>
          <p>${product.size}</p>
          <p class="product-availability">
            ${
              product.printOptions?.length
                ? "Multiple print sizes available"
                : "Original artwork available"
            }
          </p>

          <div class="product-actions">
            <button
              class="btn btn-dark"
              type="button"
              onclick="showProductDetail('${product.id}')"
            >
              View
            </button>

            <button
              class="btn btn-primary"
              type="button"
              onclick="showProductDetail('${product.id}')"
            >
              Choose Options
            </button>
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
/* /=== SHOP GRID END ===/ */


/* /=== PRINT OPTION HELPERS START ===/ */
/*
  Print products can have multiple size/price options.
  Originals usually do not, so they fall back to product.size/product.price.
*/
function getSelectedPrintOption(product) {
  const select = document.querySelector("#printOptionSelect");

  if (!product.printOptions?.length || !select) {
    return {
      label: product.size,
      price: product.price
    };
  }

  return product.printOptions[Number(select.value)] || product.printOptions[0];
}

function updatePrintOptionPrice(productId) {
  const product = getProduct(productId);
  const priceEl = document.querySelector("#detailPrice");
  const sizeEl = document.querySelector("#detailSelectedSize");

  if (!product || !priceEl) return;

  const selectedOption = getSelectedPrintOption(product);

  priceEl.textContent = `$${selectedOption.price.toLocaleString()}`;

  if (sizeEl) {
    sizeEl.textContent = selectedOption.label;
  }
}
/* /=== PRINT OPTION HELPERS END ===/ */


/* /=== PRODUCT DETAIL START ===/ */
/*
  Shows one artwork/product.
  If printOptions exist, user picks size before adding to cart.
  Image uses gallery lightbox for full-size preview.
*/
function showProductDetail(productId) {
  const product = getProduct(productId);
  const canvas = document.querySelector("#contentCanvas");

  if (!product || !canvas) return;

  const hasPrintOptions = product.printOptions?.length > 0;
  const startingOption = hasPrintOptions
    ? product.printOptions[0]
    : { label: product.size, price: product.price };

  canvas.innerHTML = `
    <div class="content-section">
      <div class="product-detail-page">
        <button
          class="back-to-shop"
          type="button"
          onclick="switchSection('shop')"
        >
          ← Back to Shop
        </button>

        <section class="product-detail-grid">
          <div class="detail-gallery">
            <button
              class="detail-image-frame detail-image-button"
              type="button"
              onclick="openGalleryLightbox(
                '${product.image}',
                '${product.title}',
                '${product.type}',
                '${product.size}',
                'Available'
              )"
            >
              <img src="${product.image}" alt="${product.title}">
              <span>Click to view full size</span>
            </button>
          </div>

          <div class="detail-info">
            <p class="eyebrow">${product.type}</p>

            <h2>${product.title}</h2>

            <p class="detail-price" id="detailPrice">
              $${startingOption.price.toLocaleString()}
            </p>

            <p>${product.description}</p>

            ${
              hasPrintOptions
                ? `
                  <label class="print-option-picker">
                    Print Size

                    <select
                      id="printOptionSelect"
                      onchange="updatePrintOptionPrice('${product.id}')"
                    >
                      ${product.printOptions.map((option, index) => `
                        <option value="${index}">
                          ${option.label} — $${option.price.toLocaleString()}
                        </option>
                      `).join("")}
                    </select>
                  </label>

                  <p>
                    <strong>Selected Size:</strong>
                    <span id="detailSelectedSize">${startingOption.label}</span>
                  </p>
                `
                : `
                  <p>
                    <strong>Size:</strong> ${product.size}
                  </p>
                `
            }

            <p>
              <strong>Fulfillment:</strong> ${product.fulfillment}
            </p>

            <div class="tag-row">
              ${product.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>

            <div class="detail-actions">
              <button
                class="qty-btn"
                type="button"
                onclick="adjustDetailQty(-1)"
              >
                −
              </button>

              <span id="detailQty">1</span>

              <button
                class="qty-btn"
                type="button"
                onclick="adjustDetailQty(1)"
              >
                +
              </button>
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
/* /=== PRODUCT DETAIL END ===/ */


/* /=== DETAIL QUANTITY START ===/ */
/*
  Quantity selector on product detail page.
  Cart-level maxQty is still enforced in cart.js.
*/
function adjustDetailQty(change) {
  const qtyEl = document.querySelector("#detailQty");

  if (!qtyEl) return;

  const currentQty = Number(qtyEl.textContent) || 1;
  const nextQty = Math.max(1, currentQty + change);

  qtyEl.textContent = nextQty;
}
/* /=== DETAIL QUANTITY END ===/ */


/* /=== ADD DETAIL ITEM TO CART START ===/ */
/*
  Adds selected print option to cart.
  For originals/no options, selectedOption falls back to product price and size.
*/
function addDetailItemToCart(productId) {
  const product = getProduct(productId);
  const qtyEl = document.querySelector("#detailQty");

  if (!product) return;

  const selectedOption = getSelectedPrintOption(product);
  const quantity = Number(qtyEl?.textContent) || 1;

  for (let i = 0; i < quantity; i += 1) {
    addToCart(productId, selectedOption);
  }

  showCart();
}
/* /=== ADD DETAIL ITEM TO CART END ===/ */


/* /=== CART PAGE START ===/ */
/*
  Displays cart contents.
  Shows selected print size/price when present.
*/
function showCart() {
  const canvas = document.querySelector("#contentCanvas");

  if (!canvas) return;

  const subtotal = getCartTotal();

  canvas.innerHTML = `
    <div class="content-section">
      <div class="cart-page">
        <button
          class="back-to-shop"
          type="button"
          onclick="switchSection('shop')"
        >
          ← Back to Shop
        </button>

        <h2 class="section-heading">Your Cart</h2>

        ${
          cart.length === 0
            ? `<p class="section-copy">Your cart is empty.</p>`
            : `
              <div class="cart-list">
                ${cart.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return "";

                  const itemPrice = item.selectedPrice || product.price;
                  const itemSize = item.selectedSize || product.size;

                  return `
                    <article class="cart-item">
                      <img src="${product.image}" alt="${product.title}">

                      <div>
                        <h3>${product.title}</h3>
                        <p>${product.type}</p>
                        <p><strong>Size:</strong> ${itemSize}</p>
                        <strong>$${itemPrice.toLocaleString()}</strong>
                      </div>

                      <input
                        type="number"
                        min="1"
                        value="${item.quantity}"
                        onchange="updateCartQuantity('${item.productId}', this.value, '${itemSize}')"
                      >

                      <button
                        type="button"
                        class="remove-btn"
                        onclick="removeFromCart('${item.productId}', '${itemSize}')"
                      >
                        Remove
                      </button>
                    </article>
                  `;
                }).join("")}
              </div>

              <div class="cart-summary">
                <p>Subtotal</p>
                <strong>$${subtotal.toLocaleString()}</strong>

                <button
                  class="btn btn-primary"
                  type="button"
                  onclick="showCheckout()"
                >
                  Start Checkout
                </button>
              </div>
            `
        }
      </div>
    </div>
  `;

  safeScrollTop();
}
/* /=== CART PAGE END ===/ */


/* /=== CHECKOUT START ===/ */
/*
  Simple checkout request via email.
  Lester will confirm availability/shipping and send one Square invoice/payment link.
*/
function showCheckout() {
  const canvas = document.querySelector("#contentCanvas");

  if (!canvas) return;

  if (cart.length === 0) {
    showCart();
    return;
  }

  const checkoutSummary = `
    <div class="checkout-summary">
      ${cart.map((item) => {
        const product = getProduct(item.productId);

        if (!product) return "";

        const itemPrice = item.selectedPrice || product.price;
        const itemSize = item.selectedSize || product.size;

        return `
          <div class="checkout-summary-item">
            <img src="${product.image}" alt="${product.title}">

            <div>
              <h4>${product.title}</h4>
              <p>${itemSize}</p>
              <p>Qty ${item.quantity}</p>
            </div>

            <strong>
              $${(itemPrice * item.quantity).toLocaleString()}
            </strong>
          </div>
        `;
      }).join("")}

      <div class="checkout-summary-total">
        <span>Estimated Total</span>
        <strong>$${getCartTotal().toLocaleString()}</strong>
      </div>
    </div>
  `;

  canvas.innerHTML = `
    <div class="content-section">
      <div class="checkout-page">
        <button
          class="back-to-shop"
          type="button"
          onclick="showCart()"
        >
          ← Back to Cart
        </button>

        <p class="eyebrow">Checkout</p>

        <h2 class="section-heading">
          Request Purchase
        </h2>

        <p class="section-copy">
          Review your order below, then send Lester an order request.
          Lester will confirm availability, shipping, and send one secure Square invoice for payment.
        </p>

        ${checkoutSummary}

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
            <textarea
              name="notes"
              rows="4"
              placeholder="Pickup, delivery questions, requests, etc."
            ></textarea>
          </label>

          <button class="btn btn-primary" type="submit">
            Send Order Request
          </button>
        </form>

        <div id="checkoutMessage" class="tool-output"></div>
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
      if (message) {
        message.textContent = "Please fill out name, email, and ZIP.";
      }

      return;
    }

    submitOrderRequest({
      name,
      email,
      zip,
      notes,
      message
    });

    if (message) {
      message.innerHTML = `
        <div class="checkout-success">
          <span class="success-check">✓</span>

          <div>
            <strong>Order Request Ready</strong>
            <p>
              Your email app should open with your artwork request.
              Lester will follow up with availability and one Square payment invoice.
            </p>
          </div>
        </div>
      `;
    }
  });

  safeScrollTop();
}
/* /=== CHECKOUT END ===/ */

/* /=== ORDER REQUEST SUBMIT START ===/ */
async function submitOrderRequest({ name, email, zip, notes, message }) {
  const orderDetails = buildOrderEmailBody({
    name,
    email,
    zip,
    notes
  });

  const formData = new FormData();

  formData.append("Customer Name", name);
  formData.append("Customer Email", email);
  formData.append("Customer ZIP", zip);
  formData.append("Customer Notes", notes || "None");
  formData.append("Estimated Subtotal", `$${getCartTotal().toLocaleString()}`);
  formData.append("Order Sheet", orderDetails);
  formData.append("_subject", `New Painting With Lester Order - ${name}`);

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Formspree request failed.");
    }

    cart = [];
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartUI();

    if (message) {
      message.innerHTML = `
        <div class="checkout-success">
          <span class="success-check">✓</span>

          <div>
            <strong>Order Request Sent</strong>
            <p>
              Lester received your request. He will confirm availability,
              shipping, and send one secure Square invoice for payment.
            </p>
          </div>
        </div>
      `;
    }
  } catch {
    if (message) {
      message.textContent =
        "Something went wrong sending the order. Please try again or contact Lester directly.";
    }
  }
}
/* /=== ORDER REQUEST SUBMIT END ===/ */