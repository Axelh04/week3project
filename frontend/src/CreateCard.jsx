/* eslint-disable react/prop-types */

import { useState } from "react";

function CreateCard({ boardID, inputs, setInputs, handleRefresh }) {
  // const [query, setQuery] = useState("");
  const [gifOptions, setGifOptions] = useState([]);

  const handleQueryChange = function (event) {
    const newQuery = event.target.value;
    searchGifs(newQuery); // Use newQuery directly
  };

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
          throw new Error("Failed to add board");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setInputs({
          title: "",
          description: "",
          author: "",
          gifURL: "",
        });
        handleRefresh(); // Call handleRefresh here after successful POST
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const searchGifs = async (query) => {
    try {
      const API_KEY = import.meta.env.VITE_APP_API_KEY;
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=2`
      );
      const gifData = await response.json();
      console.log(gifData);
      setGifOptions(gifData.data);
    } catch (error) {
      console.error("Error searching for GIFs:", error);
    }
  };

  const handleGifSelect = (gifUrl) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      gifURL: gifUrl  // Assuming you have a gifUrl field in your inputs state
    }));
    setGifOptions([])
  };

  return (
    <div>
      <label>
        Enter title:
        <input
          type="text"
          name="title"
          value={inputs.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Enter description:
        <input
          type="text"
          name="description"
          value={inputs.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Search Gif:
        <input onChange={handleQueryChange} placeholder="Search.." />
      </label>
      {gifOptions.length > 0 && (
        <div>
          {gifOptions.map((gif, i) => (
            <div key={i} onClick={() => handleGifSelect(gif.images.downsized.url)}>
              <img src={gif.images.downsized.url} alt="GIF" />
            </div>
          ))}
        </div>
      )}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateCard;
