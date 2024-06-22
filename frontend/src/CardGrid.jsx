/* eslint-disable react/prop-types */
import Card from "./Card";
import CreateCard from "./CreateCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./BoardGrid.css";
import "./SideBar.css";

function CardGrid({ boardID }) {
  const [boardArray, setBoardArray] = useState([]);
  const [refresh, setRefreshState] = useState(0);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    author: "",
    votes: 0,
    gifURL: "",
  });

  // Updates the card array with new data
  function updateArray(arr) {
    setBoardArray(arr);
  }

  // Triggers a re-fetch of card data
  function handleRefresh() {
    setRefreshState((prev) => prev + 1);
  }

  // Fetches card data for the specified board
  const fetchdata = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/boards/${boardID}/cards`,
        { method: "GET" }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      updateArray(data);
    } catch (error) {
      // Optionally, handle errors in a user-friendly way
      alert("Failed to fetch cards. Please try again.");
    }
  };

  // Effect to re-fetch data when refresh state changes
  useEffect(() => {
    fetchdata();
  }, [refresh]);

  return (
    <>
      <div className="sideBar">
        <h1>KudoCards.</h1>
        <CreateCard
          boardID={boardID}
          inputs={inputs}
          setInputs={setInputs}
          handleRefresh={handleRefresh}
        />
        <Link to="/">
          <h3 id="back">🔙</h3>
        </Link>
      </div>

      <div className="container">
        <div className="grid-container-card">
          {boardArray.length > 0 ? (
            boardArray.map((value, i) => (
              <Card
                key={i}
                prop={value}
                boardID={boardID}
                handleRefresh={handleRefresh}
              />
            ))
          ) : (
            <div>No cards found.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default CardGrid;
