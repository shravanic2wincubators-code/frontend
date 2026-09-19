
import User from "./User"
function App() {
    let name="Shravani";

    let userObject={
        name:"Shravani",
        age:"21",
        email:"shrau@gmail.com"
    }
    return (
        <div>
            <h1>Props in React JS</h1>
            

            <User user={userObject} />
        </div>
    )
}
export default App;