let activeSection = "home";

function safeScrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function switchSection(sectionName) {
  const canvas = document.querySelector("#contentCanvas");

  if (!canvas) return;

  activeSection = sections[sectionName] ? sectionName : "home";
  canvas.innerHTML = sections[activeSection]();

  setSvgPaletteActive(activeSection);
  safeScrollTop();

  if (activeSection === "shop") initShop();
  if (activeSection === "tools") initTools();

  updateCartUI();
  updateHomeCounts();
}

function initMobileMenu() {
  const menuToggle = document.querySelector("#menuToggle");
  const socialMenu = document.querySelector("#socialMenu");

  menuToggle?.addEventListener("click", () => {
    socialMenu?.classList.toggle("open");
  });
}

initMobileMenu();
initSvgPalette();
switchSection("home");
updateCartUI();
updateHomeCounts();