import React, { Component } from "react";
import BannerSection from "./BannerSection";
import HotelSection from "./HotelSection";

class Home extends Component {
    render() {
        return (
            <div>
                <BannerSection
                    companyName={{ fname: "Hotel", lname: "Booking" }}
                    title="Book Your Favourite Hotel Online !"
                    subtitle="Book Your Favourite Hotel Online !"
                    align="left"
                    button={{ text: "Sign up for free", backgroundColor: "", size: "" }}
                />

                <HotelSection />

            </div>

        );
    }
}

export default Home;