import React from "react";
import './css/banner.css'
import bgImg from '../../assets/images/bg2.jpg'

const BannerSection = (props) => {
    return (
        <div>
            <div className="banner" style={{backgroundImage: "linear-gradient(to right, rgba(2, 2, 2, 0.2), rgba(0, 0, 0, 0.2)),url("+bgImg+")"}}>
                <div className="container">
           

                        <div className="banner-text">
                            <div className="companyName">
                                <span style={{ color: "red"}}>{props.companyName.fname}</span>
                                <span style={{ color: "white"}}>{props.companyName.lname}</span>
                            </div>
                            <h1 style={{ color: "white" }}>{props.title}</h1>
                            <h5 style={{ color: "white" }}>{props.subtitle}</h5>

                            {/* <Button color="danger" size="sm">Sign Up for Free</Button> */}
                            <a href="/login"><button type="button" className="btn btn-danger" style = {{ backgroundColor: props.button.backgroundColor, width: props.button.size}}>Sign Up for Free</button></a>
                        </div>
                </div>
            </div>
        </div>
    );

}

export default BannerSection;