/* /=== CART STATE START ===/ */
/*
  Stores customer cart items.

  Print items can include:
  - selectedSize
  - selectedPrice

  Cart is saved to localStorage so it survives page refresh.
*/
let cart = [];
/* /=== CART STATE END ===/ */


/* /=== CART STORAGE START ===/ */
const CART_STORAGE_KEY = "paintingWithLesterCart";

function loadCart() {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!savedCart) return;

  try {
    cart = JSON.parse(savedCart);
  } catch {
    cart = [];
  }
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

loadCart();
/* /=== CART STORAGE END ===/ */


/* /=== CART TOTAL START ===/ */
function getCartTotal() {
  return cart.reduce((total, item) => {
    const product = getProduct(item.productId);
    const itemPrice = item.selectedPrice || product?.price || 0;

    return total + itemPrice * item.quantity;
  }, 0);
}
/* /=== CART TOTAL END ===/ */


/* /=== CART COUNT START ===/ */
function getCartCount() {
  return cart.reduce((count, item) => count + item.quantity, 0);
}
/* /=== CART COUNT END ===/ */


/* /=== ADD TO CART START ===/ */
function addToCart(productId, selectedOption = null) {
  const product = getProduct(productId);

  if (!product || !product.available) return;

  const selectedSize = selectedOption?.label || product.size;
  const selectedPrice = selectedOption?.price || product.price;

  const existingItem = cart.find((item) => {
    return item.productId === productId && item.selectedSize === selectedSize;
  });

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
      quantity: 1,
      selectedSize,
      selectedPrice
    });
  }

  updateCartUI();
}
/* /=== ADD TO CART END ===/ */


/* /=== REMOVE FROM CART START ===/ */
function removeFromCart(productId, selectedSize = "") {
  cart = cart.filter((item) => {
    if (!selectedSize) return item.productId !== productId;

    return !(
      item.productId === productId &&
      item.selectedSize === selectedSize
    );
  });

  updateCartUI();
  showCart();
}
/* /=== REMOVE FROM CART END ===/ */


/* /=== UPDATE CART QUANTITY START ===/ */
function updateCartQuantity(productId, quantity, selectedSize = "") {
  const parsedQuantity = Number(quantity);

  const item = cart.find((cartItem) => {
    if (!selectedSize) return cartItem.productId === productId;

    return (
      cartItem.productId === productId &&
      cartItem.selectedSize === selectedSize
    );
  });

  const product = getProduct(productId);

  if (!item || !product) return;

  const maxQty = product.maxQty || 99;

  if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
    removeFromCart(productId, selectedSize);
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
  saveCart();

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


/* /=== ORDER EMAIL BUILDER START ===/ */
function buildOrderEmailBody({ name, email, zip, notes }) {
  const subtotal = getCartTotal();

  const orderLines = cart.map((item, index) => {
    const product = getProduct(item.productId);

    if (!product) return "";

    const itemSize = item.selectedSize || product.size;
    const itemPrice = item.selectedPrice || product.price;
    const lineTotal = itemPrice * item.quantity;

    return [
      `${index + 1}. ${product.title}`,
      `   Type: ${product.type}`,
      `   Size: ${itemSize}`,
      `   Quantity: ${item.quantity}`,
      `   Unit Price: $${itemPrice.toLocaleString()}`,
      `   Line Total: $${lineTotal.toLocaleString()}`,
      `   Image/File: ${product.image}`,
      `   Fulfillment: ${product.fulfillment}`
    ].join("\n");
  }).join("\n\n");

  const printerSummary = cart.map((item, index) => {
    const product = getProduct(item.productId);

    if (!product) return "";

    const itemSize = item.selectedSize || product.size;

    return `${index + 1}. ${product.title} — ${itemSize} — Qty ${item.quantity}`;
  }).join("\n");

  const subject = encodeURIComponent(`Artwork Order Request from ${name}`);

  const body = [
    "PAINTING WITH LESTER — ORDER REQUEST",
    "===================================",
    "",
    "CUSTOMER INFO",
    "-------------",
    `Name: ${name}`,
    `Email: ${email}`,
    `ZIP Code: ${zip}`,
    "",
    "ORDER ITEMS",
    "-----------",
    orderLines,
    "",
    "ORDER TOTAL",
    "-----------",
    `Subtotal: $${subtotal.toLocaleString()}`,
    "Shipping/tax: To be confirmed by Lester",
    "Final total: To be confirmed before payment",
    "",
    "PRINTER-READY SUMMARY",
    "---------------------",
    printerSummary,
    "",
    "SQUARE PAYMENT STEP",
    "-------------------",
    "Lester: send one Square invoice/payment link for the confirmed total.",
    "Customer pays once after availability, shipping, and final total are confirmed.",
    "",
    "CUSTOMER NOTES",
    "--------------",
    notes || "None"
  ].join("\n");

  return body;
}
/* /=== ORDER EMAIL BUILDER END ===/ */