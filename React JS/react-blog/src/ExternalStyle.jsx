import { useState } from "react";
import './css/style.css'
function ExternalStyle() {
    return (
        <>
            <h1 className="heading">External Style</h1>
            <div className="user-card">
                <div>
                    <img className="img-style" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="Profile Image" />
                </div>
                <div className="text-wrap">
                    <h4>Shravani Khatate</h4>
                    <p>Software Developer</p>
                </div>
            </div>
        </>
    )
}
export default ExternalStyle;