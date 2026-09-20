
function InlineStyle() {
    const cardStyle = {
        border: "1px solid #cccccc3b",
        width: '200px',
        boxShadow: "1px 2px 3px 0px #cccccc3b",
        margin: "10px"

    }
    return (
        <>

            <h1 style={{ color: 'red', backgroundColor: "yellow" }}>Inline Style in React JS</h1>
            <div style={{
                cardStyle
            }}>
                <img style={{ width: '200px' }} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="Profile image" />

                <div style={{ padding: "5px" }}>
                    <h4>Shravani Khatate</h4>
                    <p>Software Developer </p>
                </div>
            </div>
        </>
    )
}
export default InlineStyle;