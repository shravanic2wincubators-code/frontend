

import { useRef } from "react";
import UserInput from "./UserInput";

function InputRef() {
    const inputRef = useRef(null);

    const updatedInput=()=>{
        inputRef.current.value=100;
        inputRef.current.focus()
        inputRef.current.style.color="red"
    }

    return (
        <>
        <h1>Forward Ref</h1>
       <UserInput ref={inputRef}/>
        <button onClick={updatedInput}>Update Input field</button>
        </>
    )
}
export default InputRef;