"use client";

import { t } from "@/lib/t";
import { usePathname } from "next/navigation";

export default function PricingTiersBlock() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

  const title = t(locale, "pricing_tiers_title");
  const tiers = t(locale, "pricing_tiers");

  return (
    <section
      id="rec_pricing_tiers"
      className="t-rec pricing_tiers_section"
      data-record-type="508"
    >
      <div className="pricing_tiers_container">
        <h3 className="pricing_tiers_title"><strong>{title}</strong></h3>

        <div className="tiers_grid">
          {Array.isArray(tiers) &&
            tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`tier_card ${tier?.highlighted ? "highlighted" : ""}`}
              >
                <div className="tier_header">
                  <h4 className="tier_name">{tier?.name}</h4>
                  <div className="tier_price">{tier?.price}</div>
                </div>

                <ul className="tier_features" role="list">
                  {Array.isArray(tier?.features1) &&
                    tier.features1.map((item, i) => <li key={i}>{item}</li>)}
                </ul>

                <div className="tier_divider" />

                <div className="tier_header tier_header_small">
                  <h4 className="tier_name tier_name_small">{tier?.implTitle}</h4>
                </div>

                <ul className="tier_features" role="list">
                  {Array.isArray(tier?.features2) &&
                    tier.features2.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
