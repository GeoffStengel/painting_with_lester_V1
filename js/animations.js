/* /=== PALETTE GSAP ANIMATIONS START ===/ */
function initPaletteAnimations() {
  const palette = document.querySelector("#mainPalette");

  if (!palette || typeof gsap === "undefined") return;

  gsap.fromTo(
    palette,
    {
      opacity: 0,
      y: 18,
      rotate: -3,
      scale: 0.96
    },
    {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      duration: 0.9,
      ease: "power3.out"
    }
  );

  gsap.to(palette, {
    y: -4,
    rotate: 0.5,
    duration: 3.2,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 0.9
  });
}
/* /=== PALETTE GSAP ANIMATIONS END ===/ */

/* /=== PALETTE WELL ANIMATIONS START ===/ */
function animatePaletteWells() {
  const paletteObject = document.querySelector("#paletteSvg");

  if (!paletteObject || typeof gsap === "undefined") return;

  function runWellAnimations() {
    const svgDoc = paletteObject.contentDocument;

    if (!svgDoc) return;

    const layers = [
      svgDoc.getElementById("layer5"),
      svgDoc.getElementById("layer6"),
      svgDoc.getElementById("layer8"),
      svgDoc.getElementById("layer9"),
      svgDoc.getElementById("layer10"),
      svgDoc.getElementById("layer11")
    ].filter(Boolean);

    layers.forEach((layer) => {
      layer.style.transformBox = "fill-box";
      layer.style.transformOrigin = "center";
    });

    /* /=== PAGE LOAD WELCOME SEQUENCE START ===/ */
    const welcomeTimeline = gsap.timeline({
      delay: 0.35
    });

    welcomeTimeline.to(layers, {
      scale: 1.12,
      y: -8,
      filter: "brightness(1.38) saturate(1.25) drop-shadow(0 0 18px rgba(255,255,255,.8))",
      duration: 0.34,
      stagger: 0.16,
      ease: "back.out(2)"
    });

    welcomeTimeline.to(layers, {
      scale: 1,
      y: 0,
      filter: "brightness(1.04) drop-shadow(0 0 5px rgba(255,255,255,.18))",
      duration: 0.42,
      stagger: 0.1,
      ease: "power2.out"
    });
    /* /=== PAGE LOAD WELCOME SEQUENCE END ===/ */


    /* /=== SUBTLE IDLE GLOW START ===/ */
    gsap.to(layers, {
      filter: "brightness(1.12) saturate(1.08) drop-shadow(0 0 8px rgba(255,255,255,.26))",
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      stagger: 0.22,
      ease: "sine.inOut",
      delay: 2
    });
    /* /=== SUBTLE IDLE GLOW END ===/ */


    /* /=== HOVER RESPONSE START ===/ */
    layers.forEach((layer) => {
      layer.addEventListener("mouseenter", () => {
        gsap.to(layer, {
          scale: 1.1,
          y: -6,
          filter: "brightness(1.42) saturate(1.3) drop-shadow(0 0 20px rgba(255,255,255,.85))",
          duration: 0.2,
          ease: "power2.out"
        });
      });

      layer.addEventListener("mouseleave", () => {
        gsap.to(layer, {
          scale: 1,
          y: 0,
          filter: "brightness(1.08) drop-shadow(0 0 6px rgba(255,255,255,.22))",
          duration: 0.28,
          ease: "power2.out"
        });
      });
    });
    /* /=== HOVER RESPONSE END ===/ */
  }

  paletteObject.addEventListener("load", runWellAnimations);

  if (paletteObject.contentDocument) {
    runWellAnimations();
  }
}
/* /=== PALETTE WELL ANIMATIONS END ===/ */