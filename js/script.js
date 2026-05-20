/* /=== APP STATE START ===/ */
/*
  activeSection tracks the current page/section.
  Default is "shop" so users land directly on the artwork for sale.
*/
let activeSection = "shop";
/* /=== APP STATE END ===/ */


/* /=== SCROLL HELPER START ===/ */
/*
  Keeps section changes feeling like a new page load.
*/
function safeScrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
/* /=== SCROLL HELPER END ===/ */


/* /=== SECTION SWITCHER START ===/ */
/*
  This is the main page router.
  It swaps the content inside #contentCanvas using templates from sections.js.
*/
function switchSection(sectionName) {
  const canvas = document.querySelector("#contentCanvas");

  if (!canvas) return;

  activeSection = sections[sectionName] ? sectionName : "shop";
  canvas.innerHTML = sections[activeSection]();

  setSvgPaletteActive(activeSection);
  safeScrollTop();

  if (activeSection === "shop") {
    initShop();
  }

  if (activeSection === "tools") {
    initTools();
  }

  updateCartUI();
  updateHomeCounts();
}
/* /=== SECTION SWITCHER END ===/ */


/* /=== MOBILE NAV MENU START ===/ */
/*
  Opens/closes the top navigation on smaller screens.
  Uses #mainNav now instead of the old #socialMenu.
*/
function initMobileMenu() {
  const menuToggle = document.querySelector("#menuToggle");
  const mainNav = document.querySelector("#mainNav");

  menuToggle?.addEventListener("click", () => {
    mainNav?.classList.toggle("open");
  });
}
/* /=== MOBILE NAV MENU END ===/ */


/* /=== APP INIT START ===/ */
/*
  Startup order matters:
  1. Mobile menu
  2. SVG palette
  3. Initial section
  4. Cart/home UI numbers
*/
initMobileMenu();
initSvgPalette();
switchSection("shop");
updateCartUI();
updateHomeCounts();
/* /=== APP INIT END ===/ */