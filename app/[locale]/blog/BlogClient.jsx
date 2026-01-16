"use client";

import { t } from "@/lib/t";
import { usePathname } from "next/navigation";

export default function BlogClient({ articles }) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

  const pageTitle = t(locale, "blogTitle");
  const emptyText = t(locale, "blogEmpty");

  const list = Array.isArray(articles) ? articles : [];

  return (
    <div className="container py-5">
      <h1 className="blog-page-title">{pageTitle}</h1>

      <div className="mt-4">
        {list.length === 0 ? (
          <p className="blog-empty">{emptyText}</p>
        ) : (
          list.map((a) => (
            <div
              key={a.id}
              className="border rounded p-3 mb-3 d-flex gap-3 align-items-start"
            >
              {a.imageUrl ? (
                <div style={{ width: 500, flexShrink: 0 }}>
                  <img
                    src={a.imageUrl}
                    alt={a.title || ""}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: 300,
                      objectFit: "contain",
                      display: "block",
                      borderRadius: 8,
                    }}
                  />
                </div>
              ) : null}

              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="blog-title">{a.title}</div>

                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: a.content || "" }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
