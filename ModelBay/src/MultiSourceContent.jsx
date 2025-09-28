import { useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import ContentDisplay from "./components/ContentDisplay";

export default function MultiSourceContent({ search = "", saveContent, checkSaved }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 3000); // 3 second delay

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch items when debounced search changes
  useEffect(() => {
    async function fetchItems() {
      if (!debouncedSearch.trim()) {
        setItems([]);
        return;
      }

      setLoading(true);
      try {
        let url = "http://127.0.0.1:5000/search";
        if (debouncedSearch.trim() !== "") {
          url += `?q=${encodeURIComponent(debouncedSearch)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching multi-source content:", error);
        setItems([]);
      }
      setLoading(false);
    }

    fetchItems();
  }, [debouncedSearch]);

  if (loading) return <div>Loading results...</div>;
  if (!loading && items.length === 0) return <div>No results found.</div>;

  return (
    <div className="CategoriesDisplay_container">
      {items.map((item) => {
        const id = nanoid();
        return (
          <ContentDisplay
            key={item.id || id}
            id={item.id || id}
            title={item.title}
            description={item.description}
            url={item.url}
            saveContent={saveContent}
            thumbnail={item.thumbnail}
            provider={item.provider}
            checkSaved={checkSaved}
          />
        );
      })}
    </div>
  );
}
