import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://centropicasso.it',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://centropicasso.it/contatti',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://centropicasso.it/servizi',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://centropicasso.it/login',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
    },
    {
      url: 'https://centropicasso.it/agenda',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
    },
    {
      url: 'https://centropicasso.it/clinica',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
    },
    {
      url: 'https://centropicasso.it/dashboard',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
    },
    {
      url: 'https://centropicasso.it/operatoriLista',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
    },
    {
      url: 'https://centropicasso.it/prestazioniLista',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
    },
    {
      url: 'https://centropicasso.it/sediLista',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.1,
    },
  ]
}