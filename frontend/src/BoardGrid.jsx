/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Board from "./Board";
import CreateBoard from "./CreateBoard";
import "./SideBar.css";
import "./BoardGrid.css";

function BoardGrid({ onSelectBoard }) {
  const [boardArray, setBoardArray] = useState([]);
  const [refresh, setRefreshState] = useState(0);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(null);
  const [inputs, setInputs] = useState({
    title: "",
    author: "",
    category: "",
  });

  // Updates the board array with new data
  function updateArray(arr) {
    setBoardArray(arr);
  }

  // Triggers a re-fetch of board data
  function handleRefresh() {
    setRefreshState((prev) => prev + 1);
  }

  // Handles changes in the search input
  const handleChange = function (event) {
    setQuery(event.target.value);
    handleRefresh();
  };

  // Resets the search and filter states
  const handleReset = function () {
    setQuery("");
    setFilter(null);
    handleRefresh();
  };

  // Toggles the filter state for recent boards
  function handleRecentFilter() {
    setFilter((prev) => (prev !== "Recent" ? "Recent" : null));
    handleRefresh();
  }

  // Toggles the filter state for celebration boards
  function handleCelebFilter() {
    setFilter((prev) => (prev !== "Celebration" ? "Celebration" : null));
    handleRefresh();
  }

  // Toggles the filter state for thank you boards
  function handleThankFilter() {
    setFilter((prev) => (prev !== "Thank you" ? "Thank you" : null));
    handleRefresh();
  }

  // Toggles the filter state for inspiration boards
  function handleInspoFilter() {
    setFilter((prev) => (prev !== "Inspiration" ? "Inspiration" : null));
    handleRefresh();
  }

  // Fetches board data based on the current query or filter
  const fetchdata = async () => {
    let response;
    if (query === "" && filter === null) {
      response = await fetch("http://localhost:3000/boards", { method: "GET" });
    } else if (query != "") {
      response = await fetch(`http://localhost:3000/boards/query/${query}`, {
        method: "GET",
      });
    } else if (filter === "Celebration") {
      response = await fetch("http://localhost:3000/boards/celebration", {
        method: "GET",
      });
    } else if (filter === "Thank you") {
      response = await fetch("http://localhost:3000/boards/thankyou", {
        method: "GET",
      });
    } else if (filter === "Inspiration") {
      response = await fetch("http://localhost:3000/boards/inspiration", {
        method: "GET",
      });
    } else if (filter === "Recent") {
      response = await fetch("http://localhost:3000/boards/filter/recent", {
        method: "GET",
      });
    }

    if (!response.ok) {
      // Handle HTTP responses
      alert("Failed to fetch data:", response.status, response.statusText);
      // Optionally, handle this error in the UI, e.g., show an error message
    } else {
      // If the response is OK, parse the JSON body and update the array
      const data = await response.json();
      updateArray(data);
    }
  };

  // Effect to re-fetch data when refresh state changes
  useEffect(() => {
    fetchdata();
  }, [refresh]);

  return (
    <>
      <div className="sideBar">
        <h1>KudoBoards.</h1>
        <input
          id="search-bar"
          value={query}
          onChange={handleChange}
          placeholder="🔎"
        />
        <span id="reset" onClick={handleReset}>
          Clear
        </span>
        <CreateBoard
          inputs={inputs}
          setInputs={setInputs}
          handleRefresh={handleRefresh}
        />
        <div id="dropdown">
          <p id="filterHeader">Filter:</p>
          <p className="sortingoption" onClick={handleRecentFilter}>
            Recent
          </p>
          <p className="sortingoption" onClick={handleCelebFilter}>
            Celebration
          </p>
          <p className="sortingoption" onClick={handleThankFilter}>
            Thank you
          </p>
          <p className="sortingoption" onClick={handleInspoFilter}>
            Inspiration
          </p>
        </div>
      </div>
      <div className="container">
        <div className="grid-container">
          {boardArray.length > 0 ? (
            boardArray.map((value, i) => (
              <Board
                key={i}
                prop={value}
                onSelectBoard={onSelectBoard}
                handleRefresh={handleRefresh}
              />
            ))
          ) : (
            <div>No boards found.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default BoardGrid;
