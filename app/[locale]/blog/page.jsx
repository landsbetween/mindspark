export default async function Blog({ params }) {
  const locale = params?.locale || "ua";

  const url = `https://mindspark.dispatcher.space/api/public/articles?locale=${locale}`;

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

  return (
    <div className="container py-5">
      <h1 className="blog-page-title">Блог</h1>

      <div className="mt-4">
        {articles.length === 0 ? (
          <p className="blog-empty">Поки немає статей.</p>
        ) : (
          articles.map((a) => (
            <div
              key={a.id}
              className="border rounded p-3 mb-3 d-flex gap-3 align-items-start"
            >
              {a.imageUrl ? (
                <div style={{ width: 500, flexShrink: 0 }}>
                  <img
                    src={a.imageUrl}
                    alt={a.title}
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
