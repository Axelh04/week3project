/* eslint-disable react/prop-types */
import { useState } from "react";
import "./CreateBoard.css"; // CSS for CreateCard is similar or included in CreateBoard.css

function CreateCard({ boardID, inputs, setInputs, handleRefresh }) {
  const [gifOptions, setGifOptions] = useState([]);

  // Handles changes in the GIF search input and triggers a GIF search
  const handleQueryChange = function (event) {
    const newQuery = event.target.value;
    searchGifs(newQuery);
  };

  // Handles the form submission for creating a new card
  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/boards/${boardID}/cards/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add card");
        }
        return response.json();
      })
      .then(() => {
        // Reset input fields after successful card creation
        setInputs({
          title: "",
          description: "",
          author: "",
          gifURL: "",
        });
        // Refresh the card list to include the new card
        handleRefresh();
      })
      .catch((error) => {
        // Optionally, handle errors in a user-friendly way
        alert("Failed to create the card. Please try again.",error);
      });
  };

  // Handles changes to input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fetches GIFs based on the user's query
  const searchGifs = async (query) => {
    try {
      const API_KEY = import.meta.env.VITE_APP_API_KEY;
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=2`
      );
      const gifData = await response.json();
      setGifOptions(gifData.data);
    } catch (error) {
      // Optionally, handle errors in a user-friendly way
      alert("Error searching for GIFs. Please try again.");
    }
  };

  // Handles selection of a GIF from the search results
  const handleGifSelect = (gifUrl) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      gifURL: gifUrl,
    }));
    setGifOptions([]); // Clear GIF options after selection
  };

  return (
    <div id="formCard">
      <span id="addHeader">➕</span>
      <label>
        <input
          className="formInput"
          type="text"
          name="title"
          value={inputs.title}
          onChange={handleChange}
          placeholder="Enter title.."
          required
        />
      </label>
      <label>
        <textarea
          className="formInput"
          name="description"
          value={inputs.description}
          onChange={handleChange}
          placeholder="Enter description.."
          required
        />
      </label>
      <label>
        <input
          className="formInput"
          type="text"
          name="author"
          value={inputs.author}
          onChange={handleChange}
          placeholder="(Opt.) Name.."
        />
      </label>
      <label>
        <input
          className="formInput"
          onChange={handleQueryChange}
          placeholder="Search GIF.."
        />
      </label>
      {gifOptions.length > 0 && (
        <div className="grid-container-gifSearch">
          {gifOptions.map((gif, i) => (
            <div
              key={i}
              onClick={() => handleGifSelect(gif.images.downsized.url)}
            >
              <img id="gifImg" src={gif.images.downsized.url} alt="GIF" />
            </div>
          ))}
        </div>
      )}
      <button className="formInput" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default CreateCard;
