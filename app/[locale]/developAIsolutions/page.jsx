"use client";

import { t } from "@/lib/t";
import { usePathname } from "next/navigation";

export default function DevelopAIsolutions() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";
  const items = [
    { key: "sport", icon: "bi-trophy", text: t(locale, "develop_bi_trophy") },
    {
      key: "esports",
      icon: "bi-controller",
      text: t(locale, "develop_bi_controller"),
    },
    {
      key: "auto",
      icon: "bi-car-front",
      text: t(locale, "develop_bi_car_front"),
    },
    {
      key: "fmcg",
      icon: "bi-cup-straw",
      text: t(locale, "develop_bi_cup_straw"),
    },
    {
      key: "realestate",
      icon: "bi-house-door",
      text: t(locale, "develop_bi_house_door"),
    },
    {
      key: "industry",
      icon: "bi-building-gear",
      text: t(locale, "develop_bi_building_gear"),
    },
    {
      key: "education",
      icon: "bi-mortarboard",
      text: t(locale, "develop_bi_mortarboard"),
    },
    {
      key: "infra",
      icon: "bi-hdd-network",
      text: t(locale, "develop_bi_hdd_network"),
    },
    {
      key: "media",
      icon: "bi-camera-reels",
      text: t(locale, "develop_bi_camera_reels"),
    },
  ];

  const imageSrc = "/imageDevelop.jpg";

  return (
    <section className="py-5 develop-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="row justify-content-center col-12">
            <h2 className="text-center text-color develop-article">
              <b>{t(locale, "develop")}</b>
            </h2>
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
                  <div
                    className={`develop-icon-wrap develop-${it.key} d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0`}
                  >
                    <i className={`bi ${it.icon} develop-icon`} />
                  </div>

                  <p className="m-0 text-secondary develop-text">
                    {(() => {
                      const text = it.text;
                      const [title, rest] = text.split(" – ");
                      return (
                        <>
                          <b className="develop-title text-color">
                            {title}
                          </b>
                          {rest && <> – {rest}</>}
                        </>
                      );
                    })()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
