import React, { useEffect, useState } from "react";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("business");

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setArticles(data.articles);
        } else {
          setError(data.message || "Error fetching news");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [category]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Top Headlines</h1>

      <div className="mb-4 space-x-4">
        {["business", "technology", "sports", "health", "science"].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded ${
              category === cat ? "bg-blue-900 text-white" : "bg-gray-300"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p>Loading news...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article, idx) => (
          <NewsCard key={idx} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Home;
