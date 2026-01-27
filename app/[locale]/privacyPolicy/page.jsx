"use client";

import { t } from "@/lib/t";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

  return (
    <main className="policy_page">
      <div className="policy_container">
        <div className="policy_top">
          <Link href={`/${locale}`} className="policy_back">
            {t(locale, "privacyPolicy_back")}
          </Link>

          <h1 className="policy_title">{t(locale, "privacyPolicy_title")}</h1>
          <div className="policy_updated">
            {t(locale, "privacyPolicy_updated")}
          </div>
          <p className="policy_intro">{t(locale, "privacyPolicy_intro")}</p>
        </div>

        <section className="policy_section">
          <h2 className="policy_h2">
            {t(locale, "privacyPolicy_whoWeAreTitle")}
          </h2>
          <p className="policy_p">{t(locale, "privacyPolicy_whoWeAreText")}</p>
        </section>

        <section className="policy_section">
          <h2 className="policy_h2">{t(locale, "privacyPolicy_dataTitle")}</h2>
          <ul className="policy_ul">
            {t(locale, "privacyPolicy_dataList").map((item, idx) => (
              <li key={idx} className="policy_li">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="policy_section">
          <h2 className="policy_h2">
            {t(locale, "privacyPolicy_purposeTitle")}
          </h2>
          <ul className="policy_ul">
            {t(locale, "privacyPolicy_purposeList").map((item, idx) => (
              <li key={idx} className="policy_li">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="policy_section">
          <h2 className="policy_h2">
            {t(locale, "privacyPolicy_cookiesTitle")}
          </h2>
          <p className="policy_p">{t(locale, "privacyPolicy_cookiesText")}</p>
        </section>

        <section className="policy_section">
          <h2 className="policy_h2">
            {t(locale, "privacyPolicy_sharingTitle")}
          </h2>
          <p className="policy_p">{t(locale, "privacyPolicy_sharingText")}</p>
        </section>

        <section className="policy_section">
          <h2 className="policy_h2">
            {t(locale, "privacyPolicy_securityTitle")}
          </h2>
          <ul className="policy_ul">
            {t(locale, "privacyPolicy_securityList").map((item, idx) => (
              <li key={idx} className="policy_li">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="policy_section">
          <h2 className="policy_h2">
            {t(locale, "privacyPolicy_retentionTitle")}
          </h2>
          <p className="policy_p">{t(locale, "privacyPolicy_retentionText")}</p>
        </section>

        <section className="policy_section">
          <h2 className="policy_h2">
            {t(locale, "privacyPolicy_rightsTitle")}
          </h2>
          <ul className="policy_ul">
            {t(locale, "privacyPolicy_rightsList").map((item, idx) => (
              <li key={idx} className="policy_li">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="policy_section">
          <h2 className="policy_h2">{t(locale, "privacyPolicy_kidsTitle")}</h2>
          <p className="policy_p">{t(locale, "privacyPolicy_kidsText")}</p>
        </section>

        <section className="policy_section">
          <h2 className="policy_h2">
            {t(locale, "privacyPolicy_changesTitle")}
          </h2>
          <p className="policy_p">{t(locale, "privacyPolicy_changesText")}</p>
        </section>

        <section className="policy_section">
          <h2 className="policy_h2">
            {t(locale, "privacyPolicy_contactTitle")}
          </h2>
          <p className="policy_p">{t(locale, "privacyPolicy_contactText")}</p>
        </section>

        <div className="policy_note">{t(locale, "privacyPolicy_note")}</div>
      </div>
    </main>
  );
}
