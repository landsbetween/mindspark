export default async function Blog({ params }) {
  const locale = params?.locale || "ua";

  const res = await fetch(
    `https://mindspark.dispatcher.space/api/public/articles?locale=${locale}`,
    { cache: "no-store" }
  );

  const articles = await res.json();

  return (
    <div className="container py-5">
      <h1 className="display-5 text-primary">Блог</h1>

      <div className="mt-4">
        {articles.length === 0 ? (
          <p className="text-secondary">Поки немає статей.</p>
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
                <div className="fw-bold">{a.title}</div>

                <div
                  className="mt-3"
                  style={{ overflowWrap: "anywhere" }}
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
