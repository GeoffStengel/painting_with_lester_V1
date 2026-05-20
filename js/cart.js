let cart = [];

function getCartTotal() {
  return cart.reduce((total, item) => {
    const product = getProduct(item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

function getCartCount() {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

/* /=== ADD TO CART START ===/ */
function addToCart(productId) {
  const product = getProduct(productId);

  if (!product || !product.available) return;

  const existingItem = cart.find(
    (item) => item.productId === productId
  );

  const maxQty = product.maxQty || 99;

  if (existingItem) {
    if (existingItem.quantity >= maxQty) {
      alert(`Only ${maxQty} available for ${product.title}.`);
      return;
    }

    existingItem.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity: 1
    });
  }

  updateCartUI();
}
/* /=== ADD TO CART END ===/ */

function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  updateCartUI();
  showCart();
}

/* /=== UPDATE CART QUANTITY START ===/ */
function updateCartQuantity(productId, quantity) {
  const parsedQuantity = Number(quantity);

  const item = cart.find(
    (cartItem) => cartItem.productId === productId
  );

  const product = getProduct(productId);

  if (!item || !product) return;

  const maxQty = product.maxQty || 99;

  if (
    !Number.isInteger(parsedQuantity) ||
    parsedQuantity < 1
  ) {
    removeFromCart(productId);
    return;
  }

  if (parsedQuantity > maxQty) {
    item.quantity = maxQty;

    alert(`Only ${maxQty} available for ${product.title}.`);
  } else {
    item.quantity = parsedQuantity;
  }

  updateCartUI();
  showCart();
}
/* /=== UPDATE CART QUANTITY END ===/ */

/* /=== UPDATE CART UI START ===/ */
function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();

  document
    .querySelectorAll("#cartCount, .cart-count, [data-cart-count]")
    .forEach((element) => {
      element.textContent = count;
    });

  document
    .querySelectorAll("#cartTotalMini, .cart-total-mini, [data-cart-total]")
    .forEach((element) => {
      element.textContent = `$${total.toLocaleString()}`;
    });
}
/* /=== UPDATE CART UI END ===/ */

function buildOrderEmail({ name, email, zip, notes }) {
  const isLocal = LOCAL_DISCOUNT_ZIPS.includes(zip);
  const subtotal = getCartTotal();

  const localNote = isLocal
    ? "Local pickup/delivery discount may apply."
    : "Shipping or delivery will be confirmed.";

  const orderLines = cart
    .map((item) => {
      const product = getProduct(item.productId);
      if (!product) return "";

      return `${product.title} x ${item.quantity} - $${(
        product.price * item.quantity
      ).toLocaleString()}`;
    })
    .join("\n");

  const subject = encodeURIComponent(`Artwork Order Request from ${name}`);

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `ZIP: ${zip}`,
    "",
    "Order:",
    orderLines,
    "",
    `Subtotal: $${subtotal.toLocaleString()}`,
    localNote,
    "",
    "Notes:",
    notes || "None"
  ].join("\n");

  return `mailto:${ORDER_EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`;
}