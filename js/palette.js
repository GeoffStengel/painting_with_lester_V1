function getPaletteLabel(sectionName) {
  const labels = {
    home: "Home",
    gallery: "Gallery",
    shop: "Shop",
    tools: "Artist Tools",
    about: "About Lester",
    socials: "Socials"
  };

  return labels[sectionName] || sectionName;
}

function setSvgPaletteActive(sectionName) {
  const paletteObject = document.getElementById("paletteSvg");
  const svgDoc = paletteObject?.contentDocument;

  if (!svgDoc) return;

  svgDoc.querySelectorAll("[data-section]").forEach((layer) => {
    const isActive = layer.dataset.section === sectionName;
    const isHovered = layer.dataset.hovered === "true";

    layer.style.filter =
      isActive || isHovered
        ? "brightness(1.18) drop-shadow(0 0 12px rgba(255,255,255,.7))"
        : "";

    layer.style.outline = "none";
  });
}

function initSvgPalette() {
  const paletteObject = document.getElementById("paletteSvg");
  const tooltip = document.getElementById("paletteTooltip");

  if (!paletteObject) return;

  const sectionLayers = {
    layer5: "home",
    layer6: "tools",
    layer8: "shop",
    layer9: "socials",
    layer10: "about",
    layer11: "gallery"
  };

  function showTooltip(sectionName) {
    if (!tooltip) return;

    tooltip.textContent = getPaletteLabel(sectionName);
    tooltip.classList.add("visible");
  }

  function hideTooltip() {
    if (!tooltip) return;

    tooltip.classList.remove("visible");
  }

  function connectPalette() {
    const svgDoc = paletteObject.contentDocument;

    if (!svgDoc) return;

    Object.entries(sectionLayers).forEach(([layerId, sectionName]) => {
      const layer = svgDoc.getElementById(layerId);

      if (!layer) return;

      layer.dataset.section = sectionName;
      layer.style.cursor = "pointer";
      layer.style.transition = "filter 180ms ease";
      layer.style.outline = "none";

      layer.setAttribute("tabindex", "0");
      layer.setAttribute("role", "button");
      layer.setAttribute("aria-label", getPaletteLabel(sectionName));

      layer.addEventListener("click", () => {
        hideTooltip();
        switchSection(sectionName);
      });

      layer.addEventListener("mouseenter", () => {
        layer.dataset.hovered = "true";
        showTooltip(sectionName);
        setSvgPaletteActive(activeSection);
      });

      layer.addEventListener("mouseleave", () => {
        layer.dataset.hovered = "false";
        hideTooltip();
        setSvgPaletteActive(activeSection);
      });

      layer.addEventListener("focus", () => {
        layer.dataset.hovered = "true";
        showTooltip(sectionName);
        setSvgPaletteActive(activeSection);
      });

      layer.addEventListener("blur", () => {
        layer.dataset.hovered = "false";
        hideTooltip();
        setSvgPaletteActive(activeSection);
      });

      layer.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          hideTooltip();
          switchSection(sectionName);
        }
      });
    });

    setSvgPaletteActive(activeSection);
  }

  paletteObject.addEventListener("load", connectPalette);

  if (paletteObject.contentDocument) {
    connectPalette();
  }
}