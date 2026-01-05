"use client";

import Image from "next/image";
import { t } from "@/lib/t";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";
import DevelopAIsolutions from "../developAIsolutions/page";
import ConsultationBlock from "../advice/page"
import TasksExamplesBlock from "../task/page";
import AdvantagesBlock from "../advantages/page";
import HowWeWorkBlock from "../work/page";

export default function Hero() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-prefix">{t(locale, "heroPrefix")}</div>
              <h1 className="hero-title text-color">
                {t(locale, "heroTitle")}
              </h1>
              <p className="hero-text">{t(locale, "heroText")}</p>
              <button
                type="button"
                className="btn btn-primary btn-lg hero-cta"
                onClick={() => setModalOpen(true)}
              >
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
        <ConsultationModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={t(locale, "cta")}
          locale={locale}
        />
      </section>
      <section className="develop-section">
        <DevelopAIsolutions />
      </section>
      <section className="advice">
        <ConsultationBlock />
      </section>
      <section className="task">
        <TasksExamplesBlock />
      </section>
      <section className="advantages">
        <AdvantagesBlock />
      </section>
      <section className="work">
        <HowWeWorkBlock />
      </section>
    </div>
  );
}
