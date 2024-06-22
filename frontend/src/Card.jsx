/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

function Card({ prop, boardID, handleRefresh }) {
  const [votes, setVotes] = useState(prop.votes);

  // Handles the deletion of a card
  const handleDelete = async () => {
    fetch(`http://localhost:3000/boards/${boardID}/cards/${prop.id}/delete`, {
      method: "DELETE",
    })
      .then(() => {
        // Refresh the list of cards upon successful deletion
        handleRefresh();
      })
      .catch((error) => {
        // Optionally, handle errors in a user-friendly way
        alert("Failed to delete the card. Please try again.", error);
      });
  };

  // Handles updating the votes for a card
  const handleAdd = async () => {
    fetch(`http://localhost:3000/boards/${boardID}/cards/${prop.id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ votes: votes }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update votes");
        }
        return response.json();
      })
      .catch((error) => {
        // Optionally, handle errors in a user-friendly way
        alert("Failed to update votes. Please try again.", error);
      });
  };

  // Effect to handle vote changes
  useEffect(() => {
    handleAdd();
    handleRefresh();
  }, [votes]);

  // Increments the vote count
  const addVotes = () => {
    setVotes(votes + 1);
  };

  return (
    <div className="board">
      <img src={prop.gifURL} alt="Board Visual Representation" />
      <span id="title">
        {prop.title}
        {prop.author && (
          <span id="author">
            By: <span id="text">{prop.author}</span>
          </span>
        )}
        <span id="upVote" onClick={addVotes}>
          {votes === 0 ? "♡" : `♥${votes}`}
        </span>
        <span id="delete" onClick={handleDelete}>
          ❌
        </span>
      </span>
      <span id="author">
        Description: <span id="text">{prop.description}</span>
      </span>
    </div>
  );
}

export default Card;
