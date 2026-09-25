import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initDatabase } from './server/db.js';
import { authRouter } from './server/routes/authRoutes.js';
import { syllabusRouter } from './server/routes/syllabusRoutes.js';
import { termRouter } from './server/routes/termRoutes.js';
import { mcqRouter } from './server/routes/mcqRoutes.js';
import { testRouter } from './server/routes/testRoutes.js';
import { mistakeRouter } from './server/routes/mistakeRoutes.js';
import { studyPlanRouter } from './server/routes/studyPlanRoutes.js';
import { bookmarkRouter } from './server/routes/bookmarkRoutes.js';
import { progressRouter } from './server/routes/progressRoutes.js';
import { notificationRouter } from './server/routes/notificationRoutes.js';
import { adminRouter } from './server/routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize SQLite database and verified syllabus data
initDatabase();

// Mount API routes
app.use('/api', authRouter);
app.use('/api', syllabusRouter);
app.use('/api', termRouter);
app.use('/api', mcqRouter);
app.use('/api/mcqs', mcqRouter);
app.use('/api', testRouter);
app.use('/api', mistakeRouter);
app.use('/api', studyPlanRouter);
app.use('/api', bookmarkRouter);
app.use('/api', progressRouter);
app.use('/api', notificationRouter);
app.use('/api', adminRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    system: 'ADC 2nd Semester Smart Exam Preparation System',
    timestamp: new Date().toISOString()
  });
});

// Dynamic SEO sitemap.xml
app.get('/sitemap.xml', (_req, res) => {
  const baseUrl = process.env.APP_URL || 'https://adcprep.pk';
  const subjects = [
    'business-communication',
    'pakistan-studies',
    'financial-accounting',
    'macro-economics',
    'business-statistics',
    'computer-application-in-business'
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/subjects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${subjects.map(slug => `
  <url>
    <loc>${baseUrl}/subjects/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// robots.txt
app.get('/robots.txt', (_req, res) => {
  const baseUrl = process.env.APP_URL || 'https://adcprep.pk';
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: ${baseUrl}/sitemap.xml\n`);
});

// Development or Production Frontend Serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ADC Prep Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
