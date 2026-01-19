import BlogClient from "./BlogClient";

export default async function Blog({ params }) {
  const resolvedParams = await params; 
  const locale = resolvedParams?.locale === "en" ? "en" : "ua";

  const url = `http://mindspark.dispatcher.space/api/public/articles?locale=${locale}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  const contentType = res.headers.get("content-type") || "";
  const raw = await res.text();

  if (!res.ok) {
    throw new Error(
      `API error: ${res.status} ${res.statusText}\n` +
        `Content-Type: ${contentType}\n` +
        `Body (first 200): ${raw.slice(0, 200)}`
    );
  }

  if (!contentType.includes("application/json")) {
    throw new Error(
      `Expected JSON, got: ${contentType}\n` +
      `Body (first 200): ${raw.slice(0, 200)}`
    );
  }

  const articles = JSON.parse(raw);

  return <BlogClient articles={articles} initialLocale={locale} />;
}