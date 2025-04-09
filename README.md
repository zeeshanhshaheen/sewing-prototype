
This web app allows users to upload **front** and **back** SVG-based sewing patterns, define corresponding sewing pairs between edges in 2D, and generate an **interactive 3D visualization** of the assembled garment piece using Three.js.

## ✨ Features

- Upload SVG sewing patterns (front and back)
- Click to define sewing point pairs across both pieces
- Visualize the stitched result in 3D space
- Seam preview with clear lines and color-coded markers
- Orbit controls for rotating, zooming, and panning

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/zeeshanhshaheen/sewing-prototype.git
cd sewing-3d-assembler
```

2. Install Dependencies
Make sure you have Node.js (v18+) installed.

```bash
npm install
```

3. Run the Development Server
```bash

npm run dev
```

Open http://localhost:3000 in your browser.

Project Structure
```bash

/components
  ├── pattern-uploader.tsx        # SVG uploader for front and back pieces
  ├── two-d-pattern-view.tsx      # Interactive 2D pairing interface
  └── enhanced-three-d-preview.tsx# 3D visualization using Three.js
/pages
  └── index.tsx                   # Main UI layout
```


