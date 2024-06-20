/* eslint-disable react/prop-types */

import Card from "./Card"
import CreateCard from "./CreateCard"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"


function CardGrid({boardID}) {

        const [boardArray, setBoardArray] = useState([])
        const [refresh, setRefreshState] = useState(0)
        const [inputs, setInputs] = useState(
          {
            title:'',
            description: '',
            author:'',
          }
        );
    
        function updateArray(arr) {
            setBoardArray(arr)
        }
    
        function handleRefresh() {
          setRefreshState(prev => prev + 1); 
      }
    
    
    
        const fetchdata = async () => {
        const response = await fetch( `http://localhost:3000/boards/${boardID}/cards`, 
        {method: "GET" }
          )
        const data = await response.json()
          updateArray(data)
    
    
        };
    
        
        useEffect(() => {
    
        fetchdata();
    
        }, [refresh] );
        
        
        
        return(
            <>
            <div>
          <CreateCard boardID = {boardID} inputs = {inputs} setInputs = {setInputs} handleRefresh= {handleRefresh} />
          </div>
            <div className="grid-container">
            <Link to = "/"><h3>Go back</h3></Link>
            <button onClick={handleRefresh}>Refresh</button>
            
            {boardArray.length > 0 ? (
              boardArray.map((value, i) => {
                return (
                
                  <Card
                    key={i}
                    prop = {boardArray[i]}
                    boardID = {boardID}
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

export default CardGrid