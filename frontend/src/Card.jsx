
/* eslint-disable react/prop-types */

import { useState } from "react"
import { useEffect } from "react"


function Card({prop, boardID, handleRefresh}) {
  
  const [votes, setVotes] = useState(prop.votes)

const handleDelete = async () => {
    fetch(`http://localhost:3000/boards/${boardID}/cards/${prop.id}/delete`, {
        method: 'DELETE',
      })
      .then(() => {
        console.log('Success:')
        handleRefresh();
  
      })
      .catch((error) => {
        console.error('Error:', error)
      })


}

const handleAdd = async () => {
  fetch(`http://localhost:3000/boards/${boardID}/cards/${prop.id}/update`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ votes: votes }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add board");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });


}

useEffect(() => {
  handleAdd();
  handleRefresh();
}, [votes]);

const addVotes = () => {
  setVotes(votes + 1);
}


if (prop.votes === 0){
return (
<div className="poster" >
`<h3 >{prop.title}</h3>
  
  <h3>{prop.description}</h3>
  <h3>{prop.author}</h3>
  <h3 onClick={addVotes}>Like</h3>
  <img src={prop.gifURL}/>
  <h3 onClick={handleDelete}>Delete</h3>

</div>
);

}
else {
  return (
    <div className="poster" >
    `<h3 >{prop.title}</h3>
      
      <h3>{prop.description}</h3>
      <h3>{prop.author}</h3>
      <h3 onClick={addVotes}>{prop.votes}</h3>
      <img src={prop.gifURL}/>
      <h3 onClick={handleDelete}>Delete</h3>
    
    </div>
    );
}
}

export default Card;
