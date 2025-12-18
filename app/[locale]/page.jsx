import Hero from "./sections/Hero";
import { locales } from '@/lib/i18n'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default function Home({ params }) {
  return <Hero locale={params.locale} />
}