"use client";

import { t } from "@/lib/t";
import { usePathname } from "next/navigation";

export default function AdvantagesBlock() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

  const items = [
    {
      icon: "bi-truck",
      titleKey: "advantages_item_1_title",
      descrKey: "advantages_item_1_descr",
    },
    {
      icon: "bi-cpu",
      titleKey: "advantages_item_2_title",
      descrKey: "advantages_item_2_descr",
    },
    {
      icon: "bi-braces-asterisk",
      titleKey: "advantages_item_3_title",
      descrKey: "advantages_item_3_descr",
    },
    {
      icon: "bi-arrows-angle-expand",
      titleKey: "advantages_item_4_title",
      descrKey: "advantages_item_4_descr",
    },
    {
      icon: "bi-wrench-adjustable",
      titleKey: "advantages_item_5_title",
      descrKey: "advantages_item_5_descr",
    },
    {
      icon: "bi-lightning-charge",
      titleKey: "advantages_item_6_title",
      descrKey: "advantages_item_6_descr",
    },
  ];

  return (
    <section style={{ paddingBottom: "100px" }}>
      <div className="container">
        <h2 className="text-center advantages__title">
          <strong>{t(locale, "advantages_title")}</strong>
        </h2>

        <div className="row advantages__container">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="col-12 col-md-6 col-lg-4 text-center t-item"
            >
              <div className="advantages_icon" aria-hidden="true">
                <i className={`bi ${it.icon} advantages__icon`} />
              </div>

              <div className="advantages_wrappercenter">
                <div className="advantages_item_title">
                  <strong>{t(locale, it.titleKey)}</strong>
                </div>
                <div className="advantages_item_description">
                  {t(locale, it.descrKey)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
