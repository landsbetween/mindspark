"use client";

import Image from "next/image";
import { t } from "@/lib/t";
import { usePathname } from "next/navigation";

export default function Hero() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-prefix">
             {t(locale, "heroPrefix")}
            </div>
            <h1 className="hero-title text-color">
              {t(locale, "heroTitle")}
            </h1>
            <p className="hero-text">
              {t(locale, "heroText")}
            </p>
            <button className="btn btn-primary btn-lg hero-cta">
              {t(locale, "cta")}
            </button>
          </div>
          <div className="hero-image">
            <Image
              src="/mainIcon.avif"
              alt="AI laptop illustration"
              width={900}
              height={700}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
