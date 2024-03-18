import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', "/contatti", "/servizi"],
      disallow: ["/login/", '/agenda/', "/clinica/", "/dashboard/", "/operatoriLista/", "/prestazioniLista/", "sediLista"],
    },
    sitemap: 'https://centropicasso.it/sitemap.xml',
  }
}