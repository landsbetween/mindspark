"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangSwitch() {
  const pathname = usePathname();

  const parts = pathname.split("/").filter(Boolean);
  const currentLocale = parts[0] === "en" ? "en" : "ua";
  const nextLocale = currentLocale === "ua" ? "en" : "ua";

  const restPath = parts.slice(1).join("/");
  const isBlogPost = parts[1] === "blog" && parts[2];

  const href = isBlogPost
    ? `/${nextLocale}/blog`
    : restPath
      ? `/${nextLocale}/${restPath}`
      : `/${nextLocale}`;

  return (
    <Link href={href} className="lang-badge menu-color">
      {nextLocale.toUpperCase()}
    </Link>
  );
}
