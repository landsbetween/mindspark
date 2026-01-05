"use client";

import { t } from "@/lib/t";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

export default function HowWeWorkBlock() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

  const title = t(locale, "how_we_work");

  const items = useMemo(
    () => [
      { titleKey: "how_item_1_title", descrKey: "how_item_1_descr" },
      { titleKey: "how_item_2_title", descrKey: "how_item_2_descr" },
      { titleKey: "how_item_3_title", descrKey: "how_item_3_descr" },
      { titleKey: "how_item_4_title", descrKey: "how_item_4_descr" },
      { titleKey: "how_item_5_title", descrKey: "how_item_5_descr" },
    ],
    []
  );

  const listRef = useRef(null);
  const firstDotRef = useRef(null);
  const lastDotRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    const firstDot = firstDotRef.current;
    const lastDot = lastDotRef.current;
    if (!list || !firstDot || !lastDot) return;

    const setLine = () => {
      const listRect = list.getBoundingClientRect();
      const firstRect = firstDot.getBoundingClientRect();
      const lastRect = lastDot.getBoundingClientRect();

      const firstCenterY = firstRect.top - listRect.top + firstRect.height / 2;
      const lastCenterY = lastRect.top - listRect.top + lastRect.height / 2;

      list.style.setProperty("--how-line-top", `${firstCenterY}px`);
      list.style.setProperty("--how-line-bottom", `${lastCenterY}px`);
    };

    setLine();

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => requestAnimationFrame(setLine));
      ro.observe(list);
      ro.observe(firstDot);
      ro.observe(lastDot);
    }

    window.addEventListener("resize", setLine);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", setLine);
    };
  }, [items.length]);

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

        <ol ref={listRef} className="how_list" role="list">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const isFirst = idx === 0;
            const isLast = idx === items.length - 1;

            return (
              <li key={idx} className="how_item">
                <div className="how_row">
                  <div
                    className={`how_side how_left ${isLeft ? "isOn" : "isOff"}`}
                  >
                    {isLeft && (
                      <>
                        <div className="how_item_title">
                          <strong>{t(locale, item.titleKey)}</strong>
                        </div>
                        <div className="how_item_descr">
                          {t(locale, item.descrKey)}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="how_mid" aria-hidden="true">
                    <div
                      ref={isFirst ? firstDotRef : isLast ? lastDotRef : null}
                      className="how_dot"
                    >
                      <span className="how_dot_num">{idx + 1}</span>
                    </div>
                  </div>

                  <div
                    className={`how_side how_right ${
                      !isLeft ? "isOn" : "isOff"
                    }`}
                  >
                    {!isLeft && (
                      <>
                        <div className="how_item_title">
                          <strong>{t(locale, item.titleKey)}</strong>
                        </div>
                        <div className="how_item_descr">
                          {t(locale, item.descrKey)}
                        </div>
                      </>
                    )}
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
