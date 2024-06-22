import "./App.css";
import BoardGrid from "./BoardGrid";
import CardGrid from "./CardGrid";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [currentBoardID, setCurrentBoardID] = useState("");

  const onSelectBoard = (selectedBoardID) => {
    localStorage.setItem("currentBoardID", selectedBoardID);
    setCurrentBoardID(selectedBoardID);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<BoardGrid onSelectBoard={onSelectBoard} />} />
        <Route path="/cards" element={<CardGrid boardID={currentBoardID} />} />
      </Routes>
    </>
  );
}

export default App;
