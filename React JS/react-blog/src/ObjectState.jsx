// import { useState } from "react";

// function User() {

//     const [user, setUser] = useState({
//         name: "Shravani",
//         age: 21,
//         city: "Pune"
//     });

//     return (
//         <div>
//             <h2>{user.name}</h2>
//             <h2>{user.age}</h2>
//             <h2>{user.city}</h2>
//         </div>
//     );
// }

// export default User;

import { useState } from "react";

function User() {

  const [user, setUser] = useState({
    name: "Shravani",
    age: 21,
    city: "Pune"
  });

  function updateAge() {
    setUser({
      ...user,
      age: 22
    });
  }

  return (
    <div>

      <h2>Name: {user.name}</h2>
      <h2>Age: {user.age}</h2>
      <h2>City: {user.city}</h2>

      <button onClick={updateAge}>
        Update Age
      </button>

    </div>
  );
}

export default User;