/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Board({ prop, onSelectBoard, handleRefresh }) {
  // Handles board selection, setting the current board ID
  const handleSwitch = () => {
    onSelectBoard(prop.id);
  };

  // Handles the deletion of a board
  const handleDelete = async () => {
    fetch(`http://localhost:3000/boards/${prop.id}/delete`, {
      method: "DELETE",
    })
      .then(() => {
        // Refresh the list of boards upon successful deletion
        handleRefresh();
      })
      .catch((error) => {
        // Ideally, handle errors in a user-friendly way
        alert("Failed to delete the board. Please try again: ", error);
      });
  };

  return (
    <div className="board">
      {/* Link to the cards of the board */}
      <Link to="/cards">
        <img onClick={handleSwitch} src={prop.gifURL} alt="Board Thumbnail" />
      </Link>
      <span id="title">
        {prop.title}{" "}
        <span id="delete" onClick={handleDelete}>
          ❌ {/* Delete icon */}
        </span>
      </span>

      <span id="author">
        By: <span id="text">{prop.author}</span>
      </span>
      <span id="category">
        Category: <span id="text">{prop.category}</span>
      </span>
    </div>
  );
}

export default Board;
