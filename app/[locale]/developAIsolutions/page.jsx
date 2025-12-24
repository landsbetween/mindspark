"use client";

import { t } from "@/lib/t";
import { usePathname } from "next/navigation";

export default function DevelopAIsolutions() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";
  const items = [
    {
      icon: "bi-trophy",
      text: t(locale, "develop_bi_trophy"),
    },
    {
      icon: "bi-controller",
      text: t(locale, "develop_bi_controller"),
    },
    {
      icon: "bi-car-front",
      text: t(locale, "develop_bi_car_front"),
    },
    {
      icon: "bi-cup-straw",
      text: t(locale, "develop_bi_cup_straw"),
    },
    {
      icon: "bi-house-door",
      text: t(locale, "develop_bi_house_door"),
    },
    {
      icon: "bi-building-gear",
      text: t(locale, "develop_bi_building_gear"),
    },
    {
      icon: "bi-mortarboard",
      text: t(locale, "develop_bi_mortarboard"),
    },
    {
      icon: "bi-hdd-network",
      text: t(locale, "develop_bi_hdd_network"),
    },
    {
      icon: "bi-camera-reels",
      text: t(locale, "develop_bi_camera_reels"),
    },
  ];

  const imageSrc = "/AIagentImage.avif";

  return (
    <section className="container py-5 develop-section">
      <div className="row justify-content-center">
        <div className="col-12">
          <h2 className="text-center develop-title">{t(locale, "develop")}</h2>
        </div>
      </div>

      <div className="row align-items-center g-4">
        <div className="col-12 col-lg-6 order-1 order-lg-2 text-center">
          <img
            src={imageSrc}
            alt="Agentic AI workflow illustration"
            className="img-fluid rounded-4 develop-image"
            loading="lazy"
          />
        </div>

        <div className="col-12 col-lg-6 order-2 order-lg-1">
          <ul className="list-unstyled m-0 develop-list">
            {items.map((it, idx) => (
              <li
                key={idx}
                className="d-flex align-items-start gap-3 py-2 develop-item"
              >
                <div className="develop-icon-wrap d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0">
                  <i className={`bi ${it.icon} text-primary develop-icon`} />
                </div>

                <p className="m-0 text-secondary develop-text">{it.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
