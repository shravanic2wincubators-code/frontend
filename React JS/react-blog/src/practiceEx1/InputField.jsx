import { useState } from "react";

function UserName() {
    const [val, setVal] = useState("Shravani")
    return (
        <div>
            <input type="text" value={val} onChange={(event) => setVal(event.target.value)} placeholder="Enter user name:" />

            <h1>{val}</h1>
            <button onClick={() => setVal("")}>Clear Value</button>
        </div>
    )
}
export default UserName;