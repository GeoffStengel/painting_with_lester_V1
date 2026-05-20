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

function addToCart(productId) {
  const product = getProduct(productId);

  if (!product || !product.available) return;

  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }

  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  updateCartUI();
  showCart();
}

function updateCartQuantity(productId, quantity) {
  const parsedQuantity = Number(quantity);

  if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
    removeFromCart(productId);
    return;
  }

  const item = cart.find((cartItem) => cartItem.productId === productId);

  if (!item) return;

  item.quantity = parsedQuantity;
  updateCartUI();
  showCart();
}

function updateCartUI() {
  const count = getCartCount();

  document.querySelectorAll("#cartCount, .cart-count").forEach((element) => {
    element.textContent = count;
  });
}

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