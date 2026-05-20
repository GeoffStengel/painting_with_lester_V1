/* /=== APP STATE START ===/ */
let activeSection = "shop";
/* /=== APP STATE END ===/ */


/* /=== SCROLL HELPER START ===/ */
function safeScrollTop() {
  const isMobile = window.matchMedia("(max-width: 1060px)").matches;
  const contentCanvas = document.querySelector("#contentCanvas");

  requestAnimationFrame(() => {
    if (isMobile && contentCanvas) {
      const topbar = document.querySelector(".topbar");
      const topbarHeight = topbar?.offsetHeight || 0;
      const targetY =
        contentCanvas.getBoundingClientRect().top +
        window.scrollY -
        topbarHeight;

      window.scrollTo({
        top: targetY,
        behavior: "smooth"
      });

      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
/* /=== SCROLL HELPER END ===/ */


/* /=== SECTION SWITCHER START ===/ */
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
function initMobileMenu() {
  const menuToggle = document.querySelector("#menuToggle");
  const mainNav = document.querySelector("#mainNav");

  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("open");

    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}
/* /=== MOBILE NAV MENU END ===/ */


/* /=== APP INIT START ===/ */
initMobileMenu();
initSvgPalette();
switchSection("shop");
updateCartUI();
updateHomeCounts();
/* /=== APP INIT END ===/ */