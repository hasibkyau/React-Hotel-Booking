import React from 'react';
import { Button, CardText, CardSubtitle, Card, CardImg, CardImgOverlay, CardBody, CardTitle } from 'reactstrap';
import { baseUrl } from '../../redux/baseUrl';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const Hotel = props => {
    return (
        <div className='row m-2 p-2' style={{ textAlign: "left" }}>
            <div className='col-3'>
                <div>

                    <Card style={{ margin: "10px", cursor: "pointer" }} onClick={props.HotelSelect}
                    >
                        <CardImg

                            width="100%"
                            alt={props.hotel.name}
                            src={baseUrl + props.hotel.image}
                            style={{ opacity: "1" }}
                        />
                    </Card>
                </div>
            </div>

            <div className='col-7 p-2'>
                <h1>{props.hotel.name}</h1>
                <h3>{props.hotel.category}</h3>
                <p>{props.hotel.description}</p>
                <h5>Price : {props.hotel.price} BDT | Availability : {props.hotel.room}</h5>
            </div>

            <div className='col-2 p-2'>
                <h5 style={{ fontWeight: 'bold' }}>Availability : {props.hotel.room}</h5>
                <br />
                {
                    props.hotel.room < 1
                        ?
                        <button className='btn btn-danger disabled'>Not Available</button>
                        :
                        props.auth.userId == null ?<div> <a href='login'><button className='btn btn-success'>Book Now</button></a></div>:
                        <button onClick={props.HotelSelect} className='btn btn-success'>Book Now</button>
                }
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(Hotel);