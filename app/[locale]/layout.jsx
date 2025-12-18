import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { locales } from '@/lib/i18n'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.locale === 'ua' ? 'uk' : 'en'}>
      <body className="antialiased">
        <Header locale={params.locale} />
        <main>{children}</main>
        <Footer locale={params.locale} />
      </body>
    </html>
  )
}
