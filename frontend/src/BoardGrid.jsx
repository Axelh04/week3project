/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Board from './Board'
import CreateBoard from "./CreateBoard";

function BoardGrid( { onSelectBoard }) {

    const [boardArray, setBoardArray] = useState([])
    const [refresh, setRefreshState] = useState(0)
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState(null);
    const [inputs, setInputs] = useState(
      {
        title:'',
        author: '',
        category:'',
      }
    );



    function updateArray(arr) {
        setBoardArray(arr)
    }

    function handleRefresh() {
      setRefreshState(prev => prev + 1); 
  }

  const handleChange = function (event) {
    setQuery(event.target.value);
    handleRefresh();
  };

  const handleReset = function () {
    setQuery("");
    setFilter(null);
    handleRefresh();
  }


  function handleCelebFilter() {
    if (filter != "Celebration") setFilter("Celebration");
    else setFilter(null);
    handleRefresh();

 
  }

  function handleThankFilter() {
    if (filter != "Thank you") setFilter("Thank you");
    else setFilter(null);
    handleRefresh();

  }

  function handleInspoFilter() {
    if (filter != "Inspiration") setFilter("Inspiration");
    else setFilter(null);
    handleRefresh();

  }

    const fetchdata = async () => {

      let data;
      let response;

      if (query === "" && filter === null) {
        response = await fetch("http://localhost:3000/boards", 
        {method: "GET" }
      )
      }

      else if (query !="") {
        response = await fetch(`http://localhost:3000/boards/query/${query}`, 
        {method: "GET" }
      )
      }

      else if (filter === "Celebration") {
        response = await fetch("http://localhost:3000/boards/celebration", 
        {method: "GET" }
      )
    }

      else if (filter === "Thank you") {
        response = await fetch("http://localhost:3000/boards/thankyou", 
        {method: "GET" }
      )
      }

      else if (filter === "Inspiration") {
        response = await fetch("http://localhost:3000/boards/inspiration", 
        {method: "GET" }
      )
    }


      data = await response.json()
      updateArray(data)


    };

    
    useEffect(() => {
    
    fetchdata();

    }, [refresh]);
    
    
    
    return(
        <>
        <div>
          <input value={query} onChange={handleChange} placeholder="Search.." />
          <span><button onClick={handleReset}>Clear</button></span>
          <CreateBoard inputs = {inputs} setInputs = {setInputs} handleRefresh= {handleRefresh} />
          <span id="dropdown">
          <p>Filter:</p>
          <p className="sortingoption" onClick={handleCelebFilter}>
            celebration
          </p>
          <p className="sortingoption" onClick={handleThankFilter}>
            thank you
          </p>
          <p className="sortingoption" onClick={handleInspoFilter}>
            inspiration
          </p>
        </span>
        </div>
        <div className="grid-container">
        <button onClick={handleRefresh}>Refresh</button>
        
        {boardArray.length > 0 ? (
          boardArray.map((value, i) => {
            return (
            
              <Board
                key={i}
                prop = {boardArray[i]}
                onSelectBoard={onSelectBoard}
                handleRefresh= {handleRefresh}
              />
          
            );
          })
        ) : (
          <div>None</div>
        )}
        

      </div>
        </>
    )

}

export default BoardGrid;