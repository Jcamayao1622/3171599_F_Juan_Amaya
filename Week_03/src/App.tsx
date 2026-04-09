import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
}

export default function App() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const json = await res.json();
      setData(json.slice(0, 5));
      setError(null);
    } catch {
      setError("Error cargando datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {!loading &&
        data.map(post => (
          <p key={post.id}>{post.title}</p>
        ))}
    </div>
  );
}