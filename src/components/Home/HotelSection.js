import React from "react";
import Hotels from "../Hotels/Hotels";

const HotelSection = () => {
    return (
        <div>
            <div >
                <div className="flex">
                    <div style={{backgroundColor:"tomato", padding:"5px"}}>
                    <h3 style={{ textAlign: "center", color: "white" }}>Find Your Favourite Hotel</h3>
                    </div>
                    <Hotels />

                </div>

            </div>
        </div>

    );
}

export default HotelSection;