'use client';

import { t } from "@/lib/t";
import { usePathname } from 'next/navigation';

export default function Hero() {
  const pathname = usePathname();
  const parts = pathname.split('/').filter(Boolean);
  const locale = parts[0] === 'en' ? 'en' : 'ua';

  return (
    <section className="text-center py-5 bg-white">
      <div className="container">
        <h1 className="text-5xl font-bold text-blue-900">
          {t(locale, "heroTitle")}
        </h1>
        <p className="lead text-secondary my-4">
          {t(locale, "heroText")}
        </p>
        <button className="btn btn-primary btn-lg">
          {t(locale, "cta")}
        </button>
      </div>
    </section>
  );
}