import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Studio Dentistico Centro Picasso',
    short_name: 'Centro Picasso',
    description: "Centro Picasso - Il tuo studio dentistico di fiducia a Sant'Antimo. Offriamo cure odontoiatriche di alta qualità, incluse pulizie dentali, trattamenti per le carie e procedimenti cosmetici. Prenota una visita oggi stesso per un sorriso sano e luminoso! ",
    start_url: '/',
    display: 'browser',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}