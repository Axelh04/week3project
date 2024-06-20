import CreateBoard from "./CreateBoard"
/* eslint-disable react/prop-types */



function Sidebar({inputs, setInputs}) {
    return(
        <>
        <CreateBoard inputs = {inputs} setInputs = {setInputs}/>
        {/* <FilterBoard />  */}
        
        </>
    )
}

export default Sidebar