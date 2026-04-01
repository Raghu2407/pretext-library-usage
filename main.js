import { layout, prepare } from '@chenglou/pretext';

const widthSlider = document.getElementById('widthSlider');
const widthVal = document.getElementById('widthVal');
const domList = document.getElementById('domList');
const pretextList = document.getElementById('pretextList');
const domTimeDisplay = document.getElementById('domTime');
const pretextTimeDisplay = document.getElementById('pretextTime');

const ITEM_COUNT = 1000;
const TEXT = "This sentence is used to force the browser to calculate complex word-wrapping across multiple lines of text.";
const FONT = "14px sans-serif";
const LINE_HEIGHT = 21; // 1.5 line-height
const PADDING = 20; // 10px top + 10px bottom

const pretextHandles = [];

// --- INITIALIZATION ---
for (let i = 0; i < ITEM_COUNT; i++) {
  const content = `[${i}] ${TEXT}`;
  
  // Create DOM items for both sides
  const divDom = document.createElement('div');
  divDom.className = 'item';
  divDom.textContent = content;
  domList.appendChild(divDom);

  const divPre = document.createElement('div');
  divPre.className = 'item';
  divPre.textContent = content;
  pretextList.appendChild(divPre);

  // Prepare Pretext handle (The one-time cost)
  pretextHandles.push(prepare(content, FONT));
}

const allDomItems = domList.querySelectorAll('.item');

// --- THE COMPARISON CORE ---
widthSlider.addEventListener('input', (e) => {
  const width = parseInt(e.target.value);
  widthVal.textContent = width;

  // Set the width for both (This is a 'Write' operation)
  domList.style.width = width + 'px';
  pretextList.style.width = width + 'px';

  // 1. STANDARD DOM MEASUREMENT (The slow way)
  const t0 = performance.now();
  let domTotal = 0;
  allDomItems.forEach(item => {
    // Calling offsetHeight here triggers 'Forced Synchronous Layout'
    domTotal += item.offsetHeight; 
  });
  const t1 = performance.now();
  domTimeDisplay.textContent = (t1 - t0).toFixed(2);

  // 2. PRETEXT MEASUREMENT (The fast way)
  const t2 = performance.now();
  let pretextTotal = 0;
  for (let i = 0; i < ITEM_COUNT; i++) {
    // Pure math. No DOM access. No reflow.
    const result = layout(pretextHandles[i], width - 20, LINE_HEIGHT);
    pretextTotal += result.height + PADDING;
  }
  const t3 = performance.now();
  pretextTimeDisplay.textContent = (t3 - t2).toFixed(2);
});