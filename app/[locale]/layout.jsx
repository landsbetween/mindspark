import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { locales } from '@/lib/i18n'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default function LocaleLayout({ children, params }) {
  return (
    <>
      <Header locale={params.locale} />
      <main className="antialiased">
        {children}
      </main>
      <Footer locale={params.locale} />
    </>
  )
}
