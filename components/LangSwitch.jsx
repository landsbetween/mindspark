"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangSwitch() {
  const pathname = usePathname();

  const parts = pathname.split("/").filter(Boolean);
  const currentLocale = parts[0] === "en" ? "en" : "ua";
  const nextLocale = currentLocale === "ua" ? "en" : "ua";

  const restPath = parts.slice(1).join("/");

  const href = restPath ? `/${nextLocale}/${restPath}` : `/${nextLocale}`;

  return (
    <Link href={href} className="lang-badge text-color">
      {nextLocale.toUpperCase()}
    </Link>
  );
}
