import { useEffect, useState } from "react";

const Clock = () => {

    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {

        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div>
            <h1
                style={{
                    color: "green",
                    backgroundColor: "#000",
                    width: "120px",
                    padding: "10px",
                    borderRadius: "50px",
                }}
            >
                {time}
            </h1>
        </div>
    );
};

export default Clock;