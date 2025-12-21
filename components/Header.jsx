"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { t } from "@/lib/t";
import LangSwitch from "./LangSwitch";

export default function Header() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

  const dropdownRef = useRef(null);

  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;

    const updateBehavior = () => {
      if (window.innerWidth < 1025) {
        el.setAttribute("data-bs-toggle", "dropdown");
      } else {
        el.removeAttribute("data-bs-toggle");
        el.removeAttribute("aria-expanded");
      }
    };

    updateBehavior();
    window.addEventListener("resize", updateBehavior);

    return () => {
      window.removeEventListener("resize", updateBehavior);
    };
  }, []);

  return (
    <header className="navbar navbar-expand-custom navbar-light bg-light shadow-sm ps-2 pe-2">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <Image
            src="/logo.png"
            alt="MindSpark Logo"
            width={50}
            height={45}
            className="me-2 rounded"
          />
          <Link
            href={`/${locale}`}
            className="navbar-brand fw-bold text-dark fs-3 mb-0"
          >
            MindSpark
          </Link>
        </div>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item dropdown">
              <span
                ref={dropdownRef}
                className="nav-link dropdown-toggle text-dark px-3 fs-5 fw-semibold"
                id="whatWeDoDropdown"
                role="button"
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
      </div>
    </header>
  );
}
