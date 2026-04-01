# ⚡️ Pretext.js vs. Standard DOM: Performance Demo

This project is a side-by-side comparison demonstrating the performance impact of **Layout Thrashing** vs. **Mathematical Text Measurement** using [Pretext](https://github.com/chenglou/pretext).

## 🧐 The Problem: Forced Synchronous Layout
In the "Standard DOM" column, the app calculates the height of 1,000 items using `.offsetHeight`. 
Because this happens inside a loop after a width change, the browser is forced to re-calculate the layout 1,000 times per frame. 

**Result:** The UI freezes, the slider stutters, and frame times spike to **30ms–100ms**.

## 🚀 The Solution: Pretext.js
In the "Pretext" column, we use the Pretext library to calculate text wrapping using pure math.
* **No DOM Access:** It uses a canvas-based measurement cache.
* **Non-Blocking:** Calculations happen in JavaScript memory.
* **Result:** Frame times stay under **1ms**, maintaining a buttery-smooth 60fps.



## 🛠 Setup & Installation

1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   cd pretext-comparison