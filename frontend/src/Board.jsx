
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';


function Board({prop, onSelectBoard, handleRefresh}) {
    console.log(prop.title)


    const handleSwitch = () => {
        onSelectBoard(prop.id);
      };

    const handleDelete = async () => {
        fetch(`http://localhost:3000/boards/${prop.id}/delete`, {
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
    `<Link to = "/cards"><h3 onClick={handleSwitch}>{prop.title}</h3></Link>
      
      <h3>{prop.author}</h3>
      <h3>{prop.category}</h3>
      <h3 onClick={handleDelete}>Delete</h3>

    </div>
  );
}

export default Board;
