/* eslint-disable react/prop-types */

function CreateCard({ boardID, inputs, setInputs, handleRefresh }) {


    const handleSubmit = async (event) => {

        event.preventDefault()
            fetch(`http://localhost:3000/boards/${boardID}/cards/create`, {
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
                    description: '',
                    author: '',
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
        Enter description:
        <input
          type="text"
          name="description"
          value={inputs.description}
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
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateCard
