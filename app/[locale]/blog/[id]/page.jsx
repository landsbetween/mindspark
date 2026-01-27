export default async function BlogPostPage({ params }) {
  const { locale, id } = await params;
  const safeLocale = locale === "en" ? "en" : "ua";
  const urlById = `http://mindspark.dispatcher.space/api/public/articles/${id}?locale=${safeLocale}`;

  let res = await fetch(urlById, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const listUrl = `http://mindspark.dispatcher.space/api/public/articles?locale=${safeLocale}`;
    const listRes = await fetch(listUrl, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!listRes.ok) {
      throw new Error(`API error: ${listRes.status} ${listRes.statusText}`);
    }

    const articles = await listRes.json();
    const found = (Array.isArray(articles) ? articles : []).find(
      (a) => String(a?.id) === String(id)
    );

    return <PostView article={found} />;
  }

  const article = await res.json();
  return <PostView article={article} />;
}

function PostView({ article }) {
  return (
    <div className="container-fluid py-5">
      <h1 className="blog-page-title">{article?.title}</h1>
      {article?.imageUrl ? (
        <div className="blog-media mt-4">
          <img
            className="blog-image"
            src={article.imageUrl}
            alt={article.title || ""}
            loading="lazy"
          />
        </div>
      ) : null}
      <div
        className="blog-content mt-4"
        dangerouslySetInnerHTML={{ __html: article?.content || "" }}
      />
    </div>
  );
}
