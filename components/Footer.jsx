"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { t } from "@/lib/t";
import ConsultationModal from "@/components/ConsultationModal";

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

  const year = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="footer_container">
          <div className="footer_left">
            <div className="footer_line">
              <strong>MindSpark</strong>
            </div>
            <div className="footer_subline">
              © {year} {t(locale, "footer_rights")}
            </div>
          </div>

          <div className="footer_right">
            <a
              href="https://www.instagram.com/mindspark_original/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer_instagram"
              aria-label="MindSpark Instagram"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 2H17C20.3137 2 23 4.68629 23 8V16C23 19.3137 20.3137 22 17 22H7C3.68629 22 1 19.3137 1 16V8C1 4.68629 3.68629 2 7 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <div className="footer_line">
              {t(locale, "footer_free_consult")}
            </div>
            <button className="footer_btn" onClick={() => setModalOpen(true)}>
              {t(locale, "cta")}
            </button>
          </div>
        </div>
      </footer>

      <ConsultationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t(locale, "cta")}
        locale={locale}
      />
    </>
  );
}
