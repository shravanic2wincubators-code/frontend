
function DerivedState() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState('');
    const handleAddusers = () => {
        setUsers([...users, user])

    }
    const total=users.length;
    console.log(users)
    return (
        <div>

            <h2>Total Users: {total}</h2>
            <input type="text" onChange={(event) => setUser(event.target.value)} placeholder="add new USer" />
            <button onClick={handleAddUsers}>Add User</button>
            {
                users.map((item, index) => (
                    <h4 key={index}>{item}</h4>

                ))
            }
        </div>
    )
}
export default DerivedState;