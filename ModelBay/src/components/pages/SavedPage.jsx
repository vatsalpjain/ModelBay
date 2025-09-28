import { useOutletContext } from "react-router-dom";
import ContentDisplay from "../ContentDisplay.jsx";

export default function SavedPage() {
  const { saved, saveContent, checkSaved } = useOutletContext();

  return (
    <div className="saved-page">
      <h1 className="page-title">Saved Items ({saved.length})</h1>
      {saved.length === 0 ? (
        <p className="empty-message">No saved items yet.</p>
      ) : (
        <div className="saved-items">
          {saved.map((item, index) => (
            <ContentDisplay 
              key={item.id || index}
              {...item} 
              saveContent={saveContent}
              checkSaved={checkSaved}
            />
          ))}
        </div>
      )}
    </div>
  );
}
