import { useOutletContext } from "react-router-dom";
import MultiSourceContent from "../../MultiSourceContent";

export default function ExplorePage() {
  const { search, saveContent, checkSaved } = useOutletContext();
  return (
    <MultiSourceContent search={search} saveContent={saveContent} checkSaved={checkSaved} />
  );
}