/* eslint-disable react/prop-types */

function CreateBoard({ inputs, setInputs, handleRefresh }) {


    const handleSubmit = async (event) => {

        event.preventDefault()
            fetch('http://localhost:3000/boards/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(inputs),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add board');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setInputs({
                    title: '',
                    author: '',
                    category: '',
                });
                handleRefresh();  // Call handleRefresh here after successful POST
            })
            .catch((error) => {
                console.error('Error:', error);
            });

          
    }

    const handleChange = (event) => {
        const { name, value } = event.target; // 'name' here would be 'name', and 'value' is what the user types
        setInputs(prevState => ({
          ...prevState,
          [name]: value  // Updates formData.name based on user input
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
        Enter category:
        <input
          type="text"
          name="category"
          value={inputs.category}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateBoard
