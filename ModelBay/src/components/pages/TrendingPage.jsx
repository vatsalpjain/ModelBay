import MultiSourceContent from "../../MultiSourceContent";
import { useOutletContext } from "react-router-dom";

export default function TrendingPage() {
  const { search, saveContent, checkSaved } = useOutletContext();

  return (
    <MultiSourceContent
      search={`trending ${search}`} 
      saveContent={saveContent}
      checkSaved={checkSaved}
    />
  );
}
