/* /=== TOOLS PAGE INIT START ===/ */
function initTools() {
  initSketchCanvas();
  generatePalette();
}
/* /=== TOOLS PAGE INIT END ===/ */


/* /=== COLOR PALETTE GENERATOR START ===/ */
/*
  Future ideas:
  - Add "save palette" to localStorage
  - Add downloadable ASE/Adobe Swatch support later
  - Add color contrast checker for accessibility
*/

function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;

    s = l > .5
      ? delta / (2 - max - min)
      : delta / (max + min);

    if (max === r) h = (g - b) / delta + (g < b ? 6 : 0);
    if (max === g) h = (b - r) / delta + 2;
    if (max === b) h = (r - g) / delta + 4;

    h *= 60;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (value) => {
    return Math.round((value + m) * 255)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rotateHue(hue, amount) {
  return (hue + amount + 360) % 360;
}

function buildPaletteColors(baseHex, mode) {
  const base = hexToHsl(baseHex);

  const palettes = {
    analogous: [
      [rotateHue(base.h, -40), base.s, 52],
      [rotateHue(base.h, -20), base.s, 56],
      [base.h, base.s, base.l],
      [rotateHue(base.h, 20), base.s, 56],
      [rotateHue(base.h, 40), base.s, 52]
    ],

    monochromatic: [
      [base.h, base.s, 25],
      [base.h, base.s, 38],
      [base.h, base.s, 50],
      [base.h, base.s, 64],
      [base.h, base.s, 78]
    ],

    complementary: [
      [base.h, base.s, 42],
      [base.h, base.s, 58],
      [rotateHue(base.h, 180), base.s, 42],
      [rotateHue(base.h, 180), base.s, 58],
      [base.h, 20, 88]
    ],

    split: [
      [base.h, base.s, 52],
      [rotateHue(base.h, 150), base.s, 50],
      [rotateHue(base.h, 210), base.s, 50],
      [rotateHue(base.h, 150), 70, 72],
      [rotateHue(base.h, 210), 70, 72]
    ],

    triadic: [
      [base.h, base.s, 52],
      [rotateHue(base.h, 120), base.s, 52],
      [rotateHue(base.h, 240), base.s, 52],
      [base.h, 50, 78],
      [rotateHue(base.h, 120), 50, 78]
    ],

    tetradic: [
      [base.h, base.s, 50],
      [rotateHue(base.h, 90), base.s, 50],
      [rotateHue(base.h, 180), base.s, 50],
      [rotateHue(base.h, 270), base.s, 50],
      [base.h, 25, 86]
    ],

    primary: [
      [0, 85, 55],
      [55, 95, 55],
      [220, 85, 55],
      [0, 55, 78],
      [220, 55, 78]
    ],

    secondary: [
      [28, 90, 55],
      [125, 65, 45],
      [280, 75, 58],
      [28, 70, 78],
      [280, 55, 78]
    ],

    warm: [
      [0, 80, 55],
      [18, 90, 55],
      [38, 95, 56],
      [50, 95, 60],
      [340, 80, 58]
    ],

    cool: [
      [175, 70, 45],
      [200, 80, 50],
      [225, 75, 55],
      [260, 70, 60],
      [285, 65, 62]
    ],

    grayscale: [
      [base.h, 0, 18],
      [base.h, 0, 34],
      [base.h, 0, 50],
      [base.h, 0, 68],
      [base.h, 0, 86]
    ]
  };

  return (palettes[mode] || palettes.analogous).map(([h, s, l]) => {
    return {
      hex: hslToHex(h, s, l),
      hsl: `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`
    };
  });
}

function copyColor(value) {
  navigator.clipboard?.writeText(value);
}

function generatePalette() {
  const palette = document.querySelector("#generatedPalette");
  const baseColor = document.querySelector("#baseColor")?.value || "#e63946";
  const mode = document.querySelector("#paletteMode")?.value || "analogous";

  if (!palette) return;

  const colors = buildPaletteColors(baseColor, mode);

  palette.innerHTML = colors.map((color) => `
    <button
      class="color-chip"
      type="button"
      style="background:${color.hex}"
      onclick="copyColor('${color.hex}')"
      title="Click to copy ${color.hex}"
    >
      <span>
        <strong>${color.hex}</strong>
        <small>${color.hsl}</small>
      </span>
    </button>
  `).join("");
}
/* /=== COLOR PALETTE GENERATOR END ===/ */


/* /=== CANVAS RATIO HELPER START ===/ */
/*
  Future ideas:
  - Add inches/cm toggle
  - Add print size recommendations
  - Add frame/mat size suggestions
  - Add "scale this canvas up/down" feature
*/

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function getOrientation(width, height) {
  if (width === height) return "Square";
  return width > height ? "Landscape" : "Portrait";
}

function getCommonCanvasMatches(width, height) {
  const commonSizes = [
    [5, 7],
    [8, 10],
    [9, 12],
    [11, 14],
    [12, 16],
    [16, 20],
    [18, 24],
    [20, 24],
    [20, 30],
    [24, 30],
    [24, 36],
    [30, 40],
    [36, 48],
    [40, 60]
  ];

  const divisor = gcd(width, height);
  const simpleW = width / divisor;
  const simpleH = height / divisor;

  return commonSizes.filter(([w, h]) => {
    const sizeDivisor = gcd(w, h);

    return w / sizeDivisor === simpleW && h / sizeDivisor === simpleH;
  });
}

function calculateRatio() {
  const width = Number(document.querySelector("#ratioWidth")?.value);
  const height = Number(document.querySelector("#ratioHeight")?.value);

  const results = document.querySelector("#ratioResults");
  const preview = document.querySelector("#ratioPreview");
  const ratioOutput = document.querySelector("#ratioOutput");
  const orientationOutput = document.querySelector("#orientationOutput");
  const matchesOutput = document.querySelector("#matchesOutput");

  if (!results || !preview || !ratioOutput || !orientationOutput || !matchesOutput) return;

  if (!width || !height || width <= 0 || height <= 0) {
    results.hidden = false;
    preview.style.aspectRatio = "1 / 1";
    preview.textContent = "?";
    ratioOutput.textContent = "Enter a valid width and height.";
    orientationOutput.textContent = "";
    matchesOutput.textContent = "";
    return;
  }

  const divisor = gcd(width, height);
  const simplifiedWidth = width / divisor;
  const simplifiedHeight = height / divisor;
  const orientation = getOrientation(width, height);
  const matches = getCommonCanvasMatches(width, height);

  preview.style.aspectRatio = `${width} / ${height}`;
  preview.textContent = `${width} × ${height}`;

  ratioOutput.textContent = `Simplified ratio: ${simplifiedWidth}:${simplifiedHeight}`;
  orientationOutput.textContent = `Orientation: ${orientation}`;

  matchesOutput.textContent = matches.length
    ? `Common matching sizes: ${matches.map(([w, h]) => `${w}×${h}`).join(", ")}`
    : "No exact common size matches found. Custom size vibes.";

  results.hidden = false;
}
/* /=== CANVAS RATIO HELPER END ===/ */


/* /=== PAINTING PROMPT GENERATOR START ===/ */
/*
  Future ideas:
  - Add mood selector
  - Add subject selector
  - Add difficulty levels
  - Add "copy prompt" button
*/

function generatePrompt() {
  const output = document.querySelector("#promptOutput");

  if (!output) return;

  const moods = [
    "quiet",
    "electric",
    "neighborhood",
    "sun-soaked",
    "stormy",
    "joyful",
    "cinematic"
  ];

  const subjects = [
    "alleyway",
    "porch light",
    "flower market",
    "city window",
    "old doorway",
    "jazz musician",
    "corner store"
  ];

  const styles = [
    "with thick texture",
    "using only three colors",
    "as a dream scene",
    "with wild brush strokes",
    "in golden-hour light",
    "with one neon surprise"
  ];

  const pick = (list) => list[Math.floor(Math.random() * list.length)];

  output.textContent = `Paint a ${pick(moods)} ${pick(subjects)} ${pick(styles)}.`;
}
/* /=== PAINTING PROMPT GENERATOR END ===/ */


/* /=== MINI SKETCH PAD START ===/ */
/*
  Future ideas:
  - Add eraser mode
  - Add undo button
  - Add save/download sketch
  - Add brush size slider
*/

function initSketchCanvas() {
  const canvas = document.querySelector("#sketchCanvas");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  let drawing = false;
  let brushSize = 10;
  let lastX = 0;
  let lastY = 0;

  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = brushSize;
  ctx.strokeStyle = document.querySelector("#brushColor")?.value || "#e63946";

  function getPoint(event) {
    const rect = canvas.getBoundingClientRect();
    const source = event.touches ? event.touches[0] : event;

    return {
      x: (source.clientX - rect.left) * (canvas.width / rect.width),
      y: (source.clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function start(event) {
    event.preventDefault();

    const point = getPoint(event);

    drawing = true;
    lastX = point.x;
    lastY = point.y;
  }

  function draw(event) {
    if (!drawing) return;

    event.preventDefault();

    const point = getPoint(event);

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = document.querySelector("#brushColor")?.value || "#e63946";

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    lastX = point.x;
    lastY = point.y;
  }

  function stop() {
    drawing = false;
  }

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", draw);
  window.addEventListener("mouseup", stop);

  canvas.addEventListener("touchstart", start, { passive: false });
  canvas.addEventListener("touchmove", draw, { passive: false });
  window.addEventListener("touchend", stop);

  document.querySelector("#thinBrush")?.addEventListener("click", () => {
    brushSize = 4;
  });

  document.querySelector("#thickBrush")?.addEventListener("click", () => {
    brushSize = 14;
  });

  document.querySelector("#clearCanvas")?.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
}
/* /=== MINI SKETCH PAD END ===/ */