import { writeFileSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://fisio-movimiento.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// Definir todas las rutas del sitio
const routes = [
  // Homepage
  {
    loc: `${BASE_URL}/`,
    lastmod: CURRENT_DATE,
    changefreq: 'weekly',
    priority: '1.0',
  },
  // Secciones principales (hash routes)
  {
    loc: `${BASE_URL}/#inicio`,
    lastmod: CURRENT_DATE,
    changefreq: 'monthly',
    priority: '0.9',
  },
  {
    loc: `${BASE_URL}/#sobre-mi`,
    lastmod: CURRENT_DATE,
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    loc: `${BASE_URL}/#servicios`,
    lastmod: CURRENT_DATE,
    changefreq: 'monthly',
    priority: '0.9',
  },
  {
    loc: `${BASE_URL}/#precios`,
    lastmod: CURRENT_DATE,
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    loc: `${BASE_URL}/#opiniones`,
    lastmod: CURRENT_DATE,
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    loc: `${BASE_URL}/#faq`,
    lastmod: CURRENT_DATE,
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    loc: `${BASE_URL}/#contacto`,
    lastmod: CURRENT_DATE,
    changefreq: 'monthly',
    priority: '0.9',
  },
  // Páginas legales
  {
    loc: `${BASE_URL}/aviso-privacidad`,
    lastmod: CURRENT_DATE,
    changefreq: 'yearly',
    priority: '0.5',
  },
  {
    loc: `${BASE_URL}/politica-cancelacion`,
    lastmod: CURRENT_DATE,
    changefreq: 'yearly',
    priority: '0.5',
  },
  {
    loc: `${BASE_URL}/terminos-condiciones`,
    lastmod: CURRENT_DATE,
    changefreq: 'yearly',
    priority: '0.5',
  },
];

// Generar XML del sitemap
const generateSitemapXML = () => {
  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>
`;
};

// Generar y escribir el sitemap
const sitemapXML = generateSitemapXML();
const outputPath = join(process.cwd(), 'public', 'sitemap.xml');

writeFileSync(outputPath, sitemapXML, 'utf-8');
console.log(`✅ Sitemap generado: ${outputPath}`);
console.log(`   Fecha: ${CURRENT_DATE}`);
console.log(`   URLs: ${routes.length}`);
