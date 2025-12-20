"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { t } from "@/lib/t";
import LangSwitch from "./LangSwitch";

export default function Header() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

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
              {t(locale, "what_we_do")}
            </span>
            <ul className="dropdown-menu" aria-labelledby="whatWeDoDropdown">
              <li>
                <Link
                  href={`/${locale}/createLLMassistants`}
                  className="dropdown-item fw-semibold"
                >
                  {t(locale, "what_we_do_create")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/developAIsolutions`}
                  className="dropdown-item fw-semibold"
                >
                  {t(locale, "what_we_do_develop")}
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link
              href={`/${locale}/blog`}
              className="nav-link text-dark px-3 fs-5 fw-semibold"
            >
              {t(locale, "blog")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href={`/${locale}/about`}
              className="nav-link text-dark px-3 fs-5 fw-semibold"
            >
              {t(locale, "about")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href={`/${locale}/contact`}
              className="nav-link text-dark px-3 fs-5 fw-semibold"
            >
              {t(locale, "contact")}
            </Link>
          </li>
          <li className="nav-item d-flex align-items-center">
            <LangSwitch />
          </li>
        </ul>
      </div>
    </header>
  );
}
