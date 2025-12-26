"use client";

import { useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";
import { t } from "@/lib/t";
import { usePathname } from "next/navigation";

export default function ConsultationBlock() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section
      id="rec1245043876"
      className="t-rec t-rec_pt_135 t-rec_pb_135 t580"
      style={{
        paddingTop: "135px",
        paddingBottom: "135px",
        backgroundColor: "#efefef",
      }}
      data-record-type="580"
      data-bg-color="#efefef"
    >
      <div className="container text-center">
        <h2
          className="t580__title"
          style={{
            fontSize: "30px",
            fontFamily: "INTERNETRAL",
            color: "#000000",
          }}
        >
          <strong>{t(locale, "advice_book_consultation")}</strong>
        </h2>

        <p
          className="t580__descr mx-auto"
          style={{ color: "#000000", maxWidth: "550px" }}
        >
          <span style={{ fontFamily: "Arial" }}>
            {t(locale, "advice_give_contacts")}
          </span>
          <br />
          <span style={{ fontFamily: "Arial" }}>
            {t(locale, "advice_find_solution")}
          </span>
        </p>

        <div className="mt-4 d-flex justify-content-center flex-column align-items-center gap-3">
          <svg
            role="presentation"
            className="arrow-icon_mobile"
            style={{ fill: "#c9c9c9", width: "30px" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 35 70"
          >
            <path d="M31.5 47c-1.1-.9-2.7-.7-3.5.4L20.2 57V5.8c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5V57l-7.8-9.7c-.8-1-2.4-1.2-3.5-.3-1.1.9-1.2 2.4-.4 3.5l12.2 15.2c.5.6 1.2.9 1.9.9s1.5-.3 1.9-.9l12.2-15.2c1-1.1.9-2.6-.2-3.5z"></path>
          </svg>
          <img
            src="/arrow.png"
            alt="arrow"
            className="arrow-icon_desktop"
            style={{ fill: "#c9c9c9", width: "60px" }}
          />

          <button
            className="btn"
            style={{
              color: "#ffffff",
              backgroundColor: "#000000",
              border: "none",
              padding: "14px 26px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => setModalOpen(true)}
          >
            {t(locale, "advice_cta")}
          </button>
        </div>
      </div>
      <ConsultationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t(locale, "cta")}
        locale={locale}
      />
    </section>
  );
}
