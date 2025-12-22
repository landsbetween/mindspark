"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { t } from "@/lib/t";
import LangSwitch from "./LangSwitch";

export default function Header() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

  const headerRef = useRef(null);
  const dropdownRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    return () => window.removeEventListener("resize", updateBehavior);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "ua";
  }, [locale]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const setHeaderHeightVar = () => {
      if (!headerRef.current) return;
      const h = headerRef.current.offsetHeight || 64;
      document.documentElement.style.setProperty("--ms-header-h", `${h}px`);
    };

    setHeaderHeightVar();
    window.addEventListener("resize", setHeaderHeightVar);
    return () => window.removeEventListener("resize", setHeaderHeightVar);
  }, []);

  useEffect(() => {
    const nav = document.getElementById("navbarNav");
    if (!nav) return;

    const onShown = () => setMenuOpen(true);
    const onHidden = () => setMenuOpen(false);

    nav.addEventListener("shown.bs.collapse", onShown);
    nav.addEventListener("hidden.bs.collapse", onHidden);

    return () => {
      nav.removeEventListener("shown.bs.collapse", onShown);
      nav.removeEventListener("hidden.bs.collapse", onHidden);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`navbar navbar-expand-custom navbar-light navbar-mindspark ${
        scrolled ? "is-sticky" : ""
      }`}
    >
      <div className="container">
        <div className="d-flex align-items-center">
          <Image
            src="/logo.png"
            alt="MindSpark Logo"
            width={45}
            height={40}
            className="me-2 rounded"
          />
          <Link
            href={`/${locale}`}
            className="navbar-brand fw-bold fs-3 mb-0 logo-color"
          >
            MindSpark
          </Link>
        </div>
        <button
          className={`navbar-toggler ms-auto ms-burger ${
            menuOpen ? "is-open" : ""
          }`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={menuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="ms-burger-line" />
          <span className="ms-burger-line" />
          <span className="ms-burger-line" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item dropdown">
              <span
                ref={dropdownRef}
                className="nav-link dropdown-toggle menu-color px-3"
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
                    className="dropdown-item menu-color"
                  >
                    {t(locale, "what_we_do_create")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/developAIsolutions`}
                    className="dropdown-item menu-color"
                  >
                    {t(locale, "what_we_do_develop")}
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link
                href={`/${locale}/blog`}
                className="nav-link menu-color px-3"
              >
                {t(locale, "blog")}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href={`/${locale}/about`}
                className="nav-link menu-color px-3"
              >
                {t(locale, "about")}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href={`/${locale}/contact`}
                className="nav-link menu-color px-3"
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
