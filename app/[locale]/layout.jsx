import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BootstrapClient from '@/components/BootstrapClient'
import { locales } from '@/lib/i18n'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default function LocaleLayout({ children, params }) {
  return (
    <>
      <BootstrapClient />
      <Header />
      <main className="antialiased">
        {children}
      </main>
      <Footer />
    </>
  )
}
