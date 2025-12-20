"use client";

import Link from "next/link";
import Image from "next/image";
import LangSwitch from "./LangSwitch";

export default function Header({ locale = "ua" }) {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <div className="container-fluid d-flex align-items-center">
        <Image
          src="/logo.png"
          alt="MindSpark Logo"
          width={55}
          height={50}
          className="me-2 rounded"
        />

        <Link
          href={`/${locale}`}
          className="navbar-brand fw-bold text-dark fs-2"
        >
          MindSpark
        </Link>

        <ul className="navbar-nav ms-auto d-flex flex-row align-items-center">
          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle text-dark px-3 fs-5 fw-semibold"
              id="whatWeDoDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            >
              Що ми робимо
            </span>
            <ul className="dropdown-menu" aria-labelledby="whatWeDoDropdown">
              <li>
                <Link
                  href={`/${locale}/createLLMassistants`}
                  className="dropdown-item fw-semibold"
                >
                  Створюємо LLM-асистентів
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/developAIsolutions`}
                  className="dropdown-item fw-semibold"
                >
                  Розробляємо AI-рішення
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link
              href={`/${locale}/blog`}
              className="nav-link text-dark px-3 fs-5 fw-semibold"
            >
              Блог
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href={`/${locale}/about`}
              className="nav-link text-dark px-3 fs-5 fw-semibold"
            >
              Про нас
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href={`/${locale}/contact`}
              className="nav-link text-dark px-3 fs-5 fw-semibold"
            >
              Контакти
            </Link>
          </li>
          <li className="nav-item d-flex align-items-center">
            <LangSwitch locale={locale} />
          </li>
        </ul>
      </div>
    </header>
  );
}
