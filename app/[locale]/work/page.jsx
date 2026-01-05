"use client";

import { t } from "@/lib/t";
import { usePathname } from "next/navigation";

export default function HowWeWorkBlock() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

  const title = t(locale, "how_we_work");

  const items = [
    {
      title: "Аналіз завдання та бізнес-вимог",
      descr: "Обговорюємо цілі, визначаємо ключові показники успіху.",
    },
    {
      title: "Прототипування",
      descr: "Створюємо мінімальний робочий варіант для перевірки гіпотез.",
    },
    {
      title: "Розробка",
      descr:
        "Будуємо систему на базі перевірених технологій та інтегруємо з бізнес-інфраструктурою.",
    },
    {
      title: "Впровадження та навчання",
      descr:
        "Забезпечуємо плавний запуск, навчаємо співробітників, супроводжуємо перші релізи.",
    },
    {
      title: "Підтримка та розвиток",
      descr: "Оптимізуємо та масштабуємо рішення під зростаючі потреби.",
    },
  ];

  return (
    <section
      id="rec1230093686"
      className="how_section"
      data-record-type="565"
      aria-label={title}
    >
      <div className="how_wrap">
        <header className="how_header">
          <h2 className="how_title">
            <strong>{title}</strong>
          </h2>
        </header>

        <ol className="how_list" role="list">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <li key={idx} className="how_item">
                <div className="how_row">
                  <div
                    className={`how_side how_left ${isLeft ? "isOn" : "isOff"}`}
                  >
                    {isLeft ? (
                      <>
                        <div className="how_item_title">
                          <strong>{item.title}</strong>
                        </div>
                        <div className="how_item_descr">{item.descr}</div>
                      </>
                    ) : null}
                  </div>

                  <div className="how_mid" aria-hidden="true">
                    <div className="how_dot">
                      <span className="how_dot_num">{idx + 1}</span>
                    </div>
                  </div>

                  <div
                    className={`how_side how_right ${
                      !isLeft ? "isOn" : "isOff"
                    }`}
                  >
                    {!isLeft ? (
                      <>
                        <div className="how_item_title">
                          <strong>{item.title}</strong>
                        </div>
                        <div className="how_item_descr">{item.descr}</div>
                      </>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
