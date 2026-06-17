# 💰 EMI Calculator

A modern, production-ready EMI (Equated Monthly Installment) calculator built with **React + Vite + Tailwind CSS**. Calculate monthly EMI, total interest, and total payment for any loan — instantly.

![EMI Calculator Preview](./screenshots/preview.png)

---

## ✨ Features

- **Instant EMI Calculation** using the standard formula: `EMI = P × R × (1+R)^N / ((1+R)^N − 1)`
- **Interactive sliders** for all inputs — drag or type
- **Tenure selector** — switch between Years and Months
- **Beautiful results panel** with Monthly EMI, Total Interest, Total Payment, and Principal
- **Pie chart** showing Principal vs Interest breakdown (Recharts)
- **Interest ratio bar** for a quick visual split
- **Dark mode** — system preference respected, toggle-able
- **Copy results** to clipboard with one click
- **Real-time validation** with friendly error messages
- **Indian Rupee (₹)** currency formatting with `en-IN` locale
- **Fully responsive** — works on all screen sizes
- **Accessible** — keyboard navigable, ARIA labels, screen-reader friendly
- **SEO optimised** page title and meta description
- **Fast** — Vite build, zero external CSS frameworks loaded at runtime

---

## 🗂 Project Structure

```
emi-calculator/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── EMICalculator.jsx   # Main calculator UI
│   │   ├── EMIChart.jsx        # Recharts pie chart
│   │   ├── Header.jsx          # Top nav + dark mode toggle
│   │   ├── Footer.jsx          # Credits + CTA
│   │   ├── InputField.jsx      # Reusable input with slider
│   │   ├── LoadingSpinner.jsx  # SVG spinner
│   │   └── ResultCard.jsx      # Single metric card
│   ├── hooks/
│   │   ├── useEMI.js           # Calculation logic + state
│   │   └── useDarkMode.js      # Dark mode persistence
│   ├── utils/
│   │   └── formatters.js       # INR number formatters
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/emi-calculator.git
cd emi-calculator

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is in the `dist/` folder.

### Preview Production Build Locally

```bash
npm run preview
```

---

## ☁️ Deploy to Vercel (Free Hobby Plan)

### Option A — Vercel CLI (fastest)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy (follow prompts)
vercel

# Or deploy to production directly
vercel --prod
```

### Option B — Vercel Dashboard (no CLI needed)

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Vercel auto-detects **Vite** — no settings needed
5. Click **Deploy**

> The included `vercel.json` handles SPA routing automatically.

---

## 📸 Screenshots

> _Add screenshots here after deployment_

| Light Mode | Dark Mode |
|:---:|:---:|
| ![Light](./screenshots/light.png) | ![Dark](./screenshots/dark.png) |

---

## 🧮 EMI Formula

```
EMI = P × R × (1 + R)^N
      ─────────────────────
          (1 + R)^N − 1

P = Principal loan amount
R = Monthly interest rate  (Annual Rate ÷ 12 ÷ 100)
N = Total number of monthly installments
```

---

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| Recharts | Pie chart |
| Google Fonts | Sora + Inter + JetBrains Mono |

---

## 👤 Author

**Name:** Om Prakash Yadav  
**Email:** YOUR_EMAIL_HERE

---

## 🦸 Built for Digital Heroes

[![Built for Digital Heroes](https://img.shields.io/badge/Built%20for-Digital%20Heroes-3366ff?style=for-the-badge)](https://digitalheroesco.com)

Visit [digitalheroesco.com](https://digitalheroesco.com)

---

## 📄 License

MIT — free to use and modify.
