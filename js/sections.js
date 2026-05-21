/* /=== PAGE SECTION TEMPLATES START ===/ */
const sections = {
  /* /=== HOME SECTION TEMPLATE START ===/ */
  home: () => `
    <div class="content-section home-section">
      <div class="home-hero">
        <p class="eyebrow">Painting with Lester</p>
        <h1>Expressive prints, Colorful originals & creative tools.</h1>
        <p class="section-copy">
          Explore Lester's artwork, shop available pieces, or play with artist tools made for collectors and creatives.
        </p>

        <div class="home-actions">
          <button class="btn btn-primary" onclick="switchSection('shop')">Shop the Collection</button>
          <button class="btn btn-dark" onclick="switchSection('gallery')">View Gallery</button>
        </div>

        <div class="home-stats">
          <button class="home-stat-card" onclick="openShopCategory('original')">
            <strong id="originalCount">00</strong>
            <span>Originals</span>
          </button>

          <button class="home-stat-card" onclick="openShopCategory('print')">
            <strong id="printCount">00</strong>
            <span>Prints</span>
          </button>

          <button class="home-stat-card" onclick="switchSection('tools')">
            <strong>03</strong>
            <span>Artist Tools</span>
          </button>
        </div>
      </div>

      <a
  href="#"
  class="home-art-window home-art-button"
  onclick="showProductDetail('${products[0].id}'); return false;"
  aria-label="View ${products[0].title}"
>
  <img
    src="${products[0].image}"
    alt="${products[0].title}"
  >

  <span class="home-art-cta">
    View ${products[0].title}
  </span>
</a>

    </div>
  `,
  /* /=== HOME SECTION TEMPLATE END ===/ */


/* /=== GALLERY SECTION TEMPLATE START ===/ */
gallery: () => {
  const allGalleryItems = [
    ...products.map((product) => ({
      id: product.id,
      title: product.title,
      image: product.image,
      medium: product.type,
      size: product.size,
      year: "Available"
    })),

    ...galleryArtwork.map((artwork) => ({
      id: artwork.id,
      title: artwork.title,
      image: artwork.image,
      medium: artwork.medium,
      size: artwork.size,
      year: artwork.year
    }))
  ];

  return `
    <div class="content-section">
      <p class="eyebrow">Gallery</p>

      <h2 class="section-heading">
        Featured Artwork
      </h2>

      <p class="section-copy">
        A rotating look at Lester's originals, prints, and studio work.
      </p>

      <div class="gallery-grid">
        ${allGalleryItems.map((artwork) => `
          <article
            class="gallery-card"
            onclick="openGalleryLightbox(
              '${artwork.image}',
              '${artwork.title}',
              '${artwork.medium}',
              '${artwork.size}',
              '${artwork.year}'
            )"
          >
            <img
              src="${artwork.image}"
              alt="${artwork.title}"
            >

            <div>
              <span>${artwork.medium}</span>

              <h3>${artwork.title}</h3>

              <small>
                ${artwork.size} • ${artwork.year}
              </small>
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  `;
},
/* /=== GALLERY SECTION TEMPLATE END ===/ */


  /* /=== SHOP SECTION TEMPLATE START ===/ */
  shop: () => `
    <div class="content-section">
      <div class="section-topline">
        <div>
          <p class="eyebrow">Shop</p>
          <h2 class="section-heading">Available Work</h2>
        </div>

        <button class="cart-button" onclick="showCart()">
          Cart <span id="cartCount">0</span>
        </button>
      </div>

      <div class="shop-filters">
        <button class="filter-btn" data-filter="all">All</button>
        <button class="filter-btn" data-filter="original">Originals</button>
        <button class="filter-btn" data-filter="print">Prints</button>
      </div>

      <div class="shop-grid" id="shopGrid"></div>
    </div>
  `,
  /* /=== SHOP SECTION TEMPLATE END ===/ */


  /* /=== TOOLS SECTION TEMPLATE START ===/ */
  tools: () => `
    <div class="content-section">
      <p class="eyebrow">Artist Tools</p>
      <h2 class="section-heading">Creative Playground</h2>
      <p class="section-copy">
        Quick tools for color inspiration, canvas ratios, and painting prompts.
      </p>

      <div class="tools-grid">
        <!-- /=== COLOR PALETTE GENERATOR START ===/ -->
        <section class="tool-card palette-tool-card">
          <h3>Color Palette Generator</h3>

          <div class="palette-controls">
            <label>
              Base Color
              <input id="baseColor" type="color" value="#37ACE6">
            </label>

            <label>
              Harmony
              <select id="paletteMode">
                <option value="analogous">Analogous</option>
                <option value="monochromatic">Monochromatic</option>
                <option value="complementary">Complementary</option>
                <option value="split">Split Complementary</option>
                <option value="triadic">Triadic</option>
                <option value="tetradic">Tetradic</option>
                <option value="primary">Primary Colors</option>
                <option value="secondary">Secondary Colors</option>
                <option value="warm">Warm Colors</option>
                <option value="cool">Cool Colors</option>
                <option value="grayscale">Grayscale</option>
              </select>
            </label>
          </div>

          <button class="btn btn-primary" onclick="generatePalette()">
            Generate Palette
          </button>

          <div class="generated-palette" id="generatedPalette"></div>
        </section>
        <!-- /=== COLOR PALETTE GENERATOR END ===/ -->


        <!-- /=== CANVAS RATIO HELPER START ===/ -->
        <section class="tool-card ratio-tool-card">
          <h3>Canvas Ratio Helper</h3>

          <p class="tool-hint">
            Enter a canvas size to simplify the ratio, preview the shape, and find common matching sizes.
          </p>

          <div class="input-row">
            <label>
              Width
              <input id="ratioWidth" type="number" min="1" value="24" placeholder="24">
            </label>

            <label>
              Height
              <input id="ratioHeight" type="number" min="1" value="36" placeholder="36">
            </label>
          </div>

          <button class="btn btn-dark" onclick="calculateRatio()">
            Analyze Canvas
          </button>

          <div class="ratio-results" id="ratioResults" hidden>
            <div class="ratio-preview-wrap">
              <div class="ratio-preview" id="ratioPreview"></div>
            </div>

            <div class="ratio-info">
              <p id="ratioOutput" class="tool-output"></p>
              <p id="orientationOutput" class="tool-output"></p>
              <p id="matchesOutput" class="tool-output"></p>
            </div>
          </div>
        </section>
        <!-- /=== CANVAS RATIO HELPER END ===/ -->


        <!-- /=== PAINTING PROMPT GENERATOR START ===/ -->
        <section class="tool-card">
          <h3>Painting Prompt</h3>

          <button class="btn btn-primary" onclick="generatePrompt()">
            New Prompt
          </button>

          <p id="promptOutput" class="tool-output"></p>
        </section>
        <!-- /=== PAINTING PROMPT GENERATOR END ===/ -->


        <!-- /=== MINI SKETCH PAD START ===/ -->
        <section class="tool-card sketch-tool">
          <h3>Mini Sketch Pad</h3>

          <canvas id="sketchCanvas" width="500" height="320"></canvas>

          <div class="sketch-controls">
            <input type="color" id="brushColor" value="#37ACE6">
            <button id="thinBrush" class="btn btn-dark" type="button">Thin</button>
            <button id="thickBrush" class="btn btn-dark" type="button">Thick</button>
            <button id="clearCanvas" class="btn btn-primary" type="button">Clear</button>
          </div>
        </section>
        <!-- /=== MINI SKETCH PAD END ===/ -->
      </div>
    </div>
  `,
  /* /=== TOOLS SECTION TEMPLATE END ===/ */


  /* /=== ABOUT SECTION TEMPLATE START ===/ */
  about: () => `
    <div class="content-section about-section">
      <p class="eyebrow">About</p>
      <h2 class="section-heading">Meet Lester</h2>
      <p class="section-copy">
        Lester creates expressive paintings filled with movement, color, and story.
        This shop brings originals, prints, and creative tools together in one playful collector-friendly space.
      </p>

      <div class="about-card">
        <p>The artist grew up surrounded by the masterpieces within the Brandywine River Museum. With his mother working there, all major family events and Christmas parties were celebrated there. The artist’s childhood familiarity with the world’s greatest collection of the Wyeth family (N.C. Wyeth, Andrew Wyeth, and Jamie Wyeth) paintings nourish his work. Since early youth, the artist excelled in drawing.


The artist studied art at the Pima Community College in Tucson, AZ for three years before traveling throughout Europe where he was influenced by the architecture, sculpture, and paintings of Italy, Germany, Netherlands, Spain, and England. Still very young (23), the artist moved to Eugene, Oregon and found his true artistic muse. Energized by the progressive, yet offbeat community of Eugene, he painted dozens of plein air oil paintings of his community and the surrounding area. He began using soft pastels to paint live performances like poetry slams and concerts and then found himself sought after to ‘perform’ as an artist at a large array of venues, from festivals to social events, from Seattle to Tucson.


After the COVID pandemic Lester created a series of portraits he called the Faces of Eugene series with acrylic paint. “Its been too long since we have seen each other’s faces.” In this series the artist captures from life portraits of his community members in Eugene. Often taking 4-6 hours to complete portraits with good company and conversation. The Artist capturing dozens of portraits to bring life back to normal with in his community.

Lester continues to experiment with the acrylic medium playing with using a broom as a brush the Artist worked on a series of paintings on recycled pallet liner board.


In the beginning of 2026 the artist created a YouTube art show. following the wake of two ICE executions of American citizens. The show “Painting With Lester”. Created with the intent to show the world that people who disagree with the ICE crackdown are regular folks. A message contrary to what media has suggested. “It’s a shame that good people with good intent be slandered as a enemy figure.”


This artist believes that capturing a moment within that moment (single live session) makes his work stand out as pure in the expression of the human experience.</p>
      </div>
    </div>
  `,
  /* /=== ABOUT SECTION TEMPLATE END ===/ */


  /* /=== SOCIALS SECTION TEMPLATE START ===/ */
  socials: () => `
    <div class="content-section">
      <p class="eyebrow">Socials</p>
      <h2 class="section-heading">Follow the Paint Trail</h2>
      <p class="section-copy">Connect with Lester online.</p>

      <div class="social-grid">
        <a class="social-card" href="https://www.facebook.com/share/1D2u9ogUT1/?mibextid=wwXIfr" target="_blank" rel="noreferrer">
          <span class="emoji">👍</span>
          <strong>Facebook</strong>
          <p class="section-copy">Studio news and collector updates.</p>
        </a>

        <a class="social-card" href="https://youtube.com/@maurerstudio?si=ynjCpVtCo7f8jU31" target="_blank" rel="noreferrer">
          <span class="emoji">▶️</span>
          <strong>YouTube</strong>
          <p class="section-copy">Videos, process, and painting moments.</p>
        </a>

        <a class="social-card" href="https://www.instagram.com/lester.maurer" target="_blank" rel="noreferrer">
          <span class="emoji">📸</span>
          <strong>Instagram</strong>
          <p class="section-copy">Daily art and updates.</p>
        </a>
      </div>
    </div>
  `,
  /* /=== SOCIALS SECTION TEMPLATE END ===/ */
};
/* /=== PAGE SECTION TEMPLATES END ===/ */

/* /=== GALLERY LIGHTBOX START ===/ */
function openGalleryLightbox(image, title, medium, size, year) {
  const lightbox = document.createElement("div");

  lightbox.className = "gallery-lightbox";
  lightbox.innerHTML = `
    <button class="gallery-lightbox-close" type="button" aria-label="Close full size image">×</button>

    <div class="gallery-lightbox-inner">
      <img src="${image}" alt="${title}">

      <div class="gallery-lightbox-caption">
        <h3>${title}</h3>
        <p>${medium} • ${size} • ${year}</p>
      </div>
    </div>
  `;

  lightbox.addEventListener("click", (event) => {
    if (
      event.target === lightbox ||
      event.target.classList.contains("gallery-lightbox-close")
    ) {
      lightbox.remove();
    }
  });

  document.body.appendChild(lightbox);
}
/* /=== GALLERY LIGHTBOX END ===/ */


/* /=== HOME COUNTS START ===/ */
function updateHomeCounts() {
  const originals = products.filter((product) => product.category === "original").length;
  const prints = products.filter((product) => product.category === "print").length;

  const originalEl = document.querySelector("#originalCount");
  const printEl = document.querySelector("#printCount");

  if (originalEl) originalEl.textContent = String(originals).padStart(2, "0");
  if (printEl) printEl.textContent = String(prints).padStart(2, "0");
}
/* /=== HOME COUNTS END ===/ */