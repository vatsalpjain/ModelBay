import { useOutletContext } from "react-router-dom";
import MultiSourceContent from "../../MultiSourceContent";

export default function SearchPage() {
  const { search, saveContent, checkSaved } = useOutletContext();

  return (
    <div className="search-page">
      <h1 className="page-title">Search Results</h1>
      <MultiSourceContent 
        search={search} 
        saveContent={saveContent}
        checkSaved={checkSaved}
      />
    </div>
  );
}