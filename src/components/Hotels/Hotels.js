import React, { Component } from 'react';
import Hotel from './Hotel';
import { ButtonGroup, Modal, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { addComment, fetchHotels, fetchComments } from '../../redux/actionCreator';
import Loading from '../Template/Loading';
import { Alert } from 'reactstrap';
import Booking from '../Booking/Booking';

const mapStateToProps = state => {
    return {
        hotels: state.hotels,
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (hotelId, rating, author, comment) => dispatch(addComment(hotelId, rating, author, comment)),
        fetchHotels: () => dispatch(fetchHotels()),
        fetchComments: () => dispatch(fetchComments())
    }
}

class Hotels extends Component {
    state = {
        selectedHotel: null,
        modalOpen: false,
        category: "all",
    }

    onHotelselect = hotel => {
        this.setState({
            selectedHotel: hotel,
            modalOpen: !this.state.modalOpen
        });
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    handleCategory = (event, p) => {
        this.setState({
            category: p,
        })

    }

    componentDidMount() {
        this.props.fetchHotels();
        this.props.fetchComments();
    }

    render() {
        if (this.props.hotels.isLoading) {
            return (
                <Loading />
            );
        }

        else if (this.props.hotels.errMess != null) {
            return (
                <Alert color='danger'>Error Loading</Alert>
            );
        }

        else {
            const menu = this.props.hotels.hotels.map(item => {
                if (this.state.category === "all") {
                    return (
                        <Hotel
                            hotel={item}
                            key={item.id}
                            HotelSelect={() => this.onHotelselect(item)}
                        />
                    );
                } else {
                    if (this.state.category === item.category) {
                        return (
                            <Hotel
                                hotel={item}
                                key={item.id}
                                HotelSelect={() => this.onHotelselect(item)}
                            />
                        );
                    }
                }

            })

            
            return (
                <div>
                    <div className="container">
                        <ButtonGroup className='m-2' aria-label="Basic example">
                            <Label className='mr-2 p-1 text-danger '>Category :</Label>
                            <Button onClick={(e) => { this.handleCategory(e, "all") }} className="btn-danger mr-1">All</Button>
                            <Button onClick={(e) => { this.handleCategory(e, "Deluxe Single Room") }} className="btn-danger mr-1">Deluxe Single Room</Button>
                            <Button onClick={(e) => { this.handleCategory(e, "Premier Single Room") }} className="btn-danger mr-1">Premier Single Room</Button>
                            <Button onClick={(e) => { this.handleCategory(e, "Deluxe King Room") }} className="btn-danger mr-1">Deluxe King Room</Button>
                            <Button onClick={(e) => { this.handleCategory(e, "Standard Signle Room") }} className="btn-danger mr-1">Standard Signle Room</Button>
                            <Button onClick={(e) => { this.handleCategory(e, "Standard Double Room") }} className="btn-danger mr-1">Standard Double Room</Button>
                        </ButtonGroup>
                        <div className="row">

                            <div className='row justify-content-md-center"'>

                                {menu}
                            </div>
                            <Modal style={{ scrollable: "true" }} isOpen={this.state.modalOpen}>
                                <ModalBody>
                                    <Booking 
                                    hotel = {this.state.selectedHotel}
                                    toggleModal = {this.toggleModal}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.toggleModal}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hotels);