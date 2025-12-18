'use client'

import Link from "next/link";
import LangSwitch from "./LangSwitch";

export default function Header({ locale = "ua" }) {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <div className="container-fluid">
        <Link href={`/${locale}`} className="navbar-brand text-primary fw-bold">
          MindSpark
        </Link>

        <div className="d-flex ms-auto">
          <Link
            href={`/${locale}/about`}
            className="nav-link text-primary px-2"
          >
            Про нас
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="nav-link text-primary px-2"
          >
            Контакти
          </Link>

          <LangSwitch locale={locale} />
        </div>
      </div>
    </header>
  );
}
