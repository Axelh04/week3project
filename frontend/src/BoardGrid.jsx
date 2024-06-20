/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Board from './Board'
import CreateBoard from "./CreateBoard";

function BoardGrid( { onSelectBoard }) {

    const [boardArray, setBoardArray] = useState([])
    const [inputs, setInputs] = useState(
      {
        title:'',
        author: '',
        category:'',
      }
    );
    const [refresh, setRefreshState] = useState(0)

    function updateArray(arr) {
        setBoardArray(arr)
    }

    function handleRefresh() {
      setRefreshState(prev => prev + 1); 
  }



    const fetchdata = async () => {
    const response = await fetch("http://localhost:3000/boards", 
    {method: "GET" }
      )
    const data = await response.json()
      updateArray(data)


    };

    
    useEffect(() => {
    
    fetchdata();

    }, [refresh]);
    
    
    
    return(
        <>
        <div>
          <CreateBoard inputs = {inputs} setInputs = {setInputs} handleRefresh= {handleRefresh} />
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