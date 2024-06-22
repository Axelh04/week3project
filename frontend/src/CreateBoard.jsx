/* eslint-disable react/prop-types */
import "./CreateBoard.css";

function CreateBoard({ inputs, setInputs, handleRefresh }) {
  // Handles the form submission for creating a new board
  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/boards/create", {
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
      .then(() => {
        // Reset input fields after successful board creation
        setInputs({
          title: "",
          author: "",
          category: "",
        });
        // Refresh the board list to include the new board
        handleRefresh();
      })
      .catch((error) => {
        // Optionally, handle errors in a user-friendly way
        alert("Failed to create the board. Please try again.", error);
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

  return (
    <div id="form">
      <span id="addHeader">➕</span>
      <label>
        <input
          className="formInput"
          type="text"
          name="title"
          value={inputs.title}
          onChange={handleChange}
          placeholder="Enter title:"
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
          placeholder="(Opt.) Name: "
        />
      </label>
      <label>
        <select
          className="formInput"
          name="category"
          value={inputs.category}
          onChange={handleChange}
          required
        >
          <option value="">Category</option>
          <option value="celebration">Celebration</option>
          <option value="thankyou">Thank You</option>
          <option value="inspiration">Inspiration</option>
        </select>
      </label>
      <button className="formInput" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default CreateBoard;
