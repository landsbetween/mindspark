"use client";

import { t } from "@/lib/t";
import { usePathname } from "next/navigation";

export default function TasksExamplesBlock() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";
  const checkIconDataUrl =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE2LjYwMDMgMi4xNTM4NEM4Ljk1MzMyIDIuMTUzODQgMi43NTQxOSA4LjM1Mjk4IDIuNzU0MTkgMTZDMi43NTQxOSAyMy42NDcgOC45NTMzMiAyOS44NDYyIDE2LjYwMDMgMjkuODQ2MkMyNC4yNDc0IDI5Ljg0NjIgMzAuNDQ2NSAyMy42NDcgMzAuNDQ2NSAxNkMzMC40NDY1IDE0Ljg4NjcgMzAuMzE1MiAxMy44MDQ4IDMwLjA2NzYgMTIuNzY4OEMyOS45OTM1IDEyLjQ1ODkgMzAuMTg0NyAxMi4xNDc2IDMwLjQ5NDYgMTIuMDczNUMzMC44MDQ1IDExLjk5OTQgMzEuMTE1NyAxMi4xOTA2IDMxLjE4OTggMTIuNTAwNUMzMS40NTgzIDEzLjYyMzkgMzEuNjAwMyAxNC43OTU3IDMxLjYwMDMgMTZDMzEuNjAwMyAyNC4yODQyIDI0Ljg4NDYgMzEgMTYuNjAwMyAzMUM4LjMxNjA3IDMxIDEuNjAwMzQgMjQuMjg0MiAxLjYwMDM0IDE2QzEuNjAwMzQgNy43MTU3MyA4LjMxNjA3IDEgMTYuNjAwMyAxQzE5LjMzMTUgMSAyMS44OTM5IDEuNzMwNDcgMjQuMTAwNyAzLjAwNzA4QzI0LjM3NjYgMy4xNjY2MyAyNC40NzA4IDMuNTE5NTUgMjQuMzExMyAzLjc5NTM1QzI0LjE1MTcgNC4wNzExNiAyMy43OTg4IDQuMTY1NCAyMy41MjMgNC4wMDU4NkMyMS40ODcgMi44MjgxIDE5LjEyMzMgMi4xNTM4NCAxNi42MDAzIDIuMTUzODRaTTMwLjQ2OTkgNC41MzQzNkMzMC42OTUxIDQuNzU5NjYgMzAuNjk1MSA1LjEyNDk1IDMwLjQ2OTkgNS4zNTAyNUwxNi4xMTk2IDE5LjcwMDVMOC45ODA4NiAxMi41NjE4QzguNzU1NTUgMTIuMzM2NCA4Ljc1NTU1IDExLjk3MTIgOC45ODA4NiAxMS43NDU5QzkuMjA2MTYgMTEuNTIwNiA5LjU3MTQ0IDExLjUyMDYgOS43OTY3NCAxMS43NDU5TDE2LjExOTYgMTguMDY4OEwyOS42NTM5IDQuNTM0MzZDMjkuODc5MiA0LjMwOTA2IDMwLjI0NDUgNC4zMDkwNiAzMC40Njk5IDQuNTM0MzZaIiBmaWxsPSJibGFjayIgc3R5bGU9ImZpbGw6IHJnYigwLCAwLCAwKTsiLz4KPC9zdmc+";

  const items = t(locale, "task_items");

  return (
    <section
      id="rec1230309726"
      className="t-rec task_section"
      data-record-type="508"
    >
      <div className="task_container">
        <div className="task_title_wrap">
          <h2 className="task_title">
            <div className="task_title_text">
              <strong>{t(locale, "task_main")}</strong>
            </div>
          </h2>
        </div>

        <ul className="task_list" role="list">
          {items.map((text, idx) => (
            <li key={idx} className="task_item">
              <img src={checkIconDataUrl} alt="" className="task_icon" />
              <div className="task_text_wrap">
                <span className="task_text">{text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
