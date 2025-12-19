import Hero from "../sections/Hero";
import { locales } from "@/lib/i18n";

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function Home({ params }) {
  const locale = params?.locale ?? 'ua';
  return <Hero />;
}
