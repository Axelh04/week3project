
/* eslint-disable react/prop-types */


function Card({prop, boardID, handleRefresh}) {
  

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
return (
<div className="poster" >
`<h3 >{prop.title}</h3>
  
  <h3>{prop.description}</h3>
  <h3>{prop.author}</h3>
  <h3 onClick={handleDelete}>Delete</h3>

</div>
);
}

export default Card;
