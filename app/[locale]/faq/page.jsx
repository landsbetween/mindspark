"use client";

import { t } from "@/lib/t";
import { usePathname } from "next/navigation";

export default function AiAgentsAccordionBlock() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

  const item2List = t(locale, "ai_agents_acc_item2_list");
  const item3List = t(locale, "ai_agents_acc_item3_list");
  const item4List = t(locale, "ai_agents_acc_item4_list");
  const item5List = t(locale, "ai_agents_acc_item5_list");

  return (
    <section
      id="rec_ai_agents_accordion"
      className="t-rec ai_agents_section"
      data-record-type="508"
    >
      <div className="ai_agents_container">
        <div className="ai_agents_title_wrap" style={{ textAlign: "center" }}>
          <h2 className="ai_agents_title">
            <strong>{t(locale, "ai_agents_acc_title")}</strong>
          </h2>
        </div>

        <div className="accordion accordion-flush" id="aiAgentsAccordionFlush">
          <div className="accordion-item">
            <h2 className="accordion-header" id="ai-headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ai-collapseOne"
                aria-expanded="false"
                aria-controls="ai-collapseOne"
              >
                {t(locale, "ai_agents_acc_item1_title")}
              </button>
            </h2>

            <div
              id="ai-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="ai-headingOne"
              data-bs-parent="#aiAgentsAccordionFlush"
            >
              <div className="accordion-body">
                {t(locale, "ai_agents_acc_item1_p1")}
                <br />
                <br />
                {t(locale, "ai_agents_acc_item1_p2")}
                <br />
                <br />
                {t(locale, "ai_agents_acc_item1_p3")}
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="ai-headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ai-collapseTwo"
                aria-expanded="false"
                aria-controls="ai-collapseTwo"
              >
                {t(locale, "ai_agents_acc_item2_title")}
              </button>
            </h2>

            <div
              id="ai-collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="ai-headingTwo"
              data-bs-parent="#aiAgentsAccordionFlush"
            >
              <div className="accordion-body">
                {t(locale, "ai_agents_acc_item2_p1")}
                <br />
                <br />
                {t(locale, "ai_agents_acc_item2_p2")}
                <br />
                <br />
                <span>{/* intro line (optional) */}</span>
                <ul className="ai_agents_list" role="list">
                  {Array.isArray(item2List) &&
                    item2List.map((text, idx) => <li key={idx}>{text}</li>)}
                </ul>
                <br />
                {t(locale, "ai_agents_acc_item2_p3")}
                <br />
                <br />
                {t(locale, "ai_agents_acc_item2_p4")}
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="ai-headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ai-collapseThree"
                aria-expanded="false"
                aria-controls="ai-collapseThree"
              >
                {t(locale, "ai_agents_acc_item3_title")}
              </button>
            </h2>

            <div
              id="ai-collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="ai-headingThree"
              data-bs-parent="#aiAgentsAccordionFlush"
            >
              <div className="accordion-body">
                {t(locale, "ai_agents_acc_item3_intro")}
                <ul className="ai_agents_list" role="list">
                  {Array.isArray(item3List) &&
                    item3List.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.title}</strong> {item.text}
                      </li>
                    ))}
                </ul>
                <br />
                {t(locale, "ai_agents_acc_item3_outro")}
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="ai-headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ai-collapseFour"
                aria-expanded="false"
                aria-controls="ai-collapseFour"
              >
                {t(locale, "ai_agents_acc_item4_title")}
              </button>
            </h2>

            <div
              id="ai-collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="ai-headingFour"
              data-bs-parent="#aiAgentsAccordionFlush"
            >
              <div className="accordion-body">
                {t(locale, "ai_agents_acc_item4_p1")}
                <br />
                <br />
                {t(locale, "ai_agents_acc_item4_intro")}
                <ul className="ai_agents_list" role="list">
                  {Array.isArray(item4List) &&
                    item4List.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.title}</strong> {item.text}
                      </li>
                    ))}
                </ul>
                <br />
                {t(locale, "ai_agents_acc_item4_outro")}
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="ai-headingFive">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ai-collapseFive"
                aria-expanded="false"
                aria-controls="ai-collapseFive"
              >
                {t(locale, "ai_agents_acc_item5_title")}
              </button>
            </h2>

            <div
              id="ai-collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="ai-headingFive"
              data-bs-parent="#aiAgentsAccordionFlush"
            >
              <div className="accordion-body">
                {t(locale, "ai_agents_acc_item5_p1")}
                <br />
                <br />
                {t(locale, "ai_agents_acc_item5_intro")}
                <ul className="ai_agents_list" role="list">
                  {Array.isArray(item5List) &&
                    item5List.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.title}</strong> {item.text}
                      </li>
                    ))}
                </ul>
                <br />
                {t(locale, "ai_agents_acc_item5_outro")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
