export default function ContentDisplay(props) {
  
  const handleSave = () => {
    props.saveContent(props);
  };

  const handleUnsave = () => {
    props.saveContent(props);
  };

  return (
    <div className="ContentDisplay_item">
      <h3>{props.title}</h3>
      <p>{props.description || props.provider}</p>
      
      <div className="ContentDisplay_actions">
        <a href={props.url} target="_blank" rel="noopener noreferrer">
          View Details
        </a>
        <div className="ml-auto flex gap-2">
          <button 
            className="primary"
            onClick={() => window.open(props.url, '_blank')}
          >
            Open Full
          </button>
          {props.checkSaved(props.id) ? (
            <button 
              className="unsave-btn"
              onClick={handleUnsave}
            >
              Unsave
            </button>
          ) : (
            <button 
              className="secondary"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
