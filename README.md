# ⚽ Alleycats Soccer Club — Official Website

Official website for Alleycats Soccer Club, built with Node.js, Express, and Handlebars.

🌐 **Live Site:** [alleycats-soccer.onrender.com](https://alleycats-soccer.onrender.com)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Server | Node.js + Express |
| Templates | Handlebars (HBS) |
| Styling | Vanilla CSS (custom design system) |
| JavaScript | Vanilla JS (no frameworks) |
| Hosting | Render.com (Free tier) |

---

## Project Structure

```
alleycats-soccer/
├── server.js                  ← Express server & route definitions
├── package.json
├── views/
│   ├── layouts/
│   │   └── main.hbs           ← Shared HTML shell (navbar + footer)
│   ├── index.hbs              ← Home page
│   ├── about.hbs
│   ├── coaches.hbs
│   ├── news.hbs
│   ├── match-recap.hbs        ← UPSL & Match Recaps
│   ├── values.hbs
│   ├── join.hbs
│   ├── faq.hbs
│   ├── college-recruiting.hbs
│   ├── coaching-resources.hbs
│   └── external-resources.hbs
└── public/
    ├── css/
    │   ├── style.css          ← Global design system (navbar, hero, home sections)
    │   ├── pages.css          ← Inner page components
    │   ├── hero.css           ← Unified inner-page hero styles
    │   └── [page].css         ← Page-specific stylesheets
    ├── js/
    │   ├── main.js            ← Scroll animations, navbar, slider, counters
    │   └── coaches.js         ← Coach modal logic
    └── images/
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the server

```bash
# Production
npm start

# Development (auto-restarts on file changes)
npm run dev
```

### 3. Open in browser
```
http://localhost:3000
```

---

## 🌐 Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About Us |
| `/values` | Values & Philosophy |
| `/coaches` | Coaching Staff & Directors |
| `/join` | Join the Cats |
| `/news` | Cats in the News |
| `/match-recap` | UPSL & Match Recaps |
| `/college-recruiting` | College Recruiting |
| `/coaching-resources` | Coaching Resources |
| `/external-resources` | External Resources |
| `/faq` | FAQ |
| `/contact` | Contact |

---

## Design System

**Colors**
```css
--navy:     #00142E   /* Primary brand dark */
--red:      #ED1A2B   /* Primary accent */
--white:    #FFFFFF
--offwhite: #F7F7F7
--gray:     #838383
```

**Fonts**
- `Pretendard` — Body / general text
- `Be Vietnam Pro` — Headings / store section
- `Inter` — Stats / scores / labels

---

## ☁️ Deployment (Render.com)

This project is deployed on [Render.com](https://render.com) using the free Web Service tier.

**Build Command:** `npm install`  
**Start Command:** `npm start`  
**Environment:** Node.js 18+

Any push to the `main` branch automatically triggers a redeployment.

> **Note:** The free tier spins down after 15 minutes of inactivity. The first request after idle may take 30–60 seconds to load.
