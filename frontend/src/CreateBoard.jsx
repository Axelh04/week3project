/* eslint-disable react/prop-types */

function CreateBoard({ inputs, setInputs, handleRefresh }) {
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
      .then((data) => {
        console.log("Success:", data);
        setInputs({
          title: "",
          author: "",
          category: "",
          
        });
        handleRefresh(); 
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
        Enter name:
        <input
          type="text"
          name="author"
          value={inputs.author}
          onChange={handleChange}
        />
      </label>
      <label>
        Choose a category:
        <select name="category" value={inputs.category} onChange={handleChange}>
          <option value="">Select a category</option>
          <option value="celebration">Celebration</option>
          <option value="thankyou">Thank You</option>
          <option value="inspiration">Inspiration</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateBoard;
