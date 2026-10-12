const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

// Handlebars
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Instagram feed (Instagram API with Instagram Login). Without INSTAGRAM_TOKEN the
// home page falls back to the static cards in index.hbs.
// ponytail: refreshed token lives in memory only; if the server stays down past the
// 60-day expiry, generate a new token and update INSTAGRAM_TOKEN.
let igToken = process.env.INSTAGRAM_TOKEN;
let igCache = { posts: null, at: 0 };
let igRefreshedAt = Date.now();

async function getInstagramPosts() {
  if (!igToken) return null;
  if (Date.now() - igCache.at < 60 * 60 * 1000) return igCache.posts;
  igCache.at = Date.now(); // set first so a failing API isn't hit on every request
  try {
    if (Date.now() - igRefreshedAt > 24 * 60 * 60 * 1000) {
      const r = await fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${igToken}`);
      if (r.ok) { igToken = (await r.json()).access_token; igRefreshedAt = Date.now(); }
    }
    const fields = 'caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count';
    const r = await fetch(`https://graph.instagram.com/me/media?fields=${fields}&limit=3&access_token=${igToken}`);
    if (!r.ok) throw new Error(`Instagram API ${r.status}`);
    const { data } = await r.json();
    igCache.posts = data.map((p, i) => {
      const caption = (p.caption || '').split('\n')[0];
      return {
        url: p.permalink,
        image: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
        caption: caption.length > 70 ? caption.slice(0, 67) + '..' : caption,
        date: new Date(p.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        likes: p.like_count,
        delay: i / 10,
      };
    });
  } catch (err) {
    console.error('Instagram fetch failed:', err.message); // keep last good posts
  }
  return igCache.posts;
}

// Page routes
app.get('/', async (req, res) => res.render('index', { title: 'Alleycats Soccer Club', instagram: await getInstagramPosts() }));
app.get('/about',               (req, res) => res.render('about',               { title: 'About Us | Alleycats Soccer Club' }));
app.get('/values',              (req, res) => res.render('values',              { title: 'Values & Philosophy | Alleycats Soccer Club' }));
app.get('/coaches',             (req, res) => res.render('coaches',             { title: 'Coaching Staff | Alleycats Soccer Club' }));
app.get('/join',                (req, res) => res.render('join',                { title: 'Join the Cats | Alleycats Soccer Club' }));
app.get('/news',                (req, res) => res.render('news',                { title: 'Cats in the News | Alleycats Soccer Club' }));
app.get('/match-recap',         (req, res) => res.render('match-recap',         { title: 'UPSL & Match Recaps | Alleycats Soccer Club' }));
app.get('/college-recruiting',  (req, res) => res.render('college-recruiting',  { title: 'College Recruiting | Alleycats Soccer Club' }));
app.get('/coaching-resources',  (req, res) => res.render('coaching-resources',  { title: 'Coaching Resources | Alleycats Soccer Club' }));
app.get('/external-resources',  (req, res) => res.render('external-resources',  { title: 'External Resources | Alleycats Soccer Club' }));
app.get('/contact',             (req, res) => res.render('contact',             { title: 'Contact | Alleycats Soccer Club' }));
app.get('/policies',            (req, res) => res.render('policies',            { title: 'Policies & Procedures | Alleycats Soccer Club' }));
app.get('/faq',                 (req, res) => res.render('faq',                 { title: "FAQ's | Alleycats Soccer Club" }));
app.get('/girls',               (req, res) => res.render('girls',               { title: 'Girls | Alleycats Soccer Club' }));
app.get('/fields',              (req, res) => res.render('fields',              { title: 'Fields | Alleycats Soccer Club' }));
app.get('/gallery',             (req, res) => res.render('gallery',             { title: 'Gallery | Alleycats Soccer Club' }));
app.get('/alumni',              (req, res) => res.render('alumni',              { title: 'Alumni | Alleycats Soccer Club' }));

// API routes
app.get('/api/news', (req, res) => {
  res.json([
    { id: 1, date: 'Jul 3, 2026',  title: "Bethlehem graduate Claire Hutton packs ESPN's U-21 Women's Soccer, girls to USWNT call-up", image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80', category: 'National Team' },
    { id: 2, date: 'Jul 5, 2026',  title: "Lopez, Casado, Thompson lead best U21 women's soccer players",                               image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=400&q=80', category: 'Rankings'      },
    { id: 3, date: 'Jul 12, 2026', title: 'Patience and possibility: Claire Hutton begins next chapter with Bay FC, USWNT',             image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=80', category: 'Pro Soccer'    },
  ]);
});

app.get('/api/coaches', (req, res) => {
  res.json([
    { id: 1, name: 'Skip Dawson',   role: 'Administrative Director',    image: null },
    { id: 2, name: 'Betsy Drambour',role: 'Technical Director',          image: null },
    { id: 3, name: 'Chris Le',      role: 'Director of Coaching',        image: null },
    { id: 4, name: 'Afrim Nezaj',   role: 'Founder/Executive Director',  image: null },
  ]);
});

app.listen(PORT, () => {
  console.log(`\n🐱 Alleycats Soccer Club server running!`);
  console.log(`   ➜ Local:   http://localhost:${PORT}`);
  console.log(`   ➜ Press Ctrl+C to stop\n`);
});
