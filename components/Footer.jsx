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
            <div className="footer_line">
              {t(locale, "footer_free_consult")}
            </div>
            <button
              className="footer_btn"
              onClick={() => setModalOpen(true)}
            >
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
