"use client";

import Link from "next/link";
import { t } from "@/lib/t";
import { usePathname } from "next/navigation";

export default function BlogClient({ articles, initialLocale }) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const fromPath = parts[0] === "en" ? "en" : "ua";

  const locale = initialLocale === "en" ? "en" : fromPath;

  const pageTitle = t(locale, "blogTitle");
  const emptyText = t(locale, "blogEmpty");

  const list = (Array.isArray(articles) ? articles : []).filter((a) => {
    const aLocale = (a?.locale || "").toString().trim().toLowerCase();
    return (aLocale === "en" ? "en" : "ua") === locale;
  });

  return (
    <div className="container py-5">
      <h1 className="blog-page-title">{pageTitle}</h1>

      <div className="mt-4 blog-list">
        {list.length === 0 ? (
          <p className="blog-empty">{emptyText}</p>
        ) : (
          list.map((a) => (
            <article
              key={a.id}
              className="blog-card blog-card--list border rounded p-3 mb-3"
            >
              <Link
                href={`/${locale}/blog/${a.id}`}
                className="blog-title"
                style={{ textDecoration: "none" }}
              >
                {a.title}
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
