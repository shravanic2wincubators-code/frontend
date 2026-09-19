import { useState } from "react";

function CheckBoxes() {

    const [skills, setSkills] = useState([]);

    const handleSkills = (event) => {

        console.log(event.target.value, event.target.checked);

        if (event.target.checked) {

            setSkills([...skills, event.target.value]);

        } else {

            setSkills(
                skills.filter((item) => item !== event.target.value)
            );

        }
    };

    return (
        <div>
            <h3>Select Your Skills</h3>

            <input
                onChange={handleSkills}
                type="checkbox"
                id="php"
                value="php"
            />
            <label htmlFor="php">PHP</label>

            <br />
            <br />

            <input
                onChange={handleSkills}
                type="checkbox"
                id="js"
                value="JS"
            />
            <label htmlFor="js">JS</label>

            <br />
            <br />

            <input
                onChange={handleSkills}
                type="checkbox"
                id="node"
                value="node"
            />
            <label htmlFor="node">Node</label>

            <br />
            <br />

            <h3>Selected Skills:</h3>

            <p>{skills.join(", ")}</p>
        </div>
    );
}

export default CheckBoxes;