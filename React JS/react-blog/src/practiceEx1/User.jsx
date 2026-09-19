function User(props) {
    console.log(props);

    return (
        <div>
            <h1>User Component</h1>
            <hr />
            <h2>Name: {props.user.name}</h2>
            <h2>Age: {props.user.age}</h2>
            <h2>Email: {props.user.email}</h2>
        </div>
    );
}

export default User;